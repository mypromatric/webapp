export class GuideLineDirective {
  constructor() {
    'ngInject';
    this.templateUrl = 'app/components/directives/guideLine/guideLine.html';
    this.controller = 'guideLineController';
    this.controllerAs = 'GLCtrl';
    // this.transclude = true;
    this.scope = {
      callBack: '&',
      userDetails: '=',
      guideLines: '=',
      takePic: '&',
      ssoid: '='
    };
  }
  link(scope, elem, attr, ctrl) {
    ctrl.guideLines = scope.guideLines;
  }
}
