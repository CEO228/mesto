let openPopUp = document.querySelector(".profile__edit-button");
let closePopUp = document.querySelector(".popup__close-button");
let popUp = document.querySelector(".popup");
let profileTitle = document.querySelector(".profile__title");
let profileSubtitle = document.querySelector(".profile__subtitle");
let formElement = document.querySelector(".popup__form");
let nameInput = document.querySelector(".popup__input_type_name");
let jobInput = document.querySelector(".popup__input_type_job");

function open() {
    popUp.classList.add('popup_opened');
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
}

function close() {
    popUp.classList.remove('popup_opened');
}

openPopUp.addEventListener('click', open)
closePopUp.addEventListener('click', close)


function formSubmitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    close();
}
formElement.addEventListener('submit', formSubmitHandler);