import { LitElement, html } from 'lit';

import { StoreController } from './store-controller.js';

export class GdwcStore extends LitElement {
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
       * Default locale for store
       */
      defaultLocale: { type: String },
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
        this.defaultLocale,
        this.debug
      );
    }

    this.findGdwcChildren();
  }

  async findGdwcChildren() {
    // First ensure children have rendered.
    const { children } = this;
    await Promise.all(Array.from(children).map(c => c.updateComplete));
    for (const child of children) {
      this.addGdwcChild(child);
    }
  }

  addGdwcChild(child) {
    const tagName = child.tagName.toLowerCase();
    if (tagName.startsWith('gdwc-provider')) {
      child.setStoreController(this.storeController);
    }
  }

  render() {
    return html`<slot></slot>`;
  }
}
