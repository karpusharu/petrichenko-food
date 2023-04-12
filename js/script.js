window.addEventListener('DOMContentLoaded', () => {

  // Tabs
  const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

  function hideTabContent() {
    tabsContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    })
    tabs.forEach(tab => {
      tab.classList.remove('tabheader__item_active');
    })
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
  }

  hideTabContent();
  showTabContent();


  tabsParent.addEventListener('click', e => {
    const target = e.target;
    if(target.classList.contains('tabheader__item')) {
      tabs.forEach((tab, i) => {
        if(target == tab){
          hideTabContent();
          showTabContent(i);
        }
      })
    }
  })


    // Timer
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

  function addZero (number) {
    return number < 10 ? `0${number}` : number;
  }
  let intervalID = window.setInterval(remainingTime, 1000);
  function remainingTime() {
    const now = new Date();
    const finish = new Date('2023, 06, 15');
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

  // show modal
  const modal = document.querySelector('.modal');
  const btnsContactWithUs = document.querySelectorAll('.btn:not(.btn_min)');
  btnsContactWithUs.forEach(btn => {
    btn.addEventListener('click', openPopup);
  })
  function openPopup () {
    document.addEventListener('keydown', closePopupEsc);
    document.addEventListener('click', closePopupClick);
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    clearTimeout(modalTimerId);
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

  function openModalByScroll () {
    if(window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1){
      openPopup();
      document.removeEventListener('scroll', openModalByScroll);
    }
  }

  // open modal in 5 sec && when page is scrolled
  const modalTimerId = window.setTimeout(openPopup, 5000);
  document.addEventListener('scroll', openModalByScroll)


  //class implementation
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

  const getResource = async (url) => {
    const res = await fetch(url);
    if(!res.ok){
      throw new Error(`Could not fetch ${url}, status ${res.status}`)
    }
    return await res.json();
  }

  // getResource('http://localhost:3000/menu')
  //     .then(res=> res.forEach(data => new MenuCard(data, '.menu .container').render()));

  axios.get('http://localhost:3000/menu')
      .then(res=> res.data.forEach(data => new MenuCard(data, '.menu .container').render()));

  //FORMS
  const forms = document.querySelectorAll('form');
  const message = {
    loading : 'icons/spinner.svg',
    success: 'Спасибо, скоро мы с вами свяжемся',
    fail: 'Что-то пошло не так...'
  }
  forms.forEach(form => bindPostData(form));

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

      postData('http://localhost:3000/requests', json)
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
    openPopup();
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
      closePopup();
    },4000)
  }

  fetch('http://localhost:3000/menu')
      .then(data => data.json())
      .then(res => console.log(res));

  // SLIDER
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
  const regExp = (str) => +str.replace(/\D/g,'');


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


  /*function next (n) {
    slideIndex += n;
    if(slideIndex > slides.length) slideIndex = 1;
    if(slideIndex < 1) slideIndex = slides.length;
    slides.forEach(item => item.style.display = 'none');
    slides[slideIndex-1].style.display = 'block';
    sliderCurrent.textContent = addZero(slideIndex);
  }
  next(0);
  sliderTotal.textContent = addZero(slides.length);
  sliderBtnRight.addEventListener('click', () => next(1));
  sliderBtnLeft.addEventListener('click', () => next(-1));*/
  //CALCULATOR
  const result = document.querySelector('.calculating__result > span'),
        height = document.querySelector('#height'),
        weight = document.querySelector('#weight'),
        age = document.querySelector('#age'),
        male = document.querySelector('#male'),
        genderField = document.querySelector('#gender'),
        activityField = document.querySelector('.calculating__choose_big');

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

  // Change activity field
  const activityChoose = (element) => {
    const fields = element.querySelectorAll('.calculating__choose-item');
    fields.forEach(field =>
        field.addEventListener('click', (e) => {
          fields.forEach(field => {
            field.classList.remove('calculating__choose-item_active');
            field.addEventListener('click', calculateDailyCalories);
          });
          e.target.classList.add('calculating__choose-item_active');
        }));
  };

  const activityValue = (form) => {
    const field = form.querySelector('.calculating__choose-item_active');
    return +field.dataset.ratio;
  }

  activityChoose(genderField);
  activityChoose(activityField);

  const dailyCalories = (BMR) => result.textContent = Math.trunc(BMR * activityValue(activityField));

  height.addEventListener('input', calculateDailyCalories);
  weight.addEventListener('input', calculateDailyCalories);
  age.addEventListener('input', calculateDailyCalories);
})
