export default class Api {
    constructor({baseUrl, headers}) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }

    getInitalCards() {
        return fetch(this.baseUrl + '/cards', {headers: this.headers})
        .then(res => {
            if (res.ok) return res.json();
            return Promise.reject(res);
        })
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
        .then(res => {
            if (res.ok) return res.json();
            return Promise.reject(res);
        })
    }

    deleteCard(cardId) {
        return fetch(this.baseUrl + `/cards/${cardId}`, {
            method: 'DELETE',
            headers: this.headers
        })
        .then(res => {
            if (res.ok) return res.json();
            if (res.status == 403) return Promise.reject("Нельзя удалить карточку другого пользователя");
            return Promise.reject("Произошла ошибка. Попробуйте позднее");
        })
    }

    likeCard(cardId) {
        return fetch(this.baseUrl + `/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this.headers
        })
        .then(res => {
            if (res.ok) return res.json();
            return Promise.reject(res);
        })
    }

    removeLikeFromCard(cardId) {
        return fetch(this.baseUrl + `/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this.headers
        })
        .then(res => {
            if (res.ok) return res.json();
            return Promise.reject(res);
        })
    }

    getUserInfo() {
        return fetch(this.baseUrl + '/users/me', {headers: this.headers})
        .then(res => {
            if (res.ok) return res.json();
            return Promise.reject(res);
        })
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
        .then(res => {
            if (res.ok) return res.json();
            return Promise.reject(res);
        })
    }

    updateUserAvatar({avatar}) {
        return fetch(this.baseUrl + '/users/me/avatar', {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar
            })
        })
        .then(res => {
            if (res.ok) return res.json();
            return Promise.reject(res);
        })
    }

    checkIfImageExist(url) {
        return fetch(url)
        .catch(err => Promise.reject("Изображение не может быть скачено. Попробуйте другую ссылку"))
        .then(res => {
            if (res.ok) return res;
            return Promise.reject("Изображение не может быть скачено. Попробуйте другую ссылку");
        });
    }
}