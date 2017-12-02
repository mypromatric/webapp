export class QuestionService {
  constructor($http, $q, LilConstants) {
    'ngInject';
    this.http = $http;
    this.q = $q;
    this.LilConstants = LilConstants;
  }

  bulkUploadQuestions(list) {
    var defer = this.q.defer();
    const data = { list: list };
    this.http.post(`${this.LilConstants.API_URL}question/bulkUpload`, data).then((resp) => {
      defer.resolve(resp.data);
    }, (eResp) => {
      defer.reject(eResp.data);
    });
    return defer.promise;
  }

  fetchQuestions(examDetails) {
    var defer = this.q.defer();
    this.http.post(`${this.LilConstants.PLAYER_API_URL}question/fetch`, { examDetails: examDetails }).then((resp) => {
      // convert response object to array for UI
      resp.data.response = Object.values(resp.data.response);
      defer.resolve(resp.data);
    }, (eResp) => {
      defer.reject(eResp.data);
    });
    return defer.promise;
  }

  responseUpdate(response) {
    var defer = this.q.defer();
    this.http.post(`${this.LilConstants.PLAYER_API_URL}question-response/fetchExamResult`, { userResponse: response }).then((resp) => {
      defer.resolve(resp.data);
    }, (eResp) => {
      defer.reject(eResp.data);
    });
    return defer.promise;
  }

  partialResponseUpdate(partialResponse) {
    return this.http.post(`${this.LilConstants.PLAYER_API_URL}question-response/partialResponseUpdate`, { partialResponse: partialResponse });
  }
}
