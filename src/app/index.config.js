import alertify from 'alertify.js';
export function config($logProvider, $locationProvider, $httpProvider) {
  'ngInject';
  // Enable log
  $logProvider.debugEnabled(true);
  $locationProvider.html5Mode(true);

  alertify.delay(2000);
  alertify.theme('bootstrap');
  alertify.maxLogItems(1);
  alertify.logPosition('bottom left');
  alertify.closeLogOnClick(true);
  alertify.okBtn("OK");

  $httpProvider.interceptors.push('AuthInterceptor');
}
