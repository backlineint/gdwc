import { LitElement, html } from 'lit-element';

export class GdwcMenu extends LitElement {
  static get properties() {
    return {
      /**
       * Heading for the menu.
       */
      heading: { type: String },
    }
  }

  render() {
    return html`
      <div class="gdwc-menu">
        <h2>${this.heading}</h2>
      </div>
    `
  }

}