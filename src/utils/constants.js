export const profileOpenButton = document.querySelector(".profile__edit-button");
export const photoFormOpenBtn = document.querySelector(".profile__add-button");
export const profileCloseBtn = document.querySelector(".popup__close-button_type_edit");
export const photoFormCloseBtn = document.querySelector(".popup__close-button_type_add");
export const popUpInfo = document.querySelector(".popup_type_info");
export const popUpPhoto = document.querySelector(".popup_type_photo");
export const profileTitle = document.querySelector(".profile__title");
export const profileSubtitle = document.querySelector(".profile__subtitle");
export const formEditElement = document.querySelector(".popup__form_type_edit");
export const formAddElement = document.querySelector(".popup__form_type_add");
export const nameInput = document.querySelector(".popup__input_type_name");
export const jobInput = document.querySelector(".popup__input_type_job");
export const titleInput = document.querySelector(".popup__input_type_title");
export const photoInput = document.querySelector(".popup__input_type_photo");
export const popUpList = document.querySelectorAll(".popup");

export const avatar = document.querySelector(".profile__image");
export const editAvatarButton = document.querySelector(".profile__avatar-button");
export const popUpAvatar = document.querySelector(".popup_type_avatar");
export const formEditAvatar = popUpAvatar.querySelector(".popup__form");

export const elementList = document.querySelector(".elements");

export const popUpImage = document.querySelector(".popup_type_open-image");
export const closePicture = document.querySelector(".popup__close-button_type_open-image");

export const cardContainer = document.querySelector(".elements");

export const validationSettings = ({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_status_inactive',
    inputErrorClass: 'popup__input_status_error',
    errorClass: 'popup__error-text_status_error'
});