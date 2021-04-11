'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101,137,164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var similarListElement = document.querySelector('.setup-similar-list');

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
