import Component from '@glimmer/component';
import {H5PEditorComponent} from '@lumieducation/h5p-webcomponents';
import fetch from 'fetch';


export default class H5pEditorComponent extends Component {


  constructor(owner, args) {
    super(owner, args);
    window.customElements.define('hp-editor', H5PEditorComponent);
  }


   initEditor(element) {
    element.loadContentCallback = async () => {
      return await fetch('/h5p-editor')
        .then((res) => res.json())
        .then((rs)=>rs.model);
    };
  }
}
