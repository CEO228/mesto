const profileOpenButton = document.querySelector(".profile__edit-button");
const photoFormOpenBtn = document.querySelector(".profile__add-button");
const profileCloseBtn = document.querySelector(".popup__close-button_type_edit");
const photoFormCloseBtn = document.querySelector(".popup__close-button_type_add");
const popUpInfo = document.querySelector(".popup_type_info");
const popUpPhoto = document.querySelector(".popup_type_photo");
const popUpImae = document.querySelector(".popup_type_open-photo");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const formEditElement = document.querySelector(".popup__form_type_edit");
const formAddElement = document.querySelector(".popup__form_type_add");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");
const titleInput = document.querySelector(".popup__input_type_title");
const photoInput = document.querySelector(".popup__input_type_photo");
const popUpContainer = document.querySelector(".popup__container");
const popUpList = document.querySelectorAll(".popup");

const template = document.querySelector(".template").content;

const elements = document.querySelector(".elements");
const popUpImage = document.querySelector(".popup_type_open-image");
const picture = document.querySelector(".popup__image");
const subtitle = document.querySelector(".popup__subtitle");
const closePicture = document.querySelector(".popup__close-button_type_open-image");


function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEsc);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEsc);
}

function openEditProfileForm() {
    openPopup(popUpInfo);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
}

function closeEditProfileForm() {
    closePopup(popUpInfo);
}

const photoAddFormInputs = Array.from(formAddElement.querySelectorAll(".popup__input"));
const photoAddFormBtn = formAddElement.querySelector(".popup__save-button");

function openPhotoAddForm() {
    openPopup(popUpPhoto);
    toggleButtonState(photoAddFormInputs, photoAddFormBtn, "popup__save-button_status_inactive");
}

function closePhotoAddForm() {
    closePopup(popUpPhoto);
}

profileOpenButton.addEventListener('click', openEditProfileForm);
profileCloseBtn.addEventListener('click', closeEditProfileForm);
photoFormOpenBtn.addEventListener('click', openPhotoAddForm);
photoFormCloseBtn.addEventListener('click', closePhotoAddForm);


function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    closeEditProfileForm();
}
formEditElement.addEventListener('submit', handleProfileFormSubmit);


function getCard(photoName, photoLink) {
    const cardElement = template.querySelector(".element").cloneNode(true);
    const cardImage = cardElement.querySelector(".element__image");
    cardImage.src = photoLink;
    cardImage.alt = photoName;
    cardElement.querySelector(".element__title").textContent = photoName;

    cardElement.querySelector(".element__delete-button").addEventListener('click', function() {
        cardElement.remove();
    });

    cardElement.querySelector(".element__like-button").addEventListener('click', function(evt) {
        evt.target.classList.toggle('element__like-button_active');
    });

    cardImage.addEventListener('click', function() {
        openPopup(popUpImage);
        picture.src = photoLink
        picture.alt = photoName
        subtitle.textContent = photoName
    });
    return cardElement
}

function createCard(photoName, photoLink) {
    const element = getCard(photoName, photoLink)
    elements.prepend(element);
}

closePicture.addEventListener('click', function() {
    closePopup(popUpImage);
});


initialCards.forEach(function(cardPhoto) {
    createCard(cardPhoto.name, cardPhoto.link)
})

function handleAddPhoto(evt) {
    evt.preventDefault();
    createCard(titleInput.value, photoInput.value);
    formAddElement.reset();
    closePhotoAddForm()
}

formAddElement.addEventListener('submit', handleAddPhoto);

function closePopupEsc(evt) {
    if (evt.keyCode == 27) {
        for (var i = 0; i < popUpList.length; i++) {
            closePopup(popUpList[i]);
        }
    }
};

popUpList.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup);
        }
    })
});