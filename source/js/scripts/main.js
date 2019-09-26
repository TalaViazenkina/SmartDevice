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
  var overlay = document.querySelector('.overlay');
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
    overlay.classList.remove('overlay_show');
    popupCloseButton.removeEventListener('click', onButtonClick);
    overlay.removeEventListener('click', onOverlayClick);
    document.removeEventListener('keydown', onPopapEscPress);

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
    evt.preventDefault();
    closePopup();
  };

  /**
  * закрывает попап по esc
  * @param {Event} evt
  */
  var onPopapEscPress = function (evt) {
    if (isEscEvent(evt)) {
      closePopup();
    }
  };


  if (popupOpenButton) {
    popupOpenButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      if (popup) {
        popup.classList.add('modal_show');
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

        document.addEventListener('keydown', onPopapEscPress);
      }

      if (overlay) {
        overlay.classList.add('overlay_show');
        overlay.addEventListener('click', onOverlayClick);
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
  var navToggle = document.querySelector('.footer__nav .footer__toggle');

  var footerContact = document.querySelector('.footer__contacts');
  var contactToggle = document.querySelector('.footer__contacts .footer__toggle');

  /**
  * переключает класс
  * @param {HTMLElement} el
  * @param {string} class1
  * @param {string} class2
  */

  var toggle = function (el, class1, class2) {
    if (el.classList.contains(class1)) {
      el.classList.remove(class1);
      el.classList.add(class2);
    } else {
      el.classList.add(class1);
      el.classList.remove(class2);
    }
  };

  if (footerNav) {
    footerNav.classList.remove('footer__info_nojs');
    if (navToggle) {
      navToggle.addEventListener('click', function () {
        toggle(footerNav, 'footer__info_closed', 'footer__info_opened');
      });
    }
  }

  if (footerContact) {
    footerContact.classList.remove('footer__info_nojs');
    if (contactToggle) {
      contactToggle.addEventListener('click', function () {
        toggle(footerContact, 'footer__info_closed', 'footer__info_opened');
      });
    }
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
