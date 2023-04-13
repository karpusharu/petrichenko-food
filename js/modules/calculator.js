import {regExp} from './slider';
function calculator () {
    const result = document.querySelector('.calculating__result > span'),
        height = document.querySelector('#height'),
        weight = document.querySelector('#weight'),
        age = document.querySelector('#age'),
        male = document.querySelector('#male'),
        genderField = document.querySelector('#gender'),
        activityField = document.querySelector('.calculating__choose_big');
    let ratio, sex;

    const setActiveField = (form, selector) => {
        const fields = form.querySelectorAll('.calculating__choose-item');
        fields.forEach(field => {
            field.classList.remove('calculating__choose-item_active');
        })
        form.querySelector(selector).classList.add('calculating__choose-item_active');
    }

    if(!localStorage.getItem('ratio')){
        localStorage.setItem('ratio', 1.375)
    } else setActiveField(activityField, `[data-ratio="${localStorage.getItem('ratio')}"]`)
    if(!localStorage.getItem('sex')){
        localStorage.setItem('sex', 'female')
    } else setActiveField(genderField, `#${localStorage.getItem('sex')}`)

    const validateInputs = (arr) => {
        arr.forEach(input => {
            if (input.value.match(/\D/g)){
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }
        })
    }

    const calculateDailyCalories = () => {
        if(height.value && age.value && weight.value) {
            male.classList.contains('calculating__choose-item_active') ?
                dailyCalories(88.36 + (13.4 * regExp(weight.value)) + (4.8 * regExp(height.value)) - (5.7 * regExp(age.value))) :
                dailyCalories(447.6 + (9.2 * regExp(weight.value)) + (3.1 * regExp(height.value)) - (4.3 * regExp(age.value)));
        } else result.textContent = 'NaN';
        validateInputs([weight, height, age]);
    }

    const setLocalStorageValue = (field) => {
        field.dataset.ratio ? localStorage.setItem('ratio', +field.dataset.ratio) : localStorage.setItem('sex', field.id);
    }
    const activityValue = (form) => {
        const field = form.querySelector('.calculating__choose-item_active');
        return +field.dataset.ratio;
    }

    // Change activity field
    const activityChoose = (form) => {
        const fields = form.querySelectorAll('.calculating__choose-item');
        fields.forEach(field =>
            field.addEventListener('click', (e) => {
                fields.forEach(field => {
                    field.classList.remove('calculating__choose-item_active');
                    field.addEventListener('click', calculateDailyCalories);
                });
                e.target.classList.add('calculating__choose-item_active');
                setLocalStorageValue(e.target);
            }));
    };


    activityChoose(genderField);
    activityChoose(activityField);

    const dailyCalories = (BMR) => result.textContent = Math.trunc(BMR * activityValue(activityField));

    height.addEventListener('input', calculateDailyCalories);
    weight.addEventListener('input', calculateDailyCalories);
    age.addEventListener('input', calculateDailyCalories);
}
export default calculator;