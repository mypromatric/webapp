export class AuthService {
  constructor($cookies, $state) {
    'ngInject';
    this.cookies = $cookies;
    this.state = $state;
    this.currentUser = {};
    this.setCurrentUser();
  }

  setCurrentUser() {
    if(this.isLoggedIn()) {
      this.currentUser = {
        id: this.cookies.get('doitsAssessment.me.id'),
        email: this.cookies.get('doitsAssessment.me.email'),
        name: this.cookies.get('doitsAssessment.me.name'),
        role: this.cookies.get('doitsAssessment.me.role'),
      };
    }
  }

  isLoggedIn() {
    if (this.cookies.get('doitsAssessment.token')) return true;
    else return false;
  }

  logout() {
    var cookies = this.cookies.getAll();
    angular.forEach(cookies, (v, k) => {
      this.cookies.remove(k);
    });
    this.currentUser = {};
    this.state.go('login');
    // $location.path('/login').replace();
  }
}
