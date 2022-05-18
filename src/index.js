import './pages/index.css';

import initialCards from "./scripts/cards.js";
import Card from "./scripts/Card.js";
import FormValidator from "./scripts/FormValidator.js";
import Section from "./scripts/Section.js";
import UserInfo from "./scripts/UserInfo.js";
import PopupWithForm from "./scripts/PopupWithForm.js";
import PopupWithImage from "./scripts/PopupWithImage.js";

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
} from "./scripts/constants.js";


const handleCardClick = (name, link) => {
    popupImage.open(name, link);
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
})

const popupEdit = new PopupWithForm(".popup_type_info", (data) => {
    userInfo.setUserInfo(data);
})

const popupImage = new PopupWithImage({
    popupSelector: ".popup_type_open-image",
    imageTitle: ".popup__subtitle",
    imageSrc: ".popup__image"
});

popupAdd.setEventListeners();
popupEdit.setEventListeners();
popupImage.setEventListeners();



profileOpenButton.addEventListener('click', () => {
    const user = userInfo.getUserInfo();

    nameInput.value = user.name;
    jobInput.value = user.job;

    popupEdit.open();
    //  popupFormsValidationEdit.resetValidation();

})

photoFormOpenBtn.addEventListener('click', () => {
    popupAdd.open();
})


const popupFormsValidationEdit = new FormValidator(validationSettings, formEditElement);
const popupFormsValidationAdd = new FormValidator(validationSettings, formAddElement);

popupFormsValidationEdit.enableValidation(validationSettings);
popupFormsValidationAdd.enableValidation(validationSettings);












/* 
// ПОДКЛЮЧЕНИЕ ВАЛИДАЦИИ

const popupFormsValidationEdit = new FormValidator(validationSettings, formEditElement);
const popupFormsValidationAdd = new FormValidator(validationSettings, formAddElement);

popupFormsValidationEdit.enableValidation(validationSettings);
popupFormsValidationAdd.enableValidation(validationSettings);


//

const popupProfile = new PopupWithForm(".popup_type_info", handleProfileFormSubmit);
popupProfile.setEventListeners();

profileOpenButton.addEventListener('click', () => { popupProfile.open(); });

const popupAdd = new PopupWithForm(".popup_type_photo", handleAddPhoto)
popupAdd.setEventListeners();

photoFormOpenBtn.addEventListener('click', () => { popupAdd.open(); });




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
    popupProfile.close()
}

function handleAddPhoto(evt) {
    evt.preventDefault();
    addElement();
    formAddElement.reset();
    popupAdd.close();
}


renderCards(initialCards);

// closePicture.addEventListener('click', function() {
//   closePopup(popUpImage);
// });


// formEditElement.addEventListener('submit', handleProfileFormSubmit);
// formAddElement.addEventListener('submit', handleAddPhoto);


// popUpList.forEach((popup) => {
//    popup.addEventListener('mousedown', (evt) => {
//        if (evt.target.classList.contains('popup_opened')) {
//            closePopup(popup);
//        }
//    })
// });

*/