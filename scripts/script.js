const openPopUp = document.querySelector(".profile__edit-button");
const addPhotoPopUp = document.querySelector(".profile__add-button");
const closeOpenPopUp = document.querySelector(".popup__close-button_type_edit");
const closeAddPhotoPopUp = document.querySelector(".popup__close-button_type_add");
const popUp = document.querySelector(".popup");
const popUpInfo = document.querySelector(".popup_type_info");
const popUpPhoto = document.querySelector(".popup_type_photo");
const popUpImage = document.querySelector(".popup_type_open-photo");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const formEditElement = document.querySelector(".popup__form_type_edit");
const formAddElement = document.querySelector(".popup__form_type_add");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");
const titleInput = document.querySelector(".popup__input_type_title");
const photoInput = document.querySelector(".popup__input_type_photo");

function openEdit() {
    popUpInfo.classList.add('popup_type_info_opened');
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
}

function closeEdit() {
    popUpInfo.classList.remove('popup_type_info_opened');
}

function openAdd() {
    popUpPhoto.classList.add('popup_type_photo_opened');
}

function closeAdd() {
    popUpPhoto.classList.remove('popup_type_photo_opened');
}

openPopUp.addEventListener('click', openEdit);
closeOpenPopUp.addEventListener('click', closeEdit);
addPhotoPopUp.addEventListener('click', openAdd);
closeAddPhotoPopUp.addEventListener('click', closeAdd);


function formSubmitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    closeEdit();
}
formEditElement.addEventListener('submit', formSubmitHandler);


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

function createCard(photoName, photoLink) {
    const photo = document.createElement('img');
    photo.classList.add('element__image');
    const container = document.createElement('div')
    container.classList.add('element__container');
    const title = document.createElement('h2');
    title.classList.add('element__title');
    const likeButton = document.createElement('button');
    likeButton.classList.add('element__like-button');
    const element = document.createElement('article');
    element.classList.add('element');
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('element__delete-button');

    const elements = document.querySelector(".elements");
    const popUpImage = document.querySelector(".popup_type_open-image");
    const picture = document.querySelector(".popup__image");
    const subtitle = document.querySelector(".popup__subtitle");
    const closePicture = document.querySelector(".popup__close-button_type_open-image");

    container.append(title, likeButton);
    element.append(photo, deleteButton, container);
    elements.prepend(element);
    photo.src = photoLink;
    title.textContent = photoName;

    deleteButton.addEventListener('click', function() {
        element.remove();
    });

    likeButton.addEventListener('click', function() {
        likeButton.classList.toggle('element__like-button_active');
    });

    photo.addEventListener('click', function() {
        popUpImage.classList.add('popup_type_open-image_opened');
        picture.src = photo.src;
        subtitle.textContent = title.textContent;
    });

    closePicture.addEventListener('click', function() {
        popUpImage.classList.remove('popup_type_open-image_opened');
    });
};

initialCards.forEach(function(picture) {
    createCard(picture.name, picture.link)
})

function photoAddFunc(evt) {
    evt.preventDefault();
    createCard(titleInput.value, photoInput.value);
    closeAdd()
}

formAddElement.addEventListener('submit', photoAddFunc);