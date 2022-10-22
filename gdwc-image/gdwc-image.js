import { LitElement, html, css } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import normalize from '../styles/normalize.css.js';
import theme from '../styles/theme.css.js';

export class GdwcImage extends LitElement {
  static get properties() {
    return {
      /**
       * Image src
       */
      src: { type: String },
      /**
       * Image alt
       */
      alt: { type: String },
      /**
       * Image aspect-ratio
       */
      aspectRatio: { type: String },
      /**
       * Image data
       */
      data: { type: Object },
    };
  }

  static get styles() {
    return [
      normalize,
      theme,
      css`
        :host {
          display: block;
          border: var(--gdwc-border, none) !important;
          border-radius: var(--gdwc-border-radius);
          box-shadow: var(--gdwc-shadow);
          padding: var(--gdwc-padding);
          background-image: var(--gdwc-background-image);
        }
        img,
        ::slotted(img) {
          object-fit: cover;
          width: 100%;
        }
        :host([aspect-ratio='square']) ::slotted(img),
        :host([aspect-ratio='square']) img {
          aspect-ratio: var(--ratio-square);
        }
        :host([aspect-ratio='landscape']) ::slotted(img),
        :host([aspect-ratio='landscape']) img {
          aspect-ratio: var(--ratio-landscape);
        }
        :host([aspect-ratio='portrait']) ::slotted(img),
        :host([aspect-ratio='portrait']) img {
          aspect-ratio: var(--ratio-portrait);
        }
        :host([aspect-ratio='widescreen']) ::slotted(img),
        :host([aspect-ratio='widescreen']) img {
          aspect-ratio: var(--ratio-widescreen);
        }
        :host([aspect-ratio='ultrawide']) ::slotted(img),
        :host([aspect-ratio='ultrawide']) img {
          aspect-ratio: var(--ratio-ultrawide);
        }
        :host([aspect-ratio='golden']) ::slotted(img),
        :host([aspect-ratio='golden']) img {
          aspect-ratio: var(--ratio-golden);
        }
      `,
    ];
  }

  render() {
    if (this.data) {
      this.processData(this.data);
    }

    return this.src || this.alt
      ? html` <img src="${ifDefined(this.src)}" alt="${ifDefined(this.alt)}" />`
      : html`<slot></slot>`;
  }

  /**
   * Processes data object and the related component properties.
   *
   * @param {object} data
   */
  processData(data) {
    if (data?.links.self.href) {
      const Url = new URL(data.links.self.href);
      const customizedUri = Url.origin + data.uri.url;
      this.src = customizedUri;
    }
    if (data?.resourceIdObjMeta.alt) {
      this.alt = data.resourceIdObjMeta.alt;
    }
  }
}
