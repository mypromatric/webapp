export class ReportService {
  constructor($http, $q, LilConstants) {
    'ngInject';
    this.http = $http;
    this.q = $q;
    this.LilConstants = LilConstants;
  }

fetchReport(reportInput){
    var defer = this.q.defer();
    this.http.post(`${this.LilConstants.API_URL}report/fetchReport`, reportInput).then((resp) => {
      defer.resolve(resp.data);
    }, (eResp) => {
      defer.reject(eResp.data);
    });
    return defer.promise;
  }
}
