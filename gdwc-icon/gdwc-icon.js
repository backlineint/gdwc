import { LitElement, html, css } from 'lit';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js';

import normalize from '../styles/normalize.css.js';
import theme from '../styles/theme.css.js';

setBasePath('../../node_modules/@shoelace-style/shoelace/dist');

export class GdwcIcon extends LitElement {
  static get properties() {
    return {
      /**
       * Example property
       */
      name: { type: String },
    };
  }

  static get styles() {
    return [
      normalize,
      theme,
      css`
        :host {
          color: var(--gdwc-icon-color, var(--gdwc-text-1));
          font-size: var(--gdwc-icon-font-size);
        }
      `,
    ];
  }

  render() {
    return html`
      <div class="gdwc-icon">
        <sl-icon name="${this.name}"></sl-icon>
      </div>
    `;
  }
}
