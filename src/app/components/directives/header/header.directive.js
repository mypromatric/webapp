export class HeaderDirective {
  constructor() {
    'ngInject';
    this.templateUrl = 'app/components/directives/header/header.directive.html';
    this.controller = 'headerController';
    this.controllerAs = 'headerCtrl';
    this.replace = true;
    // this.transclude = true;
    this.scope = {
      userType: '@'
    };
  }

  // link(scope, element, attr, ctrl) {}
}
