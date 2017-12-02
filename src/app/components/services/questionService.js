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
    defer.resolve(QData);
    return defer.promise;
  }

  responseUpdate(response) {
    var defer = this.q.defer();
    this.http.post(`${this.LilConstants.PLAYER_API_URL}question-response/fetchExamResult`, {
      userResponse: response
    }).then((resp) => {
      defer.resolve(resp.data);
    }, (eResp) => {
      defer.reject(eResp.data);
    });
    return defer.promise;
  }

  partialResponseUpdate(partialResponse) {
    return this.http.post(`${this.LilConstants.PLAYER_API_URL}question-response/partialResponseUpdate`, {
      partialResponse: partialResponse
    });
  }
}
