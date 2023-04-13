function modal () {
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
}

export default modal;