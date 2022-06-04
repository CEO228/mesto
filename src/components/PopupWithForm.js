import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, handleSubmitForm }) {
        super(popupSelector);
        this._handlerSubmitForm = handleSubmitForm;
        this._popupForm = this._popupSelector.querySelector(".popup__form");
        this._inputs = this._popupForm.querySelectorAll(".popup__input");
        this._saveButton = this._popupForm.querySelector(".popup__save-button");
        this._saveButtonText = this._saveButton.textContent;
    }

    _getInputValues() {
        this._formValue = {};

        this._inputs.forEach((input) => {
            this._formValue[input.name] = input.value;
        });
        return this._formValue;
    }



    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handlerSubmitForm(this._getInputValues());
        });
    }

    close() {
        super.close();
        this._popupForm.reset();
    }

    loading(isLoading) {
        if (isLoading) {
            this._saveButtonText = 'Сохранение...';
        } else {
            this._saveButton.textContent = this._saveButtonText;
        }
    }
}