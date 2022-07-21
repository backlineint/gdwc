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

      /**
       * If button uses primary variant
       */
      primary: { type: Boolean },
    };
  }

  constructor() {
    super();

    this.type = 'button';
    this.disabled = false;
    this.primary = false;
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
          --_bg: #fff;
          border-radius: var(--gdwc-border-radius, var(--radius-2));
          background-image: var(--gdwc-background-image);
          --_border: var(--gdwc-border-color, var(--surface-3));
          --_highlight-light: var(--gdwc-highlight-light, hsl(210 10% 71%/25%));
          --_highlight-dark: var(--gdwc-highlight-dark, hsl(210 10% 5%/25%));
          --_ink-shadow-light: 0 1px 0
            var(--gdwc-ink-shadow-color-light, var(--gray-3));
          --_ink-shadow-dark: 0 1px 0
            var(--gdwc-ink-shadow-color-dark, var(--surface-1));
        }
        button:hover {
          --_bg: var(--_bg-light);
        }
        button[primary] {
          --_bg: var(--_bg-light);
        }
        button[primary]:hover {
          --_bg: #fff;
        }
        @media (prefers-color-scheme: dark) {
          button {
            --_bg: var(--surface-3);
          }
          button:hover {
            --_bg: var(--_bg-dark);
          }
          button[primary] {
            --_bg: var(--_bg-dark);
          }
          button[primary]:hover {
            --_bg: var(--surface-3);
          }
        }
      `,
    ];
  }

  render() {
    return html` <button
      ?primary=${this.primary}
      type=${this.type}
      ?disabled=${this.disabled}
    >
      <slot></slot>
    </button>`;
  }
}
