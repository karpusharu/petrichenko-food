import {addZero} from './timer';
const regExp = (str) => +str.replace(/\D/g,'');
function slider () {
    const nextSlide = document.querySelector('.offer__slider-next'),
        prevSlide = document.querySelector('.offer__slider-prev'),
        sliderCurrent = document.querySelector('#current'),
        sliderTotal = document.querySelector('#total'),
        slides = document.querySelectorAll('.offer__slide'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width;
    let slideIndex = 1;
    let offset = 0;

    // Technical functions
    // make active dot opacity 1
    const activeDot = (array, indicator) => {
        array.forEach(dot => dot.style.opacity = '.5');
        indicator.style.opacity = 1;
    }
    // make str to num and delete all letters



    slidesField.style.width = 100 * slides.length + '%';
    slides.forEach(slide => slide.style.width = width);
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    slidesWrapper.style.overflow = 'hidden';
    sliderCurrent.textContent = addZero(slideIndex);
    sliderTotal.textContent = addZero(slides.length);
    nextSlide.addEventListener('click', () => {
        offset === regExp(width) * (slides.length - 1) ?
            offset = 0 :
            offset += regExp(width);
        slidesField.style.transform = `translateX(-${offset}px)`
        slideIndex === slides.length ? slideIndex = 1 : slideIndex++;
        addZero(slideIndex);
        sliderCurrent.textContent = addZero(slideIndex);
        activeDot(indicators,indicators[slideIndex-1]);
    })
    prevSlide.addEventListener('click', () => {
        offset === 0 ?
            offset = regExp(width) * (slides.length - 1) :
            offset -= regExp(width);
        slidesField.style.transform = `translateX(-${offset}px)`
        slideIndex === 1 ? slideIndex = slides.length : slideIndex--;
        sliderCurrent.textContent = addZero(slideIndex);
        activeDot(indicators,indicators[slideIndex-1]);
    })
    // DOTS on slider
    // Create a new ordered list element to hold the slider indicators
    const slider = document.querySelector('.offer__slider'),
        dots = document.createElement('ol'),
        indicators = [];

    // Set the slider position to relative
    slider.style.position = 'relative';
    // Add a class to the indicator list
    dots.classList.add('indicators');
    // Append the indicator list to the slider
    slider.append(dots);

    // For each slide, create an empty 'li' element, add a 'data-slide-to' attribute and a class for the dot
    for(let i = 0; i<slides.length; i++){
        let li = document.createElement('li');
        li.setAttribute('data-slide-to', i+1);
        li.classList.add('dot');
        // Set the opacity of the first dot to 1 and add it to the 'ol' element
        if(i === 0) li.style.opacity = 1;
        dots.append(li);
        indicators.push(li);
    }
    // Add event listeners to each dot to update the slide position and dot opacity when clicked
    indicators.forEach(indicator => {
        indicator.addEventListener('click', (event) => {
            const slideIndex = event.target.dataset.slideTo;
            const slideOffset = +width.replace(/\D/g,'') * (slideIndex - 1);
            sliderCurrent.textContent = addZero(slideIndex);
            slidesField.style.transform = `translateX(-${slideOffset}px)`;
            activeDot(indicators,indicator);
        });
    });
}
export default slider;
export {regExp};