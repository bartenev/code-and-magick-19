'use strict';

(function () {
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var numberOfSimilarWizards = 4;

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var similarListElement = document.querySelector('.setup-similar-list');

  var userDialog = document.querySelector('.setup');

  // var createWizard = function () {
  //   var indexOfName = window.util.getRandomNumber(WIZARD_NAMES.length);
  //   var indexOfLastName = window.util.getRandomNumber(WIZARD_LAST_NAMES.length);
  //   var indexOfCoatColor = window.util.getRandomNumber(window.constants.COAT_COLORS.length);
  //   var indexOfEyesColor = window.util.getRandomNumber(window.constants.EYES_COLORS.length);
  //
  //   var wizard = {
  //     name: WIZARD_NAMES[indexOfName] + ' ' + WIZARD_LAST_NAMES[indexOfLastName],
  //     coatColor: window.constants.COAT_COLORS[indexOfCoatColor],
  //     eyesColor: window.constants.EYES_COLORS[indexOfEyesColor]
  //   };
  //
  //   return wizard;
  // };

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var onSuccessLoad = function (wizards) {
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < numberOfSimilarWizards; j++) {
      fragment.appendChild(renderWizard(wizards[j]));
    }

    similarListElement.appendChild(fragment);
    userDialog.querySelector('.setup-similar').classList.remove('hidden');
  };

  var onErrorLoad = function (errorMessage) {
    window.backend.createErrorBlock(errorMessage);
  };

  window.backend.load(onSuccessLoad, onErrorLoad);
})();
