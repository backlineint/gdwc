import { html, css } from 'lit-element';
import { GdwcMenu } from '../../gdwc-menu/gdwc-menu.js';

export class GdwcMenuExtended extends GdwcMenu {
  static get styles() {
    return css`
      :host {
        display: block;
        font-family: 'Courier New', Courier, monospace;
      }
      h2 {
        text-align: center;
      }
      ul {
        padding: 0;
        margin: 0;
        background: lightgray
      }
      li {
        list-style: none;
        padding: 1rem 2rem;
        font-weight: bold;
        cursor: pointer;
      }
      li:hover {
        background-color: green;
      }
      li a {
        color: black;
      }
      ul > li > ul {
        margin-top: 1rem;
      }
      ul > li > ul > li:hover {
        background-color: lightgreen;
      }
    `;
  }

  menuItemTemplate = (title) => {
    return html`<li part="menu-item">🍩 ${title}</li>`;
  }

  render() {
    return html`
      <div class="gdwc-menu-extended">
        <slot name="brand"><h2>${this.branding}</h2></slot>
        <p>This an example gdwc-menu-extended element. Rather than using the existing styling hooks, this is a new
        component that extends the GdwcMenu class. This approach makes it possible to completely override portions of
        a component. In this case, the new GdwcMenuExtended class implements styles() and render() allowing us to provide
        different styling and markup, but use the existing methods to fetch data and render the levels of the menu.</p>
        <p>The following functions can also be overridden in order to replace various templates:</p>
        <p>
        menuLevelTemplate(levels) {}<br />
        menuParentTemplate(title, children) {}<br />
        menuLinkTemplate(title, href) {}<br />
        menuItemTemplate(title) {} (used below to add emoji to child menu items)
        </p>
        ${this.renderMenuLevel(this.tree)}
      </div>
    `
  }
}

customElements.get("gdwc-menu-extended") || customElements.define('gdwc-menu-extended', GdwcMenuExtended);