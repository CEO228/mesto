export default class Card {
    constructor(data, selector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._selector = selector;
        this._handleCardClick = handleCardClick;
    }

    _getCardTemplate() {
        const card = document
            .querySelector(this._selector)
            .content.querySelector(".element")
            .cloneNode(true);

        return card;
    }

    _setEventListeners() {
        this._likeButton = this._element.querySelector(".element__like-button");
        this._likeButton.addEventListener('click', () => {
            this._toggleLikeButton();
        });

        this._deleteButton = this._element.querySelector(".element__delete-button");
        this._deleteButton.addEventListener('click', () => {
            this._deleteElement();
        });

        this._element.querySelector(".element__image").addEventListener('click', () => {
            this._handleCardClick();
        })
    }


    _toggleLikeButton() {
        this._likeButton.classList.toggle('element__like-button_active');
    }

    _deleteElement() {
        this._element.remove();
        this._element = null;
    }

    createCard() {
        this._element = this._getCardTemplate();
        const elementImage = this._element.querySelector(".element__image");

        this._setEventListeners();

        elementImage.src = this._link;
        elementImage.alt = this._name;
        this._element.querySelector(".element__title").textContent = this._name;

        return this._element;
    }


}