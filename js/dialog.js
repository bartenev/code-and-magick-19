'use strict';

(function () {
  var userDialog = document.querySelector('.setup');
  var userNameInput = userDialog.querySelector('.setup-user-name');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = userDialog.querySelector('.setup-close');
  var setupForm = userDialog.querySelector('.setup-wizard-form');
  var setupSubmit = document.querySelector('.setup-submit');

  var onPopupEscPress = function (evt) {
    if (window.util.isEsc(evt)) {
      if (evt.target === userNameInput) {
        userNameInput.blur();
      } else {
        closePopup();
      }
    }
  };

  var openPopup = function () {
    userDialog.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    userDialog.classList.add('hidden');
    userDialog.style.top = 80 + 'px';
    userDialog.style.left = 50 + '%';
    document.removeEventListener('keydown', onPopupEscPress);
  };

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });

  var onSuccessSave = function () {
    userDialog.classList.add('hidden');
    setupSubmit.textContent = 'Сохранить';
    setupSubmit.disabled = false;
  };

  var onErrorSave = function (errorMessage) {
    window.backend.createErrorBlock(errorMessage);
    setupSubmit.textContent = 'Сохранить';
    setupSubmit.disabled = false;
  };

  setupForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    setupSubmit.textContent = 'Отправка';
    setupSubmit.disabled = true;
    window.backend.save(new FormData(setupForm), onSuccessSave, onErrorSave);
  });

})();
