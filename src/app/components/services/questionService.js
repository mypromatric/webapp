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
    // initBatch.then()
    defer.resolve(QData);
    return defer.promise;
  }

  responseUpdate(response, ssoid) {
    var defer = this.q.defer();
    this.initBatch(ssoid).then((data) => {
      defer.resolve({
        isPass: response.isPass,
        score: response.score,
        initBatchResp: data,
        avgRatio: data.avg
      });
    });
    return defer.promise;
  }

  partialResponseUpdate(partialResponse) {
    var defer = this.q.defer();
    defer.resolve(partialResponse);
    return defer.promise;
  }

  initBatch(ssoid) {
    var defer = this.q.defer();
    setTimeout(() => {
      this.http.get(`${this.LilConstants.PLAYER_API_URL}api/initbatch`, {
        params: {
          userName: ssoid
        }
      }).then((resp) => {
        if (resp.data.status === 0) {
          defer.resolve(this.initBatch(ssoid));
        } else {
          defer.resolve(resp.data);
        }
      }, (err) => {
        console.log(err);
        defer.reject(err);
      });
    }, 5000);
    return defer.promise;
  }
}
