import Component from '@glimmer/component';
import {H5PEditorComponent} from '@lumieducation/h5p-webcomponents';
import fetch from 'fetch';
import {action} from "@ember/object";
import {tracked} from "@glimmer/tracking";


export default class H5pEditorComponent extends Component {

  @tracked
  editor;

  @tracked
  contentId = this.args.contentId || 'new';

  @tracked
  loading = false;

  constructor(owner, args) {
    super(owner, args);
    if (!window.customElements.get('hp-editor')) {
      window.customElements.define('hp-editor', H5PEditorComponent);
    }
  }


  @action
  initEditor(element) {
    element.addEventListener('editorloaded', () => {
      this.loading = true;
    })

    element.loadContentCallback = async (contentId) => {
      return await fetch(contentId ? `/h5p-editor/${contentId}` : '/h5p-editor')
        .then((res) => res.json())
        .then((rs) => {
          this.editor = element; //initialize the editor now
          return rs.model
        });
    };

    element.saveContentCallback = async (contentId, requestBody) => {
      console.log(contentId, requestBody)
      return await fetch('/h5p/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })
        .then((res) => res.json())
    }

  }

  @action
  saveContent() {

    if (!this.editor) {
      console.log('editor not initialized')
      return;
    }
    console.log(this.editor);
    this.editor.save()
      .then((res) => {
        this.contentId = res.id;
        console.log(res)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  @action
  async deleteContent() {
    if (!this.editor) {
      return;
    }

    await fetch(`/h5p/content/${this.editor.contentId}`, {method: 'DELETE'})
  }
}
