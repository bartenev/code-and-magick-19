'use strict';

var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var userDialog = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = userDialog.querySelector('.setup-close');
var userNameInput = userDialog.querySelector('.setup-user-name');

var setupWizard = document.querySelector('.setup-wizard');
var setupWizardCoat = setupWizard.querySelector('.wizard-coat');
var wizardCoatInput = document.querySelector('#coat-color');
var setupWizardEyes = setupWizard.querySelector('.wizard-eyes');
var wizardEyesInput = document.querySelector('#eyes-color');
var setupWizardFireball = document.querySelector('.setup-fireball-wrap');
var wizardFireballInput = document.querySelector('#fireball-color');

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var similarListElement = document.querySelector('.setup-similar-list');

// Открытие окна настроек персонажа
var onPopupEscPress = function (evt) {
  if (evt.key === ESC_KEY) {
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
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    closePopup();
  }
});

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

// Настройка своего персонажа

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
  wizardCoatInput.value = getNextElementOfArray(setupWizardCoat.style.fill, COAT_COLORS);
  setupWizardCoat.style.fill = wizardCoatInput.value;

});

setupWizardEyes.addEventListener('click', function () {
  wizardEyesInput.value = getNextElementOfArray(wizardEyesInput.value, EYES_COLORS);
  setupWizardEyes.style.fill = wizardEyesInput.value;
});

setupWizardFireball.addEventListener('click', function () {
  wizardFireballInput.value = getNextElementOfArray(wizardFireballInput.value, FIREBALL_COLORS);
  setupWizardFireball.style.backgroundColor = wizardFireballInput.value;
});

// Вывод похожих магов

var getRandomNumber = function (maxNum) {
  return Math.floor(Math.random() * maxNum);
};

var createWizard = function () {
  var indexOfName = getRandomNumber(WIZARD_NAMES.length);
  var indexOfLastName = getRandomNumber(WIZARD_LAST_NAMES.length);
  var indexOfCoatColor = getRandomNumber(COAT_COLORS.length);
  var indexOfEyesColor = getRandomNumber(EYES_COLORS.length);

  var wizard = {
    name: WIZARD_NAMES[indexOfName] + ' ' + WIZARD_LAST_NAMES[indexOfLastName],
    coatColor: COAT_COLORS[indexOfCoatColor],
    eyesColor: EYES_COLORS[indexOfEyesColor]
  };

  return wizard;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var wizards = [];
for (var i = 0; i < 4; i++) {
  wizards.push(createWizard());
}

var fragment = document.createDocumentFragment();
for (var j = 0; j < wizards.length; j++) {
  fragment.appendChild(renderWizard(wizards[j]));
}

similarListElement.appendChild(fragment);
userDialog.querySelector('.setup-similar').classList.remove('hidden');


