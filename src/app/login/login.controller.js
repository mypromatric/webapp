import alertify from 'alertify.js';

export class LoginController {
  constructor($log, $http, LilConstants, $cookies, $state, AuthService, $uibModal) {
    'ngInject';
    this.log = $log;
    this.http = $http;
    this.LilConstants = LilConstants;
    this.cookies = $cookies;
    this.state = $state;
    this.AuthService = AuthService;
    this.uibModal = $uibModal;
    this.isApiCall = false;
    this.user = {};
    this.reportInput = {};
    if (this.AuthService.isLoggedIn()) {
      this.state.go('player');
    }
  }

  login(ssoid) {
    this.state.go('player', {ssoid: ssoid})
    // this.isApiCall = true;
    // // this.state.go('home');
    // this.http.post(`${this.LilConstants.API_URL}user/login`, this.user).then(({
    //   data
    // }) => {
    //   this.isApiCall = false;
    //   // const token = resp.data.token;
    //   this.cookies.put('doitsAssessment.token', data.token);
    //   this.cookies.put('doitsAssessment.me.email', data.email);
    //   this.cookies.put('doitsAssessment.me.id', data.id);
    //   this.cookies.put('doitsAssessment.me.name', data.name);
    //   this.cookies.put('doitsAssessment.me.role', data.role);
    //   this.AuthService.setCurrentUser();
    //   this.state.go('home');
    // }, (err) => {
    //   this.isApiCall = false;
    //   if (err.status && err.status === 401) {
    //     alertify.error('Invalid Email/Password');
    //   } else {
    //     alertify.error('Error Occurred!!, Plz try again');
    //   }
    //   // this.mdToast.showSimple(err.data.message);
    // });
  }

  viewReport() {
    this.reportInput.period.start = new Date(this.reportInput.period.start);
    this.reportInput.period.end = new Date(this.reportInput.period.end);
    this.uibModal.open({
      animation: true,
      keyboard: true,
      backdrop: false,
      templateUrl: 'app/login/reports/reports.html',
      controller: 'ReportModalController',
      controllerAs: 'RMCtrl',
      size: 'lg result-modal',
      resolve: {
        items: () => {
          return this.reportInput;
        }
      }
    });
  }
}
