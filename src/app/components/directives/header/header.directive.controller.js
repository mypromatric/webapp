export class HeaderController {
  constructor($scope, AuthService) {
    'ngInject';
    this.scope = $scope;
    this.AuthService = AuthService;
  }

  logout() {
    this.AuthService.logout();
  }

}
