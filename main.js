(()=>{"use strict";var t={917:(t,e,r)=>{t.exports=r.p+"bed0beba0e8bf953080b.svg"},436:(t,e,r)=>{t.exports=r.p+"3f37e96d8d04d1e67452.jpg"}},e={};function r(n){var o=e[n];if(void 0!==o)return o.exports;var i=e[n]={exports:{}};return t[n](i,i.exports,r),i.exports}r.m=t,r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r.p="",r.b=document.baseURI||self.location.href,(()=>{function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(e,r){for(var n=0;n<r.length;n++){var o=r[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,(void 0,i=function(e,r){if("object"!==t(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var o=n.call(e,"string");if("object"!==t(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(o.key),"symbol"===t(i)?i:String(i)),o)}var i}var n=new URL(r(436),r.b),o=function(){function t(e,r,n,o,i){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._name=e.name,this._link=e.link,this._likeCount=e.likes.length,this._id=e._id,this._templateSelector=r,this._handleCardClick=n,this._handleLikeClick=o,this._deleteCardPopup=i}var r,o;return r=t,(o=[{key:"state",get:function(){return{name:this._name,link:this._link}}},{key:"id",get:function(){return this._id}},{key:"isLiked",get:function(){return this._isLiked}},{key:"getCardElement",value:function(){var t=this;return this._element||(this._element=this._getTemplate(),this._element.querySelector(".gallery__name").textContent=this._name,this.setLikeCount(this._likeCount),this._galleryImg=this._element.querySelector(".gallery__img"),this._setEventListeners(),this._galleryImg.onerror=function(){return t._galleryImg.src=n},this.toggleLikeState(this._isLiked),this._hideTrashButton(),this._galleryImg.alt=this._name,this._galleryImg.src=this._link),this._element}},{key:"_getTemplate",value:function(){return document.querySelector(this._templateSelector).content.querySelector(".gallery__item").cloneNode(!0)}},{key:"_setEventListeners",value:function(){var t=this;this._likeBtn=this._element.querySelector(".gallery__like"),this._trashBtn=this._element.querySelector(".gallery__trush-btn"),this._galleryImg.addEventListener("click",(function(){t._handleCardClick(t._name,t._link)})),this._likeBtn.addEventListener("click",this._handleLikeClick.bind(this)),this._trashBtn.addEventListener("click",(function(){t._deleteCardPopup.open(),t._deleteCardPopup._cardRef=t}))}},{key:"toggleLikeState",value:function(t){t?this._likeBtn.classList.add("gallery__like_active"):this._likeBtn.classList.remove("gallery__like_active")}},{key:"setLikeCount",value:function(t){this._element.querySelector(".gallery__count").textContent=t}},{key:"removeCardElement",value:function(){this._element.remove()}},{key:"setLikedByCurrentUser",value:function(t){this._isLiked=t}},{key:"setCreatedByCurrentUser",value:function(t){this._isCurrentUserCard=t}},{key:"_hideTrashButton",value:function(){this._isCurrentUserCard||(this._trashBtn.hidden=!0)}}])&&e(r.prototype,o),Object.defineProperty(r,"prototype",{writable:!1}),t}();function i(t){return i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},i(t)}function u(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==i(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==i(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===i(o)?o:String(o)),n)}var o}var a=function(){function t(e,r){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._formSelectors=e,this._formElement=r,this._inputList=Array.from(r.querySelectorAll(e.inputSelector)),this._submitButton=r.querySelector(e.submitButtonSelector),this._inactiveButtonClass=e.inactiveButtonClass}var e,r;return e=t,(r=[{key:"enableValidation",value:function(){this._formElement.addEventListener("submit",(function(t){t.preventDefault()})),this._setEventListeners()}},{key:"refreshValidation",value:function(){var t=this;this._inputList.forEach((function(e){return t._checkInputValidity(e)})),this._toggleButtonState(),this._inputList.forEach((function(t){return t.setCustomValidity("")}))}},{key:"_setEventListeners",value:function(){var t=this;this._toggleButtonState(),this._inputList.forEach((function(e){e.addEventListener("input",(function(){t._checkInputValidity(e),t._toggleButtonState()}))})),this._formElement.addEventListener("reset",(function(){t._disableSubmitButton(!0)}))}},{key:"_toggleButtonState",value:function(){this._hasInvalidInput()?this._disableSubmitButton(!0):this._disableSubmitButton(!1)}},{key:"_hasInvalidInput",value:function(){return this._inputList.some((function(t){return!t.validity.valid}))}},{key:"_checkInputValidity",value:function(t){t.validity.valid?this._hideInputError(t):this._showInputError(t,t.validationMessage)}},{key:"_showInputError",value:function(t,e){var r=this._formSelectors.errorClass,n=this._formSelectors.inputErrorClass,o=this._formElement.querySelector(".".concat(t.id,"-error"));t.classList.add(n),o.textContent=e,o.classList.add(r)}},{key:"_hideInputError",value:function(t){var e=this._formSelectors.errorClass,r=this._formSelectors.inputErrorClass,n=this._formElement.querySelector(".".concat(t.id,"-error"));t.classList.remove(r),n.classList.remove(e),n.textContent=""}},{key:"_disableSubmitButton",value:function(t){this._submitButton.disabled=t,t?this._submitButton.classList.add(this._inactiveButtonClass):this._submitButton.classList.remove(this._inactiveButtonClass)}}])&&u(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),t}();function s(t){return s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},s(t)}function c(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==s(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==s(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===s(o)?o:String(o)),n)}var o}var l=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._popupEl=document.querySelector(e),this._handleEsc=this._handleEscClose.bind(this)}var e,r;return e=t,(r=[{key:"popupEl",get:function(){return this._popupEl}},{key:"setEventListeners",value:function(){var t=this;this._popupEl.addEventListener("click",(function(e){e.target===e.currentTarget&&t.close()})),this._popupEl.querySelector(".popup__close-btn").addEventListener("click",(function(){return t.close()}))}},{key:"close",value:function(){this._popupEl.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEsc)}},{key:"open",value:function(){this._popupEl.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEsc)}},{key:"_handleEscClose",value:function(t){"Escape"===t.key&&this.close()}}])&&c(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),t}();function f(t){return f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},f(t)}function p(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==f(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==f(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===f(o)?o:String(o)),n)}var o}function y(){return y="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,r){var n=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=m(t)););return t}(t,e);if(n){var o=Object.getOwnPropertyDescriptor(n,e);return o.get?o.get.call(arguments.length<3?t:r):o.value}},y.apply(this,arguments)}function h(t,e){return h=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},h(t,e)}function m(t){return m=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},m(t)}var d=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&h(t,e)}(u,t);var e,r,n,o,i=(n=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=m(n);if(o){var r=m(this).constructor;t=Reflect.construct(e,arguments,r)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===f(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,t)});function u(t,e){var r;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u),(r=i.call(this,t))._handleSubmitForm=e,r._formEl=r.popupEl.querySelector(".popup__form"),r}return e=u,(r=[{key:"formEl",get:function(){return this._formEl}},{key:"setEventListeners",value:function(){var t=this;y(m(u.prototype),"setEventListeners",this).call(this),this._formEl.addEventListener("submit",(function(e){e.preventDefault(),t._handleSubmitForm(e,t.getInputValues())}))}},{key:"close",value:function(){y(m(u.prototype),"close",this).call(this),this._formEl.reset()}},{key:"getInputValues",value:function(){var t={};return Array.from(this._formEl.elements).forEach((function(e){"INPUT"===e.tagName&&(t[e.name]=e.value)})),t}},{key:"setInputValues",value:function(t){return Array.from(this._formEl.elements).forEach((function(e){"INPUT"===e.tagName&&(e.value=t[e.name])})),this}},{key:"setLoadingSubmit",value:function(t){this.popupEl.querySelector(".popup__submit-text").hidden=t,this.popupEl.querySelector(".popup__submit_loading").hidden=!t}}])&&p(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),u}(l);function v(t){return v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},v(t)}function b(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==v(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==v(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===v(o)?o:String(o)),n)}var o}function _(){return _="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,r){var n=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=S(t)););return t}(t,e);if(n){var o=Object.getOwnPropertyDescriptor(n,e);return o.get?o.get.call(arguments.length<3?t:r):o.value}},_.apply(this,arguments)}function g(t,e){return g=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},g(t,e)}function S(t){return S=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},S(t)}var k=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&g(t,e)}(u,t);var e,r,n,o,i=(n=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=S(n);if(o){var r=S(this).constructor;t=Reflect.construct(e,arguments,r)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===v(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,t)});function u(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u),(e=i.call(this,t))._imageEl=e.popupEl.querySelector(".popup__img"),e._nameEl=e.popupEl.querySelector(".popup__place-name"),e}return e=u,(r=[{key:"open",value:function(t,e){this._imageEl.src=e,this._imageEl.alt=t,this._nameEl.textContent=t,_(S(u.prototype),"open",this).call(this)}}])&&b(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),u}(l);function E(t){return E="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},E(t)}function w(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==E(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==E(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===E(o)?o:String(o)),n)}var o}var j=function(){function t(e,r){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._renderer=e,this._container=document.querySelector(r)}var e,r;return e=t,(r=[{key:"addItem",value:function(t){this._container.prepend(t)}},{key:"renderItems",value:function(t){var e=this;t.forEach((function(t){e._renderer(t)}))}}])&&w(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),t}();function P(t){return P="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},P(t)}function C(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==P(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==P(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===P(o)?o:String(o)),n)}var o}var L=new URL(r(917),r.b),O=function(){function t(e,r,n){var o=e.userNameSelector,i=e.userAboutSelector,u=e.userAvatarSelector;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._userNameEl=document.querySelector(o),this._userAboutEl=document.querySelector(i),this._userAvatarEl=document.querySelector(u),this._updateAvatarPopup=n,this._handleInitUser=r}var e,r;return e=t,(r=[{key:"getUserInfo",value:function(){return{name:this._userNameEl.textContent,about:this._userAboutEl.textContent}}},{key:"id",get:function(){return this._userId}},{key:"initUser",value:function(){this._handleInitUser(),this._setEventListeners()}},{key:"_setEventListeners",value:function(){var t=this;this._userAvatarEl.addEventListener("click",(function(){return t._updateAvatarPopup.open()}))}},{key:"setUserInfo",value:function(t){var e=t.name,r=t.about,n=t._id;this._userNameEl.textContent=e,this._userAboutEl.textContent=r,this._userId=n}},{key:"setAvatar",value:function(t){var e=this,r=t.avatar,n=document.createElement("img");n.src=r,n.onload=function(){return e._userAvatarEl.style.backgroundImage="url('".concat(r,"')")},n.onerror=function(){return e._userAvatarEl.style.backgroundImage="url('".concat(L,"')")}}}])&&C(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),t}();function I(t){return I="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},I(t)}function T(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==I(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==I(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===I(o)?o:String(o)),n)}var o}var U=function(){function t(e){var r=e.baseUrl,n=e.headers;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.baseUrl=r,this.headers=n}var e,r;return e=t,(r=[{key:"getInitalCards",value:function(){return fetch(this.baseUrl+"/cards",{headers:this.headers}).then((function(t){return t.ok?t.json():Promise.reject(t)}))}},{key:"addCard",value:function(t){var e=t.name,r=t.link;return fetch(this.baseUrl+"/cards",{method:"POST","content-type":"application/json",headers:this.headers,body:JSON.stringify({name:e,link:r})}).then((function(t){return t.ok?t.json():Promise.reject(t)}))}},{key:"deleteCard",value:function(t){return fetch(this.baseUrl+"/cards/".concat(t),{method:"DELETE",headers:this.headers}).then((function(t){return t.ok?t.json():403==t.status?Promise.reject(t):Promise.reject("Произошла ошибка. Попробуйте позднее")}))}},{key:"likeCard",value:function(t){return fetch(this.baseUrl+"/cards/".concat(t,"/likes"),{method:"PUT",headers:this.headers}).then((function(t){return t.ok?t.json():Promise.reject(t)}))}},{key:"removeLikeFromCard",value:function(t){return fetch(this.baseUrl+"/cards/".concat(t,"/likes"),{method:"DELETE",headers:this.headers}).then((function(t){return t.ok?t.json():Promise.reject(t)}))}},{key:"getUserInfo",value:function(){return fetch(this.baseUrl+"/users/me",{headers:this.headers}).then((function(t){return t.ok?t.json():Promise.reject(t)}))}},{key:"updateUserInfo",value:function(t){var e=t.name,r=t.about;return fetch(this.baseUrl+"/users/me",{method:"PATCH",headers:this.headers,body:JSON.stringify({name:e,about:r})}).then((function(t){return t.ok?t.json():Promise.reject(t)}))}},{key:"updateUserAvatar",value:function(t){var e=t.avatar;return fetch(this.baseUrl+"/users/me/avatar",{method:"PATCH",headers:this.headers,body:JSON.stringify({avatar:e})}).then((function(t){return t.ok?t.json():Promise.reject(t)}))}}])&&T(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),t}();function B(t){return B="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},B(t)}function A(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==B(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==B(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===B(o)?o:String(o)),n)}var o}var q,R=function(){function t(e,r){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._templateSelector=e,this._containerSelector=r}var e,r;return e=t,r=[{key:"_getTemplate",value:function(){return document.querySelector(this._templateSelector).content.querySelector(".notification").cloneNode(!0)}},{key:"_setEventListeners",value:function(t){t.querySelector(".notification__close").addEventListener("click",(function(e){t.remove()}))}},{key:"showNotification",value:function(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:5e3,n=this._createNotificationEl(t,e);this._containerSelector.prepend(n),setTimeout((function(){return n.remove()}),r)}},{key:"_createNotificationEl",value:function(t,e){var r=this._getTemplate();return this._setEventListeners(r),r.querySelector(".notification__text").textContent=e,"error"==t&&r.classList.add("notification_type_error"),"success"==t&&r.classList.add("notification_type_success"),r}}],r&&A(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),t}(),x=document.querySelector(".profile__edit-button"),N=document.querySelector(".profile__add-button"),V="Что-то пошло не так. Попробуйте позднее.",D=new U({baseUrl:"https://mesto.nomoreparties.co/v1/cohort-66",headers:{authorization:"3818e028-4eb9-485e-bc4c-7c7f3305bc3d","Content-Type":"application/json"}}),F=new R("#notification-template",document.querySelector(".notification__list")),J=new j((function(t){return J.addItem(Q(t))}),".gallery__container"),H={};q={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__submit",inactiveButtonClass:"popup__submit_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},Array.from(document.querySelectorAll(q.formSelector)).filter((function(t){return"delete-card"!==t.getAttribute("name")})).forEach((function(t){var e=new a(q,t),r=t.getAttribute("name");H[r]=e,e.enableValidation()}));var z={deleteCard:new d(".delete-card-popup",(function(){var t=this;D.deleteCard(this._cardRef.id).then((function(e){var r;return t._cardRef.removeCardElement(),r=e.message,F.showNotification("success",r),e})).catch((function(t){return t.json().then((function(t){return W(t.message)}))})).finally(this.close())})),updateAvatar:new d(".avatar-popup",(function(t,e){var r=this;this.setLoadingSubmit(!0),D.updateUserAvatar(e).then((function(t){M.setAvatar(e),r.close()})).catch((function(t){return X(t,r)})).finally((function(){return r.setLoadingSubmit(!1)}))})),addPlace:new d(".place-popup",(function(t,e){var r=this;this.setLoadingSubmit(!0),D.addCard(e).then((function(e){J.addItem(Q(e)),r.close(),t.target.reset()})).catch((function(t){return X(t,r)})).finally((function(){return r.setLoadingSubmit(!1)}))})),editProfile:new d(".profile-popup",(function(t,e){var r=this;this.setLoadingSubmit(!0),D.updateUserInfo(e).then((function(t){M.setUserInfo(t),r.close()})).catch((function(t){return X(t,r)})).finally((function(){return r.setLoadingSubmit(!1)}))})),imageView:new k(".image-popup")};Object.values(z).forEach((function(t){return t.setEventListeners()})),x.addEventListener("click",(function(){return z.editProfile.setInputValues(M.getUserInfo()).open()})),N.addEventListener("click",(function(){return z.addPlace.open()})),D.getInitalCards().then((function(t){return J.renderItems(t)})).catch((function(){return W(V)}));var M=new O({userNameSelector:".profile__title",userAboutSelector:".profile__about",userAvatarSelector:".profile__avatar"},(function(){var t=this;D.getUserInfo().then((function(e){t.setUserInfo(e),t.setAvatar(e),x.hidden=!1})).catch((function(){return W(V)}))}),z.updateAvatar);function G(t,e){z.imageView.open(t,e)}function K(){var t=this;(this.isLiked?D.removeLikeFromCard(this.id):D.likeCard(this.id)).then((function(e){t.setLikeCount(e.likes.length),t.toggleLikeState(!t.isLiked),t.setLikedByCurrentUser(!t.isLiked)})).catch((function(){return W(V)}))}function Q(t){var e=new o(t,"#card-template",G,K,z.deleteCard);return e.setLikedByCurrentUser(t.likes.findIndex((function(t){return t._id===M.id}))>=0),e.setCreatedByCurrentUser(t.owner._id===M.id),e.getCardElement()}function W(t){F.showNotification("error",t)}function X(t,e){var r=e.formEl,n=e.formEl.getAttribute("name");t.json().then((function(t){for(var e in t.errors)r[e].setCustomValidity(t.errors[e].message)})).then((function(){return H[n].refreshValidation()})).catch((function(){return W(V)}))}M.initUser()})()})();