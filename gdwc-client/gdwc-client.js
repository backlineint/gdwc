import { LitElement, html } from 'lit';

import { StoreController } from './store-controller.js';

export class GdwcClient extends LitElement {
  static get properties() {
    return {
      /**
       * Base URL of Drupal Site
       */
      apiBase: { type: String },
      /**
       * Prefix for JSON:API endpoints
       */
      apiPrefix: { type: String },
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

    if (this.apiBase) {
      this.storeController = new StoreController(
        this,
        this.apiBase,
        this.apiPrefix,
        this.debug
      );
    }

    this.addEventListener(
      'storeupdate',
      () => {
        for (const child of this.children) {
          const tagName = child.tagName.toLowerCase();
          if (tagName.startsWith('gdwc-')) {
            child.dispatchUpdate();
          }
        }
      },
      true
    );
    this.findGdwcChildren();
  }

  findGdwcChildren() {
    for (const child of this.children) {
      this.addGdwcChild(child);
    }
  }

  addGdwcChild(child) {
    const tagName = child.tagName.toLowerCase();
    if (tagName.startsWith('gdwc-')) {
      child.setStoreController(this.storeController);
    }
  }

  render() {
    return html`<slot></slot>`;
  }
}
