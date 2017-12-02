export function runBlock ($log, $rootScope, $window) {
  'ngInject';
  $log.debug('runBlock end');
  $rootScope.isChrome = !!$window.chrome && !!$window.chrome.webstore;
  $rootScope.isFirefox = typeof InstallTrigger !== 'undefined';
}
