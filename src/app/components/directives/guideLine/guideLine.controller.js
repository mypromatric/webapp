import alertify from 'alertify.js';

export class GuideLineController {
  constructor($scope, $interval, LilConstants, $http, $q) {
    'ngInject';
    this.scope = $scope;
    this.q = $q;
    this.selectedLanguage = 'english';
    this.privacyPolicies = false;
    this.timeLeft = 30;
    this.http = $http;
    this.LilConstants = LilConstants;
    this.activateQuizStartButton = false;
    var timerId = $interval(() => {
      if (this.timeLeft === 0) {
        this.isApiCall = true;
        this.activateQuizStartButton = true;
        $interval.cancel(timerId);
        setTimeout(() => {
          $http.get(`${LilConstants.PLAYER_API_URL}api/p1`, {
            params: {
              userName: $scope.ssoid
            }
          });

          this.checkStatusTraining($scope.ssoid).then(() => {
            this.isApiCall = false;
          });
        }, 1000);

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

  checkStatusTraining(ssoid) {
    var defer = this.q.defer();
    setTimeout(() => {
      this.http.get(`${this.LilConstants.PLAYER_API_URL}api/checkStatus`, {
        params: {
          userName: ssoid
        }
      }).then((resp) => {
        if (resp.data.status === 0) {
          defer.resolve(this.checkStatusTraining(ssoid));
        } else {
          defer.resolve(resp.data);
        }
      }, (err) => {
        defer.reject(err);
      });
    }, 5000);
    return defer.promise;
  }
}
