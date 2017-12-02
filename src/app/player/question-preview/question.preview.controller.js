import alertify from 'alertify.js';

export class QuestionPreviewController {
  constructor($scope, QuestionService, $uibModal, $interval, $window, $rootScope) {
    'ngInject';
    this.rootScope = $rootScope;
    this.uibModal = $uibModal;
    this.interval = $interval;
    this.scope = $scope;
    this.QuestionService = QuestionService;
    this.window = $window;
    this.isApiCall = true;
    this.enableTest = false;
    this.isConfirmModalOpen = false;
    this.isFiveMinutesRemaining = false;
    this.isFastPreviousNext = false;

    var timerId = this.interval(() => {
      this.scope.takePic({});
    }, 5000);

    $scope.$on('$destroy', () => {
      this.interval.cancel(this.timerId);
    });

    this.QuestionService.fetchQuestions({
      language: this.scope.userDetails.language,
      examType: this.scope.userDetails.examType
    }).then((respData) => {
      this.isApiCall = false;
      this.responseObject = respData;
      this.responseObject.isCameraActivated = this.rootScope.isCameraActivated;
      if (!this.responseObject.isTestComplete) {
        this.enableTest = true;
        this.startTimer();
        if (this.rootScope.isCameraActivated) {
          // this.scope.takePic().then((resp) => {
          //   // this.responseObject.userImages.push(resp.data);
          // }, () => {});
        }
      } else {
        this.showFinalCount(this.responseObject.isPass, this.responseObject.score);
      }
    }, (err) => {
      this.isApiCall = false;
      alertify.error('Error Occurred! Plz try again');
    });
    this.currentQuestionIndex = 0;
  }

  startTimer() {
    this.timerControl = this.interval(() => {
      this.responseObject.timeRemaining -= 1;
      if (this.responseObject.timeRemaining === 300) {
        this.isFiveMinutesRemaining = true;
      }
      if (this.responseObject.timeRemaining === 240) {
        this.isFiveMinutesRemaining = false;
      }
      if (this.responseObject.timeRemaining === 0) {
        this.autoSave();
      }
    }, 1000);
  }

  autoSave() {
    this.isApiCall = true;
    this.interval.cancel(this.timerControl);
    if (this.rootScope.isCameraActivated) {
      this.scope.takePic({}).then((resp) => {
        // this.responseObject.userImages.push(resp.data);
      }, () => {});
    }
    this.QuestionService.responseUpdate(this.responseObject).then((respData) => {
      this.responseObject.isTestComplete = true;
      this.isApiCall = false;
      this.showFinalCount(respData.isPass, respData.score, respData.returnUrl);
    }, (err) => {
      this.isApiCall = false;
      // console.log('error on final auto save');
    });
  }

  showFinalCount(isPass, score, url) {
    this.passStatus = isPass;
    this.score = score;
    this.returnUrl = url;
    if (this.isConfirmModalOpen) this.confirmModalInstance.dismiss();
    this.remainingQuestionCount = 0;
    for (const question of this.responseObject.response) {
      !question.userResponse && (this.remainingQuestionCount += 1);
    }
    this.answeredQuestionCount = this.responseObject.response.length - this.remainingQuestionCount;
  }

  previous() {
    // this.sendPartialResponse();
    this.isFastPreviousNext && this.sendToFastPrevious();
    !this.isFastPreviousNext && (this.currentQuestionIndex -= 1);
  }

  next() {
    // this.sendPartialResponse();
    this.isFastPreviousNext && this.sendToFastNext();
    !this.isFastPreviousNext && (this.currentQuestionIndex += 1);
  }

  sendToFastPrevious() {
    for (let i = this.responseObject.response.length - 1; i >= 0; i--) {
      if (i < this.currentQuestionIndex && !this.responseObject.response[i].userResponse) {
        this.currentQuestionIndex = i;
        break;
      }
    }
  }

  sendToFastNext() {
    for (let i = 0; i < this.responseObject.response.length; i++) {
      if (i > this.currentQuestionIndex && !this.responseObject.response[i].userResponse) {
        this.currentQuestionIndex = i;
        break;
      }
    }
  }

  sendPartialResponse(question) {
    // const currentQuestion = this.responseObject.response[this.currentQuestionIndex];
    // currentQuestion.userResponse &&
    this.silentResponseUpdate({
      id: question._id,
      userResponse: question.userResponse,
      timeRemaining: this.responseObject.timeRemaining
    });
  }

  moveToQuestion(index) {
    this.currentQuestionIndex = index;
  }

  confirmSubmission() {
    this.isConfirmModalOpen = true;
    this.confirmModalInstance = this.uibModal.open({
      animation: true,
      keyboard: true,
      backdrop: true,
      templateUrl: 'app/components/modals/confirm-test-submission/confirm-test-submission.html',
      controller: 'confirmTestSubmission',
      controllerAs: 'CTSCtrl',
      size: 'md',
      resolve: {
        items: () => {
          return {
            responseObject: this.responseObject
          };
        }
      }
    });
    this.confirmModalInstance.result.then((result) => {
      this.isConfirmModalOpen = false;
      this.autoSave();
    }, (err) => {
      this.isConfirmModalOpen = false;
    });
  }

  silentResponseUpdate(partialQuestionResponse) {
    this.QuestionService.partialResponseUpdate(partialQuestionResponse).then((respData) => {
      // console.log('updated');
    }, (err) => {
      // console.log('error on update');
    });
  }

  back() {
    this.window.location.href = this.returnUrl;
  }
}
