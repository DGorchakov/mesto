export default class UserInfo {
    constructor(userNameSelector, userAboutSelector){
        this._userNameEl = document.querySelector(userNameSelector);
        this._userAboutEl = document.querySelector(userAboutSelector);
    }

    getUserInfo() {
        return {
            name : this._userNameEl.textContent,
            about : this._userAboutEl.textContent
        }
    }

    setUserInfo({name, about}) {
        this._userNameEl.textContent = name;
        this._userAboutEl.textContent = about;
    }
}