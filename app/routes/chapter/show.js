import Route from '@ember/routing/route';
import fetch from 'fetch';

export default class ChapterShowRoute extends Route {

  model(params) {
    return fetch(`/h5p/content/${params.chapter_id}`)
      .then((res) => res.json())
  }
}
