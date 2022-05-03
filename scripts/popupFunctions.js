const openPopup = (popup) => {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEsc);
}

const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEsc);
}

const closePopupEsc = (evt) => {
    if (evt.keyCode == 27) {
        const popupOpened = document.querySelector('.popup_opened');
        closePopup(popupOpened);
    }
}

export { openPopup, closePopup, closePopupEsc };