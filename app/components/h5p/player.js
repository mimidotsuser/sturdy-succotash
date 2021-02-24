import Component from '@glimmer/component';
import {tracked} from "@glimmer/tracking";
import {action} from "@ember/object";
import fetch from "fetch";
import {H5PPlayerComponent} from "@lumieducation/h5p-webcomponents";

export default class H5pPlayerComponent extends Component {

  @tracked
  contentId = this.args.contentId;

  @tracked
  player


  constructor(owner, args) {
    super(owner, args);
    if (!window.customElements.get('hp-player')) {
      window.customElements.define('hp-player', H5PPlayerComponent);
    }
  }


  @action
  initPlayer(elem) {

    elem.loadContentCallback = async (contentId) => {
      return await fetch(`/h5p-player/${contentId}`)
        .then((res) => res.json())
        .then((rs) => {
          this.player = elem; //best place since we are not sure the content was rendered
          return rs.model;
        });
    }
  }

  get playerLoaded() {
    return this.player !== undefined;
  }

}
