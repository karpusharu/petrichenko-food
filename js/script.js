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
    // modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearTimeout(modalTimerId);
  }

  function closePopupClick (evt) {
    if(evt.target === modal){
      closePopup();
    }
  }

  function closePopup () {
    modal.classList.remove('show');
    // modal.classList.add('hide');
    document.removeEventListener('keydown', closePopupEsc);
    document.removeEventListener('click', closePopupClick);
    document.body.style.overflow = 'scroll';
  }
  const btnClosePopup = modal.querySelector('.modal__close');
  btnClosePopup.addEventListener('click', closePopup);

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
  const data = {
    1: {
      src: 'img/tabs/vegy.jpg',
      alt:"vegy",
      title: 'Меню "Фитнес"',
      description: 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
      price: 229
    },
    2: {
      src: "img/tabs/elite.jpg",
      alt:"elite",
      title: 'Меню “Премиум”',
      description: 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
      price: 550
    },
    3: {
      src: "img/tabs/post.jpg",
      alt:'post',
      title: 'Меню "Постное"',
      description: 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
      price: 430
    }
  }
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
  for(let i = 1; i<4; i++){
    new MenuCard(data[i],'.menu .container').render();
  }
})
