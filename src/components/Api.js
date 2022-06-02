export default class Api {
    constructor(options) {
        this._url = options.url;
        this._headers = options.headers;
    }

    _getResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
                headers: this._headers
            })
            .then(res => this._getResponse(res));
    }

    getCards() {
        return fetch(`${this._url}/cards`, {
                headers: this._headers
            })
            .then(res => this._getResponse(res));
    }

    editProfile(data) {
        return fetch(`${this._url}/users/me`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    name: data.username,
                    about: data.userjob
                })
            })
            .then(res => this._getResponse(res));
    }

    addNewCard(data) {
        return fetch(`${this._url}/cards`, {
                method: 'POST',
                headers: this._headers,
                body: JSON.stringify({
                    name: data.name,
                    link: data.link
                })
            })
            .then(res => this._getResponse(res));
    }

    putLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
                method: 'PUT',
                headers: this._headers
            })
            .then(res => this._getResponse(res));
    }

    deleteLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
                method: 'DELETE',
                headers: this._headers
            })
            .then(res => this._getResponse(res));
    }

    deleteIcon(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
                method: 'DELETE',
                headers: this._headers
            })
            .then(res => this._getResponse(res));
    }

    editUserAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    avatar: data.avatar
                })
            })
            .then(res => this._getResponse(res));
    }
}