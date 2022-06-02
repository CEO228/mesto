import './index.css';

import initialCards from "../utils/cards.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Api from '../components/Api.js';
import PopupWithDelete from '../components/PopupWithDelete.js';

import {
    profileOpenButton,
    photoFormOpenBtn,
    profileCloseBtn,
    photoFormCloseBtn,
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
    validationSettings,
    avatar,
    editAvatarButton,
    formEditAvatar,
    cardContainer
} from "../utils/constants.js";


const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-42',
    headers: {
        authorization: '29a71108-ca9f-45bf-9a51-a59942050ce9',
        'Content-Type': 'application/json'
    }
});

let userId;

Promise.all([api.getCards(), api.getUserInfo()])
    .then(([initialCards, userData]) => {
        userInfo.setUserInfo(userData);
        userId = userData._id;
        cardList.renderItems(initialCards);
    })
    .catch((err) => {
        console.log(`Ошибка: ${err}`);
    })

const userInfo = new UserInfo({
    username: ".profile__title",
    userjob: ".profile__subtitle",
    avatar: ".profile__image"
});

/* /////////////////////////////////////////// */

const popupInfo = new PopupWithForm({
    popupSelector: '.popup_type_info',
    handleSubmitForm: (dataForm) => {
        popupInfo.loading(true);
        api.editProfile(dataForm)
            .then((dataForm) => {
                userInfo.setUserInfo(dataForm);
                popupInfo.close();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
            .finally(() => {
                popupInfo.loading(false);
            })
    }
});
popupInfo.setEventListeners();

function fillInData({ username, userjob }) {
    nameInput.value = username;
    jobInput.value = userjob;
}

profileOpenButton.addEventListener('click', () => {
    const info = userInfo.getUserInfo();
    fillInData({
        username: info.username,
        userjob: info.userjob
    });
    popupInfo.open();
})

/* /////////////////////////////////////////// */

const popUpAvatar = new PopupWithForm({
    popupSelector: '.popup_type_avatar',
    handleSubmitForm: (data) => {
        popUpAvatar.loading(true);
        api.editUserAvatar(data)
            .then((data) => {
                avatar.src = data.avatar;
                popUpAvatar.close();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
            .finally(() => {
                popUpAvatar.loading(false);
            })
    }
})

popUpAvatar.setEventListeners();

editAvatarButton.addEventListener('click', () => {
    popUpAvatar.open();
});

/* /////////////////////////////////////////// */

const createCard = (data) => {
    const card = new Card({
        data: data,
        selector: ".template",
        userId: userId,
        handleCardClick: (name, link) => {
            popupImage.open(name, link);
        },
        deleteIcon: (cardId) => {
            popupDelete.open();
            popupDelete.submitCallBack(() => {
                api.deleteCard(cardId)
                    .then(() => {
                        popupDelete.close();
                        card.deleteElement();
                    })
                    .catch((err) => {
                        console.log(`Ошибка: ${err}`);
                    });
            });
        },
        putLike: (cardId) => {
            api.clickOnLike(cardId)
                .then((data) => {
                    card.toggleLikeButton(data);
                })
                .catch((err) => {
                    console.log(`Ошибка: ${err}`);
                });
        },
        deleteLike: (cardId) => {
            api.deleteLike(cardId)
                .then((data) => {
                    card.toggleLikeButton(data);
                })
                .catch((err) => {
                    console.log(`Ошибка: ${err}`);
                });
        }
    });

    const cardElement = card.generateCard();
    return cardElement;
};


const cardList = new Section({
    renderer: (card) => {
        cardList.addItem(createCard(card));
    },
}, '.elements');

/* /////////////////////////////////////////// */

const popupDelete = new PopupWithDelete({
    popupSelector: '.popup_type_delete'
});

popupDelete.setEventListeners();



const popupPhoto = new PopupWithForm({
    popupSelector: '.popup_type_photo',
    handleSubmitForm: (dataForm) => {
        popupPhoto.loading(true);
        api.addNewCard(dataForm)
            .then((dataForm) => {
                cardList.addItem(createCard(dataForm));
                popupPhoto.close();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
            .finally(() => {
                popupPhoto.loading(false);
            })
    }
});

popupPhoto.setEventListeners();

photoFormOpenBtn.addEventListener('click', () => {
    popupPhoto.open();
});


const popupImage = new PopupWithImage(".popup_type_open-image");
popupImage.setEventListeners();



const popupFormsValidationEdit = new FormValidator(validationSettings, formEditElement);
const popupFormsValidationAdd = new FormValidator(validationSettings, formAddElement);
const popupFormsValidationAvatar = new FormValidator(validationSettings, formEditAvatar);

popupFormsValidationEdit.enableValidation();
popupFormsValidationAdd.enableValidation();
popupFormsValidationAvatar.enableValidation();