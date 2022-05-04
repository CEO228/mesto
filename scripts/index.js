import initialCards from "./cards.js";
import { openPopup, closePopup } from "./popupFunctions.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const profileOpenButton = document.querySelector(".profile__edit-button");
const photoFormOpenBtn = document.querySelector(".profile__add-button");
const profileCloseBtn = document.querySelector(".popup__close-button_type_edit");
const photoFormCloseBtn = document.querySelector(".popup__close-button_type_add");
const popUpInfo = document.querySelector(".popup_type_info");
const popUpPhoto = document.querySelector(".popup_type_photo");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const formEditElement = document.querySelector(".popup__form_type_edit");
const formAddElement = document.querySelector(".popup__form_type_add");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");
const titleInput = document.querySelector(".popup__input_type_title");
const photoInput = document.querySelector(".popup__input_type_photo");
const popUpList = document.querySelectorAll(".popup");

const elementList = document.querySelector(".elements");

const popUpImage = document.querySelector(".popup_type_open-image");
const closePicture = document.querySelector(".popup__close-button_type_open-image");


const validationSettings = ({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_status_inactive',
    inputErrorClass: 'popup__input_status_error',
    errorClass: 'popup__error-text_status_error'
});

// ПОДКЛЮЧЕНИЕ ВАЛИДАЦИИ

const popupFormsValidationEdit = new FormValidator(validationSettings, formEditElement);
const popupFormsValidationAdd = new FormValidator(validationSettings, formAddElement);

popupFormsValidationEdit.enableValidation(validationSettings);
popupFormsValidationAdd.enableValidation(validationSettings);


//

// ГЕНЕРАЦИЯ КАРТОЧКИ 

const create = (element) => new Card(element, '#element__template').createCard();

const renderCards = (elements) => (
    elements.reverse().forEach((element) => elementList.append(create(element)))
);

const addElement = () => {
    const newElement = create({
        name: titleInput.value,
        link: photoInput.value,
    }, '#element__template');

    elementList.prepend(newElement);
};

const profileData = () => {
    const name = nameInput.value;
    const position = jobInput.value;

    if (name !== profileTitle.textContent) {
        profileTitle.textContent = name;
    }
    if (position !== profileSubtitle.textContent) {
        profileSubtitle.textContent = position;
    }
};

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileData();
    closeEditProfileForm();
}

function handleAddPhoto(evt) {
    evt.preventDefault();
    addElement();
    closePhotoAddForm()
}


const openEditProfileForm = () => {
    openPopup(popUpInfo);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
}


const closeEditProfileForm = () => {
    closePopup(popUpInfo);
}

const openPhotoAddForm = () => {
    openPopup(popUpPhoto);
    popupFormsValidationAdd.disableButton();
}

const closePhotoAddForm = () => {
    closePopup(popUpPhoto);
    formAddElement.reset();
}

profileOpenButton.addEventListener('click', openEditProfileForm);
profileCloseBtn.addEventListener('click', closeEditProfileForm);
photoFormOpenBtn.addEventListener('click', openPhotoAddForm);
photoFormCloseBtn.addEventListener('click', closePhotoAddForm);



closePicture.addEventListener('click', function() {
    closePopup(popUpImage);
});


formEditElement.addEventListener('submit', handleProfileFormSubmit);
formAddElement.addEventListener('submit', handleAddPhoto);


popUpList.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup);
        }
    })
});

renderCards(initialCards);