import Route from '@ember/routing/route';

export default class TeachIndexRoute extends Route {

  model() {
    return fetch('/h5p/content')
      .then((res) => res.json())
  }
}
