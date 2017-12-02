export function routerConfig($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'app/login/login.html',
    controller: 'LoginController',
    controllerAs: 'loginCtrl'
  }).state('player', {
    url: '/exam/:ssoid',
    templateUrl: 'app/player/player.html',
    controller: 'PlayerController',
    controllerAs: 'playerCtrl'
  });

  $urlRouterProvider.otherwise('/login');
}
