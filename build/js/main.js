'use strict';
/* var pageHeader = document.querySelector('.page-header');
var headerToggle = document.querySelector('.page-header__toggle');

pageHeader.classList.remove('page-header--nojs');

headerToggle.addEventListener('click', function () {
  if (pageHeader.classList.contains('page-header--closed')) {
    pageHeader.classList.remove('page-header--closed');
    pageHeader.classList.add('page-header--opened');
  } else {
    pageHeader.classList.add('page-header--closed');
    pageHeader.classList.remove('page-header--opened');
  }
});*/

(function () {

  var ESC_KEYCODE = 27;
  var popupOpenButton = document.querySelector('.header__button');
  var popup = document.querySelector('.modal');
  var popupCloseButton = popup.querySelector('.modal__close');
  var form = popup.querySelector('form');
  var userName = popup.querySelector('#modal-name');
  var userTel = popup.querySelector('#modal-tel');
  var userMessage = popup.querySelector('textarea');
  var body = document.querySelector('body');

  var isStorageSupport = true;
  var storageName = '';
  var storageTel = '';
  var storageMessage = '';

  // проверка доступности localStorage
  try {
    storageName = localStorage.getItem('name');
    storageTel = localStorage.getItem('tel');
    storageMessage = localStorage.getItem('message');
  } catch (err) {
    isStorageSupport = false;
  }

  /**
  * проверяет, был ли нажат esc
  * @param {event} evt
  * @return {Boolean}
  */
  var isEscEvent = function (evt) {
    return evt.keyCode === ESC_KEYCODE;
  };

  /**
  * закрывает попап
  */
  var closePopup = function () {
    popup.classList.remove('modal_show');
    popupCloseButton.removeEventListener('click', onButtonClick);
    popup.removeEventListener('click', onOverlayClick);
    document.removeEventListener('keydown', onPopupEscPress);

    if (body) {
      body.classList.remove('noscroll');
    }
  };

  /**
  * закрывает попап по клику на кнопку
  * @param {Event} evt
  */
  var onButtonClick = function (evt) {
    evt.preventDefault();
    closePopup();
  };

  /**
  * закрывает попап по клику на overlay
  * @param {Event} evt
  */
  var onOverlayClick = function (evt) {
    if (evt.target === popup) {
      evt.preventDefault();
      closePopup();
    }
  };

  /**
  * закрывает попап по esc
  * @param {Event} evt
  */
  var onPopupEscPress = function (evt) {
    if (isEscEvent(evt)) {
      closePopup();
    }
  };


  if (popupOpenButton) {
    popupOpenButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      if (popup) {
        popup.classList.add('modal_show');
        popup.addEventListener('click', onOverlayClick);
        if (body) {
          body.classList.add('noscroll');
        }

        if (popupCloseButton) {
          popupCloseButton.addEventListener('click', onButtonClick);
        }
        // вставляем значения из localSorage
        if (userName) {
          userName.focus();
          if (storageName) {
            userName.value = storageName;
          }
        }
        if (userTel && storageTel) {
          userTel.value = storageTel;
        }
        if (userMessage && storageMessage) {
          userMessage.value = storageMessage;
        }

        document.addEventListener('keydown', onPopupEscPress);
      }
    });
  }

  if (form) {
    form.addEventListener('submit', function () {
      if (userName && userName.value && isStorageSupport) {
        localStorage.setItem('name', userName.value);
      }
      if (userTel && userTel.value && isStorageSupport) {
        localStorage.setItem('tel', userTel.value);
      }
      if (userMessage && userMessage.value && isStorageSupport) {
        localStorage.setItem('message', userMessage.value);
      }
    });
  }

  // открытие и закрытие меню в футере, мобильная версия
  var footerNav = document.querySelector('.footer__nav');
  if (footerNav) {
    var footerNavToggle = footerNav.querySelector('.footer__toggle-wrapper');
  }

  var footerContact = document.querySelector('.footer__contacts');
  if (footerContact) {
    var footerContactToggle = footerContact.querySelector('.footer__toggle-wrapper');
  }

  /**
  * удаляет класс
  * @param {HTMLElement} el
  * @param {string} name
  */
  var classRemove = function (el, name) {
    if (el.classList.contains(name)) {
      el.classList.remove(name);
    }
  };

  /**
  * переключает класс
  * @param {HTMLElement} el1
  * @param {HTMLElement} el2
  * @param {string} name
  */
  var classToggle = function (el1, el2, name) {
    if (el1.classList.contains(name)) {
      el1.classList.remove(name);
      if (el2 && !el2.classList.contains(name)) {
        el2.classList.add(name);
      }
    } else {
      el1.classList.add(name);
    }
  };

  if (footerNavToggle) {
    classRemove(footerNav, 'footer__info_nojs');

    footerNavToggle.addEventListener('click', function (evt) {
      evt.preventDefault();
      classToggle(footerNav, footerContact, 'footer__info_closed');
    });
  }

  if (footerContactToggle) {
    classRemove(footerContact, 'footer__info_nojs');

    footerContactToggle.addEventListener('click', function (evt) {
      evt.preventDefault();
      classToggle(footerContact, footerNav, 'footer__info_closed');
    });
  }


  // прокрутка к якорю
  var hiddenElement = document.querySelector('section.advantages');
  var btn = document.querySelector('.promo__scroll');

  if (hiddenElement && btn) {
    var onLinkAnchorClick = function (evt) {
      evt.preventDefault();
      hiddenElement.scrollIntoView({block: 'start', behavior: 'smooth'});
    };

    btn.addEventListener('click', onLinkAnchorClick);
  }
})();

'use strict';

// добавялет маску к номеру телефона
(function () {
  var telInputs = Array.prototype.slice.call(document.querySelectorAll('input[type=tel]'));
  var maskOptions = {
    mask: '+{7}(000)000-00-00'
  };


  telInputs.forEach(function (it) {
    if (it) {
      var mask = IMask(it, maskOptions);
    }
  });
})();
