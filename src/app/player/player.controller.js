import configuration from './configuration.js';
import alertify from 'alertify.js';
export class PlayerController {
  constructor($state, $stateParams, LilConstants, $http, $cookies, $rootScope) {
    'ngInject';
    this.rootScope = $rootScope;
    this.stateParams = $stateParams;
    this.LilConstants = LilConstants;
    this.http = $http;
    this.cookies = $cookies;
    this.ssoid = this.stateParams.ssoid;
    this.guideLines = configuration;
    this.isDataFetched = false;
    this.isShowGuide = true;
    this.userDetails = {};
    // for Camera Pic

    this._video = null;
    this.videoChannel = {
      videoHeight: 500,
      videoWidth: 500,
      video: null
    };
  }

  // clearCookies() {
  //   const cookies = this.cookies.getAll();
  //   angular.forEach(cookies, (v, k) => {
  //     this.cookies.remove(k);
  //   });
  //   this.currentUser = {};
  // }

  // setCookies(data) {
  //   this.cookies.put('doitsAssessment.token', data.token);
  //   this.cookies.put('doitsAssessment.me.role', data.role);
  // }

  startTest(guideLines) {
    if (this.rootScope.isCameraActivated) {
      Object.assign(this.userDetails, guideLines);
      this.isTestStart = true;
      this.isShowGuide = true;
    } else {
      alertify.log('failed to start, camera not on');
    }
  }

  // for camera Pic

  onStream(stream) {}

  onError(err) {
    this.rootScope.isCameraActivated = false;
    alertify.error('Please, activate web camera');
  }

  onSuccess() {
    this._video = this.videoChannel.video;
    this.rootScope.isCameraActivated = true;
  }

  takePic(type) {
    if (this._video) {
      var patCanvas = document.querySelector('#captured-pic');
      if (!patCanvas) return;
      patCanvas.width = this._video.width;
      patCanvas.height = this._video.height;
      var ctxPat = patCanvas.getContext('2d');
      var hiddenCanvas = document.createElement('canvas');
      hiddenCanvas.width = this._video.width;
      hiddenCanvas.height = this._video.height;
      var ctx = hiddenCanvas.getContext('2d');
      ctx.drawImage(this._video, 0, 0, this._video.width, this._video.height);
      var idata = ctx.getImageData(0, 0, this._video.width, this._video.height);
      ctxPat.putImageData(idata, 0, 0);
      if (type && type === 'trainSys') {
        return this.http.post(`${this.LilConstants.PLAYER_API_URL}api/photo`, {
          data: patCanvas.toDataURL(),
          userName: this.ssoid
        });
      } else {
        return this.http.post(`${this.LilConstants.PLAYER_API_URL}api/evailPic`, {
          data: patCanvas.toDataURL(),
          userName: this.ssoid
        });
      }
    }
  }
}
