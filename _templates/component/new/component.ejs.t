---
to: gdwc-<%= elementName %>/gdwc-<%= elementName %>.js
---
<%
  className = 'Gdwc' + h.changeCase.pascal(elementName);
%>
import { LitElement, html, css } from 'lit';

import normalize from '../styles/normalize.css.js';
import theme from '../styles/theme.css.js';

export class <%= className %> extends LitElement {
  static get properties() {
    return {
      /**
       * Example property
       */
      example: { type: String },
    };
  }

  static get styles() {
    return [
      normalize,
      theme,
      css`
        :host {
          display: block;
          /* Uncomment lines below to support additional CSS variables.
          Delete commented lines if variable is not supported. */
          /* adding: var(--gdwc-padding, var(--size-3));
          background-image: var(--gdwc-background-image);
          border: var(--gdwc-border, none) !important;
          border-radius: var(--gdwc-border-radius);
          box-shadow: var(--gdwc-shadow); */
        }
      `,
    ];
  }

  render() {
    return html` <div class="gdwc-<%= name %>">
      <h2>${this.example}</h2>
      <slot>Slotted Content</slot>
    </div> `;
  }
}


