'use strict';

(function () {
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var similarListElement = document.querySelector('.setup-similar-list');

  var userDialog = document.querySelector('.setup');

  var createWizard = function () {
    var indexOfName = window.util.getRandomNumber(WIZARD_NAMES.length);
    var indexOfLastName = window.util.getRandomNumber(WIZARD_LAST_NAMES.length);
    var indexOfCoatColor = window.util.getRandomNumber(window.constants.COAT_COLORS.length);
    var indexOfEyesColor = window.util.getRandomNumber(window.constants.EYES_COLORS.length);

    var wizard = {
      name: WIZARD_NAMES[indexOfName] + ' ' + WIZARD_LAST_NAMES[indexOfLastName],
      coatColor: window.constants.COAT_COLORS[indexOfCoatColor],
      eyesColor: window.constants.EYES_COLORS[indexOfEyesColor]
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
})();
