import Popup from "./Popup";

export default class PopupWithDelete extends Popup {
    constructor({ popupSelector }) {
        super(popupSelector);
        this._form = this._popupSelector.querySelector('.popup__form');
    }

    submitCallBack(removing) {
        this._handleSumbit = removing;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('click', (evt) => {
            evt.preventDefault();
            this._handleSumbit();
        });
    }
}