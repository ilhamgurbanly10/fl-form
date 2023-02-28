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
        

    }

    const forms = document.querySelectorAll('.fl-form');

    forms.forEach((f) => { form(f) })
}

flForm();

// the-end-of-fl-form