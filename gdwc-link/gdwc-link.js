import { LitElement, html, css } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import normalize from '../styles/normalize.css.js';
import theme from '../styles/theme.css.js';

export class GdwcLink extends LitElement {
  static get properties() {
    return {
      /**
       * Link Href
       */
      href: { type: String },
      /**
       * Link rel
       */
      rel: { type: String },
      /**
       * Link target
       */
      target: { type: String },
      /**
       * Link title
       */
      title: { type: String },
      /**
       * Link data
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
          border: var(--gdwc-border, none) !important;
          border-radius: var(--gdwc-border-radius);
          box-shadow: var(--gdwc-shadow);
          padding: var(--gdwc-padding);
          background-image: var(--gdwc-background-image);
        }
      `,
    ];
  }

  render() {
    if (this.data) {
      this.processData(this.data);
    }

    return html`
      <a
        href="${ifDefined(this.href)}"
        rel="${ifDefined(this.rel)}"
        target="${ifDefined(this.target)}"
        title="${ifDefined(this.title)}"
        ><slot></slot
      ></a>
    `;
  }

  /**
   * Processes data object and the related component properties.
   *
   * @param {object} data
   */
  processData(data) {
    if (data?.uri) {
      const customizedUri = data.uri
        .replace('entity:', '/')
        .replace('internal:', '');
      this.href = customizedUri;
    }

    if (data?.title) {
      this.title = data.title;
    }
  }
}
