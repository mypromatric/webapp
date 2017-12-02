export class SpinnerDirective {
  constructor() {
    'ngInject';
    this.scope = {};
    this.replace = true;
    this.template = `<div class="spinner">
      <div>
        <img src="../assets/images/spinner.gif" class="spinner-img" />
      </div>
    </div>`;
  }
}
