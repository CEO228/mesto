import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._imageTitle = this._popupSelector.querySelector(".popup__subtitle");
        this._imageSrc = this._popupSelector.querySelector(".popup__image");
    }

    open({ name, link }) {
        super.open();

        this._imageTitle.textContent = name;
        this._imageSrc.alt = name;
        this._imageSrc.src = link;
    }
}