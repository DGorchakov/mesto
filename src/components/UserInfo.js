const noAvatar = new URL('../images/avatar.svg', import.meta.url);

export default class UserInfo {
    constructor({userNameSelector, userAboutSelector, userAvatarSelector}, handleInitUser, updateAvatarPopup){
        this._userNameEl = document.querySelector(userNameSelector);
        this._userAboutEl = document.querySelector(userAboutSelector);
        this._userAvatarEl = document.querySelector(userAvatarSelector);
        this._updateAvatarPopup = updateAvatarPopup;
        this._handleInitUser = handleInitUser;
    }

    getUserInfo() {
        return {
            name : this._userNameEl.textContent,
            about : this._userAboutEl.textContent
        }
    }

    get id() {
        return this._userId;
    }

    initUser() {
        this._handleInitUser();
        this._setEventListeners();
    }

    _setEventListeners() {
        this._userAvatarEl.addEventListener('click', () => this._updateAvatarPopup.open());
    }

    setUserInfo({name, about, _id}) {
        this._userNameEl.textContent = name;
        this._userAboutEl.textContent = about;
        this._userId = _id;
    }

    setAvatar({avatar}) {
        const img = document.createElement('img');
        img.src = avatar;

        img.onload = () => this._userAvatarEl.style.backgroundImage = `url('${avatar}')`;
        img.onerror = () => this._userAvatarEl.style.backgroundImage = `url('${noAvatar}')`;
    }
}