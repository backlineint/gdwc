import { LitElement } from 'lit';
import { DrupalState } from '@gdwc/drupal-state';

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
      this.store = new DrupalState({
        apiRoot: this.apiRoot,
        debug: this.debug,
      });
    }
  }
}
