export class QuestionPreviewDirective {
  constructor() {
    'ngInject';
    this.templateUrl = 'app/player/question-preview/question.preview.html';
    this.controller = 'questionPreviewController';
    this.controllerAs = 'QPCtrl';
    this.transclude = true;
    this.scope = {
      userDetails: '=',
      takePic: '&',
      ssoid: '='
    };
  }
}
