import EmberRouter from '@ember/routing/router';
import config from 'editor-client/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('chapter', function () {
    this.route('show');
  });

  this.route('teach', function () {
    this.route('create');
    this.route('edit');
  });

});
