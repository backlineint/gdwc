import { LitElement, html, css } from 'lit';

import normalize from '../styles/normalize.css.js';
import theme from '../styles/theme.css.js';
import buttons from '../styles/buttons.css.js';

export class GdwcButton extends LitElement {
  static get properties() {
    return {
      /**
       * Button type attribute
       */
      type: { type: String },

      /**
       * If button is disabled
       */
      disabled: { type: Boolean },

      /**
       * Button text
       */
      text: { type: String },
    };
  }

  constructor() {
    super();

    this.type = 'button';
    this.disabled = false;
  }

  static get styles() {
    return [
      normalize,
      theme,
      buttons,
      css`
        button {
          padding: var(--gdwc-padding, 0.75ch);
          --_bg-light: var(--gdwc-bg-light, #fff);
          --_bg-dark: var(--gdwc-bg-dark, var(--surface-3));
          border-radius: var(--gdwc-border-radius, var(--radius-2));
          background-image: var(--gdwc-background-image);
          --_border: var(--gdwc-border-color, var(--surface-3));
          /* --_highlight-light: hsl(210 10% 71%/25%); */
          /* --_ink-shadow-light: 0 1px 0 var(--red-3); */
          /* Primary and secondary */
          /* Uncomment lines below to support additional CSS variables.
          Delete commented lines if variable is not supported. */
          /*
          box-shadow: var(--gdwc-shadow); */
        }
      `,
    ];
  }

  render() {
    return html` <button type=${this.type} ?disabled=${this.disabled}>
      <slot></slot>
    </button>`;
  }
}
