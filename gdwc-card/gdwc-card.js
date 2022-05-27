import { LitElement, html, css } from 'lit';

import normalize from '../styles/normalize.css.js';
import theme from '../styles/theme.css.js';

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
    return [
      normalize,
      theme,
      css`
        :host {
          display: block;
          background-image: var(--gdwc-background-image);
          border: var(--gdwc-border, none) !important;
          border-radius: var(--gdwc-border-radius);
          box-shadow: var(--gdwc-shadow);
        }
        img {
          max-width: 100%;
        }
        .gdwc-card__body {
          padding: var(--gdwc-padding, var(--size-3));
        }
      `,
    ];
  }

  render() {
    return html`
      <div class="gdwc-card">
        ${this.imgSrc
          ? html`<div class="gdwc-card__image">
              <img src="${this.imgSrc}" alt="" />
            </div>`
          : ''}
        <div class="gdwc-card__body">
          <h2>${this.headline}</h2>
          <slot><p>${this.body}</p></slot>
          <a href="${this.linkHref}">Read more</a>
        </div>
      </div>
    `;
  }
}
