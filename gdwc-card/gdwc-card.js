import { LitElement, html, css } from 'lit';

export class GdwcCard extends LitElement {
  static get properties() {
    return {
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

  render() {
    return html`
      <div class="gdwc-card">
        <div class="gdwc-card__image">
          <img src="${this.imgSrc}" alt="" />
        </div>
        <h2>${this.headline}</h2>
        <slot><p>${this.body}</p></slot>
        <a href="${this.linkHref}">Read more</a>
      </div>
    `;
  }
}
