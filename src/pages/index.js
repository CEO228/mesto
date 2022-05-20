import './index.css';

import initialCards from "../utils/cards.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";

import {
    profileOpenButton,
    photoFormOpenBtn,
    profileCloseBtn,
    photoFormCloseBtn,
    popUpInfo,
    popUpPhoto,
    profileTitle,
    profileSubtitle,
    formEditElement,
    formAddElement,
    nameInput,
    jobInput,
    titleInput,
    photoInput,
    popUpList,
    elementList,
    closePicture,
    validationSettings
} from "../utils/constants.js";


const popupImage = new PopupWithImage(".popup_type_open-image");

const handleCardClick = (name, link) => {
    popupImage.open({ name, link });
}

const rendererForCards = (data) => {
    const card = new Card(data, ".template", handleCardClick);
    const cardElement = card.createCard();
    return cardElement;
}

const create = new Section({
    items: initialCards,
    renderer: rendererForCards
}, ".elements");

create.rendered();

const userInfo = new UserInfo({
    name: ".profile__title",
    job: ".profile__subtitle"
});


const popupAdd = new PopupWithForm(".popup_type_photo", (data) => {
    create.addItem(rendererForCards(data));
});

const popupEdit = new PopupWithForm(".popup_type_info", (data) => {
    userInfo.setUserInfo(data);
});



popupAdd.setEventListeners();
popupEdit.setEventListeners();
popupImage.setEventListeners();


profileOpenButton.addEventListener('click', () => {
    const user = userInfo.getUserInfo();

    nameInput.value = user.name;
    jobInput.value = user.job;
    popupEdit.open();
})

photoFormOpenBtn.addEventListener('click', () => {
    popupAdd.open();
    popupFormsValidationAdd.disableButton();
})


const popupFormsValidationEdit = new FormValidator(validationSettings, formEditElement);
const popupFormsValidationAdd = new FormValidator(validationSettings, formAddElement);

popupFormsValidationEdit.enableValidation(validationSettings);
popupFormsValidationAdd.enableValidation(validationSettings);