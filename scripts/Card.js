import { openPopup } from './popupFunctions.js';

export default class Card {
    _popupImage = document.querySelector(".popup_type_open-image");
    _popupPhotoOpened = this._popupImage.querySelector(".popup__image");
    _popupImageSubtitle = this._popupImage.querySelector(".popup__subtitle");

    constructor(data, selector) {
        this._data = data;
        this._selector = selector;
        this._toggleLikeButton = this._toggleLikeButton.bind(this);
        this._deleteElement = this._deleteElement.bind(this);
    }

    _getCardTemplate() {
        this._element = document
            .querySelector(this._selector)
            .content.querySelector(".element")
            .cloneNode(true);
    }

    _resetPopup() {
        this._popupPhotoOpened.src = '';
        this._popupPhotoOpened.alt = '';
        this._popupImageSubtitle.textContent = '';
    }

    _openImagePopup({ name, link }) {
        this._resetPopup();
        this._popupPhotoOpened.src = link;
        this._popupPhotoOpened.alt = name;
        this._popupImageSubtitle.textContent = name;

        openPopup(this._popupImage);
    }

    _toggleLikeButton() {
        this._element.querySelector(".element__like-button").classList.toggle('element__like-button_active');
    }

    _deleteElement() {
        this._element.remove();
        this._element = null;
    }

    _setEventListeners() {
        const elementImage = this._element.querySelector(".element__image");
        elementImage.addEventListener('click', () => this._openImagePopup(this._data));

        const likeButton = this._element.querySelector(".element__like-button");
        likeButton.addEventListener('click', this._toggleLikeButton);

        const deleteButton = this._element.querySelector(".element__delete-button");
        deleteButton.addEventListener('click', this._deleteElement);
    }

    createCard() {

        this._getCardTemplate();
        this._setEventListeners();

        const image = this._element.querySelector(".element__image");
        image.alt = this._data.name;
        image.src = this._data.link;

        this._element.querySelector(".element__title").textContent = this._data.name;

        return this._element;
    }
}