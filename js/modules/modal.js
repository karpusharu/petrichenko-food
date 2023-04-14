export const modal = document.querySelector('.modal');
export function openPopup (modalTimerId) {
    document.addEventListener('keydown', closePopupEsc);
    document.addEventListener('click', closePopupClick);
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    if(modalTimerId) clearTimeout(modalTimerId);

}
export function closePopupClick (evt) {
    if(evt.target === modal || evt.target.getAttribute('data-close') === ''){
        closePopup();
    }
}

export function closePopup () {
    modal.classList.remove('show');
    document.removeEventListener('keydown', closePopupEsc);
    document.removeEventListener('click', closePopupClick);
    document.body.style.overflow = 'scroll';
}

export function closePopupEsc (evt) {
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

export default modalFn;