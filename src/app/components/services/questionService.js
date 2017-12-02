import QData from './questionJson';
export class QuestionService {
  constructor($http, $q, LilConstants) {
    'ngInject';
    this.http = $http;
    this.q = $q;
    this.LilConstants = LilConstants;
  }

  fetchQuestions(examDetails) {
    var defer = this.q.defer();
    QData.response = Object.values(QData.response);
    defer.resolve(QData);
    return defer.promise;
  }

  responseUpdate(response) {
    var defer = this.q.defer();
    defer.resolve({isPass: response.isPass, score: response.score});
    return defer.promise;
  }

  partialResponseUpdate(partialResponse) {
    var defer = this.q.defer();
    defer.resolve(partialResponse);
    return defer.promise;
  }
}
