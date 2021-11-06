import { LitElement, html } from 'lit';

export class GdwcQuery extends LitElement {
  static get properties() {
    return {
      /**
       * A reference to the reactive controller instance provided by the parent client.
       */
      storeController: { type: Object },
      /**
       * Name of object to be retrieved.
       */
      objectName: { type: String },
      /**
       * A GraphQL query to be used when retrieving the object.
       */
      query: { type: String },
    };
  }

  connectedCallback() {
    super.connectedCallback();

    this.storeController.query({
      objectName: this.objectName,
      query: this.query,
    });
  }

  setStoreController(storeController) {
    this.storeController = storeController;
  }

  render() {
    return html` <p>${this.objectName}</p> `;
  }
}
