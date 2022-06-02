export default class Card {
    constructor({ data, selector, handleCardClick, userId, deleteIcon, putLike, deleteLike }) {
        this._name = data.name;
        this._link = data.link;
        this._selector = selector;
        this._handleCardClick = handleCardClick;
        this.cardId = data._id;
        this.userId = userId;
        this._userCard = data.owner._id;
        this._likes = data.likes;
        this._deleteIcon = deleteIcon;
        this._putLike = putLike;
        this._deleteLike = deleteLike;

    }

    _getCardTemplate() {
        this._card = document
            .querySelector(this._selector)
            .content.querySelector(".element")
            .cloneNode(true);

        return this._card;
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click', () => {
            if (this._likeButton.classList.contains('element__like-button_active')) {
                this._deleteLike(this.cardId);
            } else {
                this._putLike(this.cardId);
            }
        });

        this._deleteButton.addEventListener('click', () => {
            this._deleteIcon(this.cardId);
        });

        this._image.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        })
    }

    _isLiked() {
        if (this._likes.some((user) => {
                return this._userId === user._id;
            })) {
            this._likeButton.classList.add('element__like-button_active');
        }
    }


    toggleLikeButton(data) {
        this._likes = data.likes;
        this._likesNumber.textContent = this._likes.length;
        this._likeButton.classList.toggle('element__like-button_active');
    }

    _hasDeleteBtn() {
        if (this._userId !== this._userCard) {
            this._deleteButton.remove();
        }
    }

    deleteElement() {
        this._element.remove();
        this._element = null;
    }

    generateCard() {
        this._element = this._getCardTemplate();
        const elementImage = this._element.querySelector(".element__image");
        this._deleteButton = this._element.querySelector(".element__delete-button");
        this._likeButton = this._element.querySelector(".element__like-button");
        this._image = this._element.querySelector(".element__image");
        this._likesNumber = this._element.querySelector(".element__like-number");

        this._setEventListeners();

        elementImage.src = this._link;
        elementImage.alt = this._name;
        this._element.querySelector(".element__title").textContent = this._name;

        this._hasDeleteBtn();
        this._isLiked();
        this._likesNumber.textContent = this._likes.length;
        this._setEventListeners();

        return this._element;
    }


}