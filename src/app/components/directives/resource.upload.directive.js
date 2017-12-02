export class ResourceUpload {
  constructor() {
    'ngInject';
    this.restrict = 'A';
    this.scope = {
      uploadFile: '&'
    };
  }
  link(scope, element, attrs) {
    element.bind('change', function() {
      let files = element[0].files;
      scope.uploadFile({
        files: files
      });
      element.val(null);
    });
  }
}
