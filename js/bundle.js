/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slider */ "./js/modules/slider.js");

function calculator () {
    const result = document.querySelector('.calculating__result > span'),
        height = document.querySelector('#height'),
        weight = document.querySelector('#weight'),
        age = document.querySelector('#age'),
        male = document.querySelector('#male'),
        genderField = document.querySelector('#gender'),
        activityField = document.querySelector('.calculating__choose_big');

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
                dailyCalories(88.36 + (13.4 * (0,_slider__WEBPACK_IMPORTED_MODULE_0__.regExp)(weight.value)) + (4.8 * (0,_slider__WEBPACK_IMPORTED_MODULE_0__.regExp)(height.value)) - (5.7 * (0,_slider__WEBPACK_IMPORTED_MODULE_0__.regExp)(age.value))) :
                dailyCalories(447.6 + (9.2 * (0,_slider__WEBPACK_IMPORTED_MODULE_0__.regExp)(weight.value)) + (3.1 * (0,_slider__WEBPACK_IMPORTED_MODULE_0__.regExp)(height.value)) - (4.3 * (0,_slider__WEBPACK_IMPORTED_MODULE_0__.regExp)(age.value)));
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculator);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function card () {
    class MenuCard {
        constructor ({src, alt, title, description, price}, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.description = description;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
        }
        render(){
            const element = document.createElement('div');
            element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.description}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                    </div>`
            this.classes.length >= 1 ?
                this.classes.forEach(elem => element.classList.add(elem)) :
                element.classList.add('menu__item');
            this.parent.append(element);
        }
    }

    // getResource('http://localhost:3000/menu')
    //     .then(res=> res.forEach(data => new MenuCard(data, '.menu .container').render()));

    axios.get('http://localhost:3000/menu')
        .then(res=> res.data.forEach(data => new MenuCard(data, '.menu .container').render()));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (card);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal.js */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms (modalTimerId) {
    const forms = document.querySelectorAll('form');
    const message = {
        loading : 'icons/spinner.svg',
        success: 'Спасибо, скоро мы с вами свяжемся',
        fail: 'Что-то пошло не так...'
    }
    forms.forEach(form => bindPostData(form));

    function bindPostData (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;`;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                })
                .catch(() => {
                    showThanksModal(message.fail);
                })
                .finally(() => {
                    form.reset();
                })
        })
    }

    function showThanksModal (message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        (0,_modal_js__WEBPACK_IMPORTED_MODULE_0__.openPopup)(modalTimerId);
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
      <div class="modal__content">
        <div class="modal__close" data-close>×</div>
        <div class="modal__title">${message}</div>
      </div>`
        document.querySelector('.modal').append(thanksModal);
        setTimeout(()=> {
            thanksModal.remove();
            prevModalDialog.classList.remove('hide');
            prevModalDialog.classList.add('show');
            (0,_modal_js__WEBPACK_IMPORTED_MODULE_0__.closePopup)();
        },4000)
    }

    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closePopup": () => (/* binding */ closePopup),
/* harmony export */   "closePopupClick": () => (/* binding */ closePopupClick),
/* harmony export */   "closePopupEsc": () => (/* binding */ closePopupEsc),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "modal": () => (/* binding */ modal),
/* harmony export */   "openPopup": () => (/* binding */ openPopup)
/* harmony export */ });
const modal = document.querySelector('.modal');
function openPopup (modalTimerId) {
    document.addEventListener('keydown', closePopupEsc);
    document.addEventListener('click', closePopupClick);
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    if(modalTimerId) clearTimeout(modalTimerId);

}
function closePopupClick (evt) {
    if(evt.target === modal || evt.target.getAttribute('data-close') === ''){
        closePopup();
    }
}

function closePopup () {
    modal.classList.remove('show');
    document.removeEventListener('keydown', closePopupEsc);
    document.removeEventListener('click', closePopupClick);
    document.body.style.overflow = 'scroll';
}

function closePopupEsc (evt) {
    if(evt.key === 'Escape'){
        closePopup();
    }
}
function modalFn (modalTimerId) {
    const btnsContactWithUs = document.querySelectorAll('.btn:not(.btn_min)');
    btnsContactWithUs.forEach(btn => {
        btn.addEventListener('click', () => openPopup(modalTimerId));
    })

    function openModalByScroll () {
        if(window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1){
            openPopup(modalTimerId);
            document.removeEventListener('scroll', openModalByScroll);
        }
    }
    // open modal in 5 sec && when page is scrolled
    document.addEventListener('scroll', openModalByScroll)
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modalFn);

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "regExp": () => (/* binding */ regExp)
/* harmony export */ });
/* harmony import */ var _timer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timer */ "./js/modules/timer.js");

const regExp = (str) => +str.replace(/\D/g,'');
function slider ({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    const nextSlide = document.querySelector(nextArrow),
        prevSlide = document.querySelector(prevArrow),
        sliderCurrent = document.querySelector(currentCounter),
        sliderTotal = document.querySelector(totalCounter),
        slides = document.querySelectorAll(slide),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
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
    sliderCurrent.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.addZero)(slideIndex);
    sliderTotal.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.addZero)(slides.length);
    nextSlide.addEventListener('click', () => {
        offset === regExp(width) * (slides.length - 1) ?
            offset = 0 :
            offset += regExp(width);
        slidesField.style.transform = `translateX(-${offset}px)`
        slideIndex === slides.length ? slideIndex = 1 : slideIndex++;
        (0,_timer__WEBPACK_IMPORTED_MODULE_0__.addZero)(slideIndex);
        sliderCurrent.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.addZero)(slideIndex);
        activeDot(indicators,indicators[slideIndex-1]);
    })
    prevSlide.addEventListener('click', () => {
        offset === 0 ?
            offset = regExp(width) * (slides.length - 1) :
            offset -= regExp(width);
        slidesField.style.transform = `translateX(-${offset}px)`
        slideIndex === 1 ? slideIndex = slides.length : slideIndex--;
        sliderCurrent.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.addZero)(slideIndex);
        activeDot(indicators,indicators[slideIndex-1]);
    })
    // DOTS on slider
    // Create a new ordered list element to hold the slider indicators
    const slider = document.querySelector(container),
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
            sliderCurrent.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.addZero)(slideIndex);
            slidesField.style.transform = `translateX(-${slideOffset}px)`;
            activeDot(indicators,indicator);
        });
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);


/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs (tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    const tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(tabsParentSelector);

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        })
        tabs.forEach(tab => {
            tab.classList.remove(activeClass);
        })
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();


    tabsParent.addEventListener('click', e => {
        const target = e.target;
        if(target.classList.contains(tabsSelector.substring(1))) {
            tabs.forEach((tab, i) => {
                if(target == tab){
                    hideTabContent();
                    showTabContent(i);
                }
            })
        }
    })
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addZero": () => (/* binding */ addZero),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function addZero (number) {
    return number < 10 ? `0${number}` : number;
}
function timer (deadline) {
    let days = document.querySelector('#days');
    let hours = document.querySelector('#hours');
    let minutes = document.querySelector('#minutes');
    let seconds = document.querySelector('#seconds');

    function formatDuration(duration) {
        let seconds = Math.floor(duration / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        let days = Math.floor(hours / 24);

        seconds = seconds % 60;
        minutes = minutes % 60;
        hours = hours % 24;

        return {
            days,
            hours,
            minutes,
            seconds
        };
    }

    let intervalID = window.setInterval(remainingTime, 1000);
    function remainingTime() {
        const now = new Date();
        const finish = new Date(deadline);
        const remaining = formatDuration(finish - now);
        days.textContent = addZero(remaining.days);
        hours.textContent = addZero(remaining.hours);
        minutes.textContent = addZero(remaining.minutes);
        seconds.textContent = addZero(remaining.seconds);

        if (finish - now <= 0) {
            days.textContent = '00';
            hours.textContent = '00';
            seconds.textContent = '00';
            minutes.textContent = '00';
            clearInterval(intervalID);
        }
    }
    remainingTime();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => (/* binding */ getResource),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url,data) => {
    const res = await fetch(url, {
        method:'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });
    return await res.json();
}

const getResource = async (url) => {
    const res = await fetch(url);
    if(!res.ok){
        throw new Error(`Could not fetch ${url}, status ${res.status}`)
    }
    return await res.json();
}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs.js */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal.js */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer.js */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards.js */ "./js/modules/cards.js");
/* harmony import */ var _modules_calculator_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calculator.js */ "./js/modules/calculator.js");
/* harmony import */ var _modules_forms_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms.js */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider.js */ "./js/modules/slider.js");







window.addEventListener('DOMContentLoaded', () => {
  const modalTimerId = window.setTimeout(() => (0,_modules_modal_js__WEBPACK_IMPORTED_MODULE_1__.openPopup)(modalTimerId), 5000);
  (0,_modules_tabs_js__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item','.tabcontent','.tabheader__items','tabheader__item_active' );
  (0,_modules_modal_js__WEBPACK_IMPORTED_MODULE_1__["default"])(modalTimerId);
  (0,_modules_timer_js__WEBPACK_IMPORTED_MODULE_2__["default"])('2023, 06, 15');
  (0,_modules_cards_js__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_modules_calculator_js__WEBPACK_IMPORTED_MODULE_4__["default"])();
  (0,_modules_forms_js__WEBPACK_IMPORTED_MODULE_5__["default"])(modalTimerId);
  (0,_modules_slider_js__WEBPACK_IMPORTED_MODULE_6__["default"])({
    container:'.offer__slider',
    slide:'.offer__slide',
    nextArrow:'.offer__slider-next',
    prevArrow:'.offer__slider-prev',
    totalCounter:'#total',
    currentCounter:'#current',
    wrapper:'.offer__slider-wrapper',
    field:'.offer__slider-inner'
  });
})

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map