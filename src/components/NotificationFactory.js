export default class NotificationFactory {
    constructor(templateSelector, containerSelector) {
        this._templateSelector = templateSelector;
        this._containerSelector = containerSelector;
    }

    _getTemplate() {
        const notificationEl = document
          .querySelector(this._templateSelector)
          .content
          .querySelector('.notification')
          .cloneNode(true);
    
        return notificationEl;
      }

    _setEventListeners(notificationEl) {
        notificationEl.querySelector('.notification__close').addEventListener('click', e => {
            notificationEl.remove();
        })        
    }
    
    showNotification(status, text, ms=5000) {
        const notificationEl = this._createNotificationEl(status, text);
        this._containerSelector.prepend(notificationEl);
        setTimeout(() => notificationEl.remove(), ms);
    }

    _createNotificationEl(status, text) {
        const notificationEl = this._getTemplate();
        this._setEventListeners(notificationEl);
        notificationEl.querySelector('.notification__text').textContent = text;
        if (status == "error") notificationEl.classList.add('notification_type_error');
        if (status == "success") notificationEl.classList.add('notification_type_success');

        return notificationEl;
    }
}