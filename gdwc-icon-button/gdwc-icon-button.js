import { LitElement, html, css } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js';

import normalize from '../styles/normalize.css.js';
import theme from '../styles/theme.css.js';

setBasePath('../../node_modules/@shoelace-style/shoelace/dist');

export class GdwcIconButton extends LitElement {
  static get properties() {
    return {
      /**
       * Icon name
       */
      name: { type: String },
      /**
       * Href converts the button to a link
       */
      href: { type: String },
      /**
       * Display button as disabled
       */
      disabled: { type: Boolean },
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
      <div class="gdwc-icon-button">
        <sl-icon-button
          name="${this.name}"
          href=${ifDefined(this.href)}
          disabled=${ifDefined(this.disabled)}
        >
        </sl-icon-button>
      </div>
    `;
  }
}
