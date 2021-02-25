import Route from '@ember/routing/route';
import fetch from 'fetch';

export default class ChapterIndexRoute extends Route {
  model() {
    return fetch('/h5p/content')
      .then((res) => res.json())
  }
}
