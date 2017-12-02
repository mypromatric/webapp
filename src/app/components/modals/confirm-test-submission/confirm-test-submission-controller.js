import alertify from 'alertify.js';
export class ConfirmTestSubmission {
  constructor($uibModalInstance, items, $scope, QuestionService) {
    'ngInject';
    this.scope = $scope;
    this.QuestionService = QuestionService;
    this.uibModalInstance = $uibModalInstance;
    this.items = items;
    this.isAPICall = false;
    this.remainingQuestions = 0;
    for (const question of this.items.responseObject.response) {
      !question.userResponse && (this.remainingQuestions += 1);
    }
  }

  save() {
    this.uibModalInstance.close(true);
  }

  close() {
    this.uibModalInstance.dismiss();
  }

}
