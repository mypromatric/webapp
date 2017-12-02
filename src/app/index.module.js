/* global  */
import 'angular';
import 'angular-animate';
import 'angular-cookies';
import 'angular-touch';
import 'angular-sanitize';
import 'angular-messages';
import 'angular-aria';
import 'angular-ui-router';
import 'angular-ui-bootstrap';
import '../../node_modules/webcam/dist/webcam.min.js';

import {
  Constants
} from './index.constants';

import {
  config
} from './index.config';

import {
  routerConfig
} from './index.route';

import {
  runBlock
} from './index.run';

import {
  AuthInterceptor
} from './components/services/auth.interceptor';

import {
  AuthService
} from './components/services/auth.service';

import {
  LoginController
} from './login/login.controller';

import {
  HeaderController
} from './components/directives/header/header.directive.controller';

import {
  ResourceUpload
} from './components/directives/resource.upload.directive';

import {
  QuestionBulkUploadController
} from './components/modals/question-bulk-upload/question-bulk-upload-controller';

import {
  PlayerController
} from './player/player.controller';

import {
  GuideLineController
} from './components/directives/guideLine/guideLine.controller';

import {
  GuideLineDirective
} from './components/directives/guideLine/guideLine.directive';

import {
  SpinnerDirective
} from './components/directives/spinner.directive';

import {
  QuestionPreviewController
} from './player/question-preview/question.preview.controller';

import {
  QuestionPreviewDirective
} from './player/question-preview/question.preview.directive';

import {
  HeaderDirective
} from './components/directives/header/header.directive';

import {
  ConfirmTestSubmission
} from './components/modals/confirm-test-submission/confirm-test-submission-controller.js';

import {
  QuestionService
} from './components/services/questionService';

import {
  toTime
} from './components/filters/seconds.to.time.filter';

angular.module('DOITCAssessment', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ui.router', 'ui.bootstrap', 'webcam'])
  .constant('LilConstants', Constants)
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .service('AuthService', AuthService)
  .service('AuthInterceptor', AuthInterceptor)
  .controller('LoginController', LoginController)
  .controller('headerController', HeaderController)
  .directive('resourceUpload', () => new ResourceUpload())
  .directive('spinnerDirective', () => new SpinnerDirective())
  .controller('QuestionBulkUploadController', QuestionBulkUploadController)
  .controller('PlayerController', PlayerController)
  .controller('guideLineController', GuideLineController)
  .directive('guideLineDirective', () => new GuideLineDirective())
  .controller('questionPreviewController', QuestionPreviewController)
  .directive('questionPreviewDirective', () => new QuestionPreviewDirective())
  .directive('headerDirective', () => new HeaderDirective())
  .controller('confirmTestSubmission', ConfirmTestSubmission)
  .service('QuestionService', QuestionService)
  .filter('toTime', toTime);
