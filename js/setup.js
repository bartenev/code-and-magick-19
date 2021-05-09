'use strict';

(function () {
  var userDialog = document.querySelector('.setup');
  var userNameInput = userDialog.querySelector('.setup-user-name');

  var setupWizard = document.querySelector('.setup-wizard');
  var setupWizardCoat = setupWizard.querySelector('.wizard-coat');
  var wizardCoatInput = document.querySelector('#coat-color');
  var setupWizardEyes = setupWizard.querySelector('.wizard-eyes');
  var wizardEyesInput = document.querySelector('#eyes-color');
  var setupWizardFireball = document.querySelector('.setup-fireball-wrap');
  var wizardFireballInput = document.querySelector('#fireball-color');

  userNameInput.addEventListener('invalid', function () {
    if (userNameInput.validity.tooShort) {
      userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else if (userNameInput.validity.tooLong) {
      userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
    } else if (userNameInput.validity.valueMissing) {
      userNameInput.setCustomValidity('Обязательное поле');
    } else {
      userNameInput.setCustomValidity('');
    }
  });

  var getIndexOfArrayElement = function (value, array) {
    var index = 0;
    var isFind = false;
    while (!isFind && index < array.length) {
      if (value === array[index]) {
        isFind = true;
      } else {
        index++;
      }
    }

    if (!isFind) {
      index = 0;
    }

    return index;
  };

  var getNextIndexOfArray = function (index, array) {
    var nextIndex = 0;
    if (index + 1 < array.length) {
      nextIndex = index + 1;
    }

    return nextIndex;
  };

  var getNextElementOfArray = function (currentElement, array) {
    var currentIndex = getIndexOfArrayElement(currentElement, array);
    var nextIndex = getNextIndexOfArray(currentIndex, array);
    return array[nextIndex];
  };

  setupWizardCoat.addEventListener('click', function () {
    wizardCoatInput.value = getNextElementOfArray(setupWizardCoat.style.fill, window.constants.COAT_COLORS);
    setupWizardCoat.style.fill = wizardCoatInput.value;
    window.similarWizards.onCoatChange(wizardCoatInput.value);
  });

  setupWizardEyes.addEventListener('click', function () {
    wizardEyesInput.value = getNextElementOfArray(wizardEyesInput.value, window.constants.EYES_COLORS);
    setupWizardEyes.style.fill = wizardEyesInput.value;
    window.similarWizards.onEyesChange(wizardEyesInput.value);
  });

  setupWizardFireball.addEventListener('click', function () {
    wizardFireballInput.value = getNextElementOfArray(wizardFireballInput.value, window.constants.FIREBALL_COLORS);
    setupWizardFireball.style.backgroundColor = wizardFireballInput.value;
  });
})();
