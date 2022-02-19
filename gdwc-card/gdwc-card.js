import { LitElement, html, css } from 'lit';

import findPath from '../utils/findPath.js';
import resolve from '../utils/resolve.js';

export class GdwcCard extends LitElement {
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
       * A GraphQL query to be used when retrieving the object.
       */
      query: { type: String },
      /**
       * Image source
       */
      imgSrc: { type: String },
      /**
       * Card headline
       */
      headline: { type: String },
      /**
       * Card body
       */
      body: { type: String },
      /**
       * Link href
       */
      linkHref: { type: String },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        padding: 1rem;
        border: 2px solid #ccc;
      }
      img {
        max-width: 100%;
      }
    `;
  }

  setStoreController(storeController, objectName, query) {
    this.storeController = storeController;
    this.objectName = objectName;
    this.query = query;
  }

  async dispatchUpdate() {
    if (this.storeController.store.getState()?.dsApiIndex) {
      const updatedState = await this.storeController.store.getObject({
        objectName: this.objectName,
        id: this.id,
        query: this.query,
      });
      // TODO - check that state has changed before updating
      // TODO - how can we handle this update generically. Destructuring?
      this.headline = updatedState.headline;
      this.body = updatedState.body;
      /**
       * Pick up:
       * Provide a way to indicate 'internal' props vs props that can be set by query
       * Get all properties that can be set.
       * Iterate through them and set using util functions.
       * Abstract this into a reactive controller if possible.
       */
      const path = findPath(updatedState, 'imageSrc');
      console.log('resolve', resolve(`${path}.imageSrc`, updatedState));
      console.log('elem props', this.constructor.properties);
      this.imgSrc = updatedState.image.thumbnail.imageSrc;
      this.linkHref = updatedState.path.linkHref
        ? updatedState.path.alias
        : updatedState.id;
    }
  }

  render() {
    return html`
      <div class="gdwc-card">
        <div class="gdwc-card__image">
          <img src="${this.imgSrc}" alt="" />
        </div>
        <h2>${this.headline}</h2>
        <p>${this.body}</p>
        <a href="${this.linkHref}">Read more</a>
      </div>
    `;
  }
}
