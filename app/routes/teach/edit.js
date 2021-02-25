import Route from '@ember/routing/route';

export default class TeachEditRoute extends Route {
  model(params) {
    return fetch(`/h5p/content/${params.chapter_id}`)
      .then((res) => res.json())
  }
}
