// fl-form

const flForm = () => {

    const form = (f) => {

        const requiredInputs = f.querySelectorAll('.fl-form-required');
        const rangeInputs = f.querySelectorAll('.fl-form-range');
        const textareas = f.querySelectorAll('.fl-form-textarea');
        const email = f.querySelector('.fl-form-email');
        const emailMes = f.querySelector('.fl-form-email-message');
        const submit = f.querySelector('.fl-form-submit');
        const reset = f.querySelector('.fl-form-reset');
        const allMessages = f.querySelectorAll('.fl-form-error-message');
        const allInputs = f.querySelectorAll('.fl-form-input');
        const password = f.querySelector('.fl-form-password');
        const passwordRepeat = f.querySelector('.fl-form-password-repeat');
        const passwordBtn = f.querySelector('.fl-form-password-icon');
        const passwordRepeatBtn = f.querySelector('.fl-form-password-repeat-icon');
        const passwordRepeatMes = f.querySelector('.fl-form-password-repeat-message');
        const profileImgInput = f.querySelector('.fl-form-profile-img-input');
        const profileImgBox = f.querySelector('.fl-form-profile-img-box');
        const profileImg = f.querySelector('.fl-form-profile-img');
        
        const displayImage = (e) => {
            profileImgBox.classList.add('show');
            profileImg.src = URL.createObjectURL(profileImgInput.files[0])
        }

        const hideImage = (e) => {
            profileImgBox.classList.remove('show');
            profileImg.src = ""
        }

        if (profileImgInput) { 
            profileImgInput.addEventListener('change', displayImage);
        }

        const isRequired = (e) => {
            const inp = e.target;
            const mes = inp.closest('.fl-form-group').querySelector('.fl-form-required-message');
            inp.value.trim().length == 0 ? addError(inp, mes) : clearError(inp, mes);
        }

        const isInRange = (e) => {

            const inp = e.target;
            const len = inp.value.trim().length;
            const minMes = inp.closest('.fl-form-group').querySelector('.fl-form-min-message');
            const maxMes = inp.closest('.fl-form-group').querySelector('.fl-form-max-message');
            const min = inp.getAttribute('min-length');
            const max = inp.getAttribute('max-length');
            if (len == 0) { minMes.classList.remove('show'); maxMes.classList.remove('show'); }
            else if (len < min) addError(inp, minMes); 
            else if (len > max) addError(inp, maxMes);
            else { clearError(inp, minMes); clearError(inp, maxMes) }

        }

        const addError = (inp, mes) => {
            inp.classList.add('error');
            mes.classList.add('show');
            disableForm();
        }

        const clearError = (inp, mes) => {
            inp.classList.remove('error');
            mes.classList.remove('show');
            if (!errorExist(inp)) { 
                submit.classList.remove('disabled');
                submit.removeAttribute('disabled');
            }
        }

        const disableForm = () => {
            submit.classList.add('disabled');
            submit.setAttribute('disabled', '');
        }

        const enableForm = () => {

            submit.classList.remove('disabled');
            submit.removeAttribute('disabled');
            
            allMessages.forEach((mes) => {
                mes.classList.remove('show')
            })

            allInputs.forEach((inp) => {
                inp.classList.remove('error')
            })

            textareas.forEach((textarea) => {
                if(textarea.hasAttribute('max-length')) { 
                    textarea.addEventListener('input', countLeftCharacters);
                    textarea.closest('.fl-form-group').querySelector('.fl-form-textarea-left-characters-length').innerHTML = textarea.getAttribute('max-length');
                }
            })

            hideImage();

        }

        const emailValidation = (e) => {

            if (e.target.value.trim().length == 0) { 
                emailMes.classList.remove('show'); 
                return;
            }

            if (isValidEmail(e.target.value)) {
                
                email.classList.remove('error');
                emailMes.classList.remove('show');

                if (!errorExist(e.target)) { 
                    submit.classList.remove('disabled');
                    submit.removeAttribute('disabled');
                }

            } else {
                email.classList.add('error');
                emailMes.classList.add('show');
                disableForm();
            }
            
        }

        const isValidEmail = (val) => {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val) ? true : false;
        }

        const errorExist = (myInp) => {

            let exist = false;

            allInputs.forEach((inp) => {
                if (inp.classList.contains('error') && inp != myInp) { exist = true; }
            })

            return exist;

        }

        const validationOnSubmit = () => {
        
            requiredInputs.forEach((inp) => {

                const mes = inp.closest('.fl-form-group').querySelector('.fl-form-required-message');
                inp.value.trim().length == 0 ? addError(inp, mes) : clearError(inp, mes);
                
            })

        }

        const countLeftCharacters = (e) => {
            const textarea = e.target;
            const len = textarea.value.trim().length;
            const maxLength = textarea.getAttribute('max-length');
            if (len > maxLength) return;
            const num = textarea.closest('.fl-form-group').querySelector('.fl-form-textarea-left-characters-length');
            num.innerHTML = maxLength - len;
        }

        requiredInputs.forEach((inp) => {
            inp.addEventListener('keyup', isRequired);
        })

        rangeInputs.forEach((inp) => {
            inp.addEventListener('keyup', isInRange);
        })

        textareas.forEach((textarea) => {
            if(textarea.hasAttribute('max-length')) { 
                textarea.addEventListener('input', countLeftCharacters);
                textarea.closest('.fl-form-group').querySelector('.fl-form-textarea-left-characters-length').innerHTML = textarea.getAttribute('max-length');
            }
        })

        if (reset) reset.addEventListener('click', enableForm);
        if (email) email.addEventListener('keyup', emailValidation);
        submit.addEventListener('click', validationOnSubmit);
        
        const passwordConfirmation = () => {

            if (passwordRepeat.value.length == 0) { 
                passwordRepeatMes.classList.remove('show'); 
            }    
            else if (password.value != passwordRepeat.value) { 
                passwordRepeatMes.classList.add('show');
                passwordRepeat.classList.add('error');
            }
            else { 
                passwordRepeatMes.classList.remove('show');

                const minLength = passwordRepeat.getAttribute('min-length');
                const maxLength = passwordRepeat.getAttribute('max-length');
                const len = passwordRepeat.value.length;
                if (len >= minLength && len <= maxLength) passwordRepeat.classList.remove('error');
            }

        }

        if (password) {

            passwordBtn.addEventListener('click', () => {

                if (password.getAttribute('type') == 'password') {
                    password.setAttribute('type', 'text');
                    passwordBtn.classList.add('fa-eye');
                    passwordBtn.classList.remove('fa-eye-slash');
                } else {
                    password.setAttribute('type', 'password');
                    passwordBtn.classList.remove('fa-eye');
                    passwordBtn.classList.add('fa-eye-slash');
                }

            })

        }    

        if (passwordRepeat) {

            passwordRepeatBtn.addEventListener('click', () => {

                if (passwordRepeat.getAttribute('type') == 'password') {
                    passwordRepeat.setAttribute('type', 'text');
                    passwordRepeatBtn.classList.add('fa-eye');
                    passwordRepeatBtn.classList.remove('fa-eye-slash');
                } else {
                    passwordRepeat.setAttribute('type', 'password');
                    passwordRepeatBtn.classList.remove('fa-eye');
                    passwordRepeatBtn.classList.add('fa-eye-slash');
                }

            })

            password.addEventListener('keyup', passwordConfirmation)
            passwordRepeat.addEventListener('keyup', passwordConfirmation)

        }

    }

    const forms = document.querySelectorAll('.fl-form');

    forms.forEach((f) => { form(f) })
}

flForm();

// the-end-of-fl-form