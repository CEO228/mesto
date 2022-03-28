const profileOpenButton = document.querySelector(".profile__edit-button");
const photoFormOpenBtn = document.querySelector(".profile__add-button");
const profileCloseBtn = document.querySelector(".popup__close-button_type_edit");
const photoFormCloseBtn = document.querySelector(".popup__close-button_type_add");
const popUp = document.querySelector(".popup");
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

const template = document.querySelector(".template").content;

const elements = document.querySelector(".elements");
const popUpImage = document.querySelector(".popup_type_open-image");
const picture = document.querySelector(".popup__image");
const subtitle = document.querySelector(".popup__subtitle");
const closePicture = document.querySelector(".popup__close-button_type_open-image");

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function openEditProfileForm() {
    openPopup(popUpInfo);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
}

function closeEditProfileForm() {
    closePopup(popUpInfo);
}

function openPhotoAddForm() {
    openPopup(popUpPhoto);
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


const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

function getCard(photoName, photoLink) {
    const cardElement = template.querySelector(".element").cloneNode(true);
    cardElement.querySelector(".element__image").src = photoLink;
    cardElement.querySelector(".element__image").alt = photoName
    cardElement.querySelector(".element__title").textContent = photoName;

    cardElement.querySelector(".element__delete-button").addEventListener('click', function() {
        cardElement.remove();
    });

    cardElement.querySelector(".element__like-button").addEventListener('click', function(evt) {
        evt.target.classList.toggle('element__like-button_active');
    });

    cardElement.querySelector(".element__image").addEventListener('click', function() {
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