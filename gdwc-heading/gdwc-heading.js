import { LitElement, css } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { html, unsafeStatic } from 'lit/static-html.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import normalize from '../styles/normalize.css.js';
import theme from '../styles/theme.css.js';

export class GdwcHeading extends LitElement {
  static get properties() {
    return {
      /**
       * Heading size
       */
      size: { type: String },
      /**
       * Heading level
       */
      level: { type: String },
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
      `,
    ];
  }

  constructor() {
    super();

    this.validLevels = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
    this.level = 'h2';
  }

  render() {
    const styles = { fontSize: `var(${this.size})` };
    const style = this.size ? styleMap(styles) : null;
    const level = this.sanitizeLevel(this.level);
    /* eslint-disable lit/binding-positions, lit/no-invalid-html */
    return html` <${unsafeStatic(level)}
        style=${ifDefined(style)}
      >
        <slot></slot>
      </${unsafeStatic(level)}> `;
    /* eslint-enable lit/binding-positions, lit/no-invalid-html */
  }

  sanitizeLevel(level) {
    return this.validLevels.includes(level.toLowerCase()) ? level : 'h2';
  }
}
