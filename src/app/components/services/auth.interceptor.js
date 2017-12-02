export function AuthInterceptor($cookies, $q, LilConstants, $location) {
  'ngInject';
  return {
    request: function (config) {
      config.headers = config.headers || {};
      config.timeout = 300000;
      // For admin mode APIS
      // if (config.url.indexOf(LilConstants.API_URL) > -1) {
      //   if (angular.isUndefined(config.headers.Authorization)) {
      //     if (config.url.indexOf('/user/login') < 0) {
      //       const token = $cookies.get('doitsAssessment.token');
      //       token && (config.headers.Authorization = token);
      //     }
      //   }
      // }
      
      // For player mode APIS
      // if (config.url.indexOf(LilConstants.PLAYER_API_URL) > -1) {
      //   if (angular.isUndefined(config.headers.Authorization)) {
      //     if (config.url.indexOf('/configuration/fetch') < 0) {
      //       const token = $cookies.get('doitsAssessment.token');
      //       token && (config.headers.Authorization = token);
      //     }
      //   }
      // }
      return config;
    },
    requestError: function (config) {
      return $q.reject(config);
    },
    response: function (res) {
      return res;
    },
    responseError: function (res) {
      if (res.status === 401) {
        var cookies = $cookies.getAll();
        angular.forEach(cookies, (v, k) => {
          $cookies.remove(k);
        });
        $location.path('/login').replace();
      }
      return $q.reject(res);
    }
  };
}
