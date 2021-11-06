import { LitElement, html } from 'lit';

import { StoreController } from './store-controller.js';

export class GdwcClient extends LitElement {
  static get properties() {
    return {
      /**
       * Image source
       */
      apiRoot: { type: String },
      /**
       * Debug mode flag
       */
      debug: { type: Boolean },
    };
  }

  constructor() {
    super();

    this.debug = false;
  }

  connectedCallback() {
    super.connectedCallback();

    if (this.apiRoot) {
      this.storeController = new StoreController(
        this,
        this.apiRoot,
        this.debug
      );
    }
    this.findGdwcChildren();
  }

  findGdwcChildren() {
    for (const child of this.children) {
      this.addGdwcChild(child);
    }
  }

  addGdwcChild(child) {
    const tagName = child.tagName.toLowerCase();
    if (tagName.match('gdwc-query')) {
      child.setStoreController(this.storeController);
    }
  }

  render() {
    return html`<slot></slot>`;
  }
}
