import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor({ popupSelector, imageTitle, imageSrc }) {
        super(popupSelector);
        this._imageTitle = document.querySelector(imageTitle);
        this._imageSrc = document.querySelector(imageSrc);
    }

    open(name, link) {
        super.open();

        this._imageTitle.textContent = name;
        this._imageSrc.alt = name;
        this._imageSrc.src = link;
    }
}