import alertify from 'alertify.js';

export class GuideLineController {
  constructor($scope, $interval) {
    'ngInject';
    this.scope = $scope;
    this.selectedLanguage = 'english';
    this.privacyPolicies = false;
    this.timeLeft = 30;
    this.activateQuizStartButton = false;
    var timerId = $interval(() => {
      if (this.timeLeft == 0) {
        this.activateQuizStartButton = true;
        $interval.cancel(timerId);
      } else {
        this.scope.takePic({
          type: 'trainSys'
        });
        this.timeLeft--;
      }
    }, 1000);

    this.scope.$on('$destroy', () => {
      $interval.cancel(timerId);
    });

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
