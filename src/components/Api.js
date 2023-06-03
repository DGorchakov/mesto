export default class Api {
    constructor({baseUrl, headers}) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }

    getInitialCards() {
        return fetch(this.baseUrl + '/cards', {headers: this.headers})
        .then(this._getResponseData);
    }

    addCard({name, link}) {
        return fetch(this.baseUrl + '/cards', {
            method: 'POST',
            'content-type': 'application/json',
            headers: this.headers, 
            body: JSON.stringify({
                name, 
                link
            })
        })
        .then(this._getResponseData);
    }

    deleteCard(cardId) {
        return fetch(this.baseUrl + `/cards/${cardId}`, {
            method: 'DELETE',
            headers: this.headers
        })
        .then(this._getResponseData);
    }

    likeCard(cardId) {
        return fetch(this.baseUrl + `/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this.headers
        })
        .then(this._getResponseData);
    }

    removeLikeFromCard(cardId) {
        return fetch(this.baseUrl + `/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this.headers
        })
        .then(this._getResponseData);
    }

    getUserInfo() {
        return fetch(this.baseUrl + '/users/me', {headers: this.headers})
        .then(this._getResponseData);
    }

    updateUserInfo({name, about}) {
        return fetch(this.baseUrl + '/users/me', {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name,
                about
            })
        })
        .then(this._getResponseData);
    }

    updateUserAvatar({avatar}) {
        return fetch(this.baseUrl + '/users/me/avatar', {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar
            })
        })
        .then(this._getResponseData);
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(res); 
        }
        return res.json();
    } 
}