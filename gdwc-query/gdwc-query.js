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
       * UUID of an individual object to be retrieved.
       */
      id: { type: String },
      /**
       * Relationships to be included.
       */
      include: { type: String },
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
      id: this.id,
      query: this.query,
      include: this.include,
    });

    // TODO - Could this instead be done recursively in the client?
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
      child.setStoreController(
        this.storeController,
        this.objectName,
        this.query
      );
    }
  }

  setStoreController(storeController) {
    this.storeController = storeController;
  }

  // TODO - encapsulate this and other methods in a controller so it can be reused
  dispatchUpdate() {
    for (const child of this.children) {
      const tagName = child.tagName.toLowerCase();
      if (tagName.startsWith('gdwc-')) {
        child.dispatchUpdate();
      }
    }
  }

  render() {
    return html`<slot>${this.objectName}</slot>`;
  }
}
