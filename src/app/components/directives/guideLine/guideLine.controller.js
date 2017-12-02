import alertify from 'alertify.js';

export class GuideLineController {
  constructor($scope) {
    'ngInject';
    this.scope = $scope;
    this.selectedLanguage = 'english';
    this.privacyPolicies = false;
    this.timeLeft = 35;
    this.activateQuizStartButton = false;
    var timerId = setInterval(() => {
      if (this.timeLeft == 0) {
        this.activateQuizStartButton = true;
        clearTimeout(timerId);
      } else {
        this.scope.takePic();
        this.timeLeft--;
      }
    }, 1000);

  }

  callBack() {
    if (this.activateQuizStartButton) {
      this.guideLines.language = this.selectedLanguage;
      this.scope.callBack({
        guideLines: this.guideLines
      });
    } else {
      alertify.alert(`Please Read Guidelines Carefully, Minimum time Left to ${this.timeLeft}`);
    }
  }
}
