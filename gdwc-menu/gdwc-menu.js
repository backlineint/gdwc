import { LitElement, html, css } from 'lit-element';
import { denormalize } from 'linkset-menu';

export class GdwcMenu extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }
      :host(.dark) {
        background-color: black;
        color: white;
      }
      :host(.light) {
        background-color: lightgrey;
      }
    `;
  }

  static get properties() {
    return {
      /**
       * Base URL of menu endpoint
       */
      baseUrl: { type: String },

      /**
       * Machine name of menu
       */
      menuId: { type: String },

      /**
       * Branding heading for the menu
       */
      branding: { type: String },

      /**
       * An array of objects containing data for the menu tree
       */
      tree: { type: Array },
    };
  }

  constructor() {
    super();

    this.tree = [];
  }

  connectedCallback() {
    super.connectedCallback();

    if (this.baseUrl && this.menuId) {
      this.fetchData(this.baseUrl, this.menuId);
    }
  }

  static menuLevelTemplate(levels) {
    return html`<ul part="menu-level">
      ${levels}
    </ul>`;
  }

  menuParentTemplate(title, children) {
    return html`<li part="menu-item">
      ${title} ${this.renderMenuLevel(children)}
    </li>`;
  }

  static menuLinkTemplate(title, href) {
    return html`<li part="menu-item"><a href=${href}>${title}</a></li>`;
  }

  static menuItemTemplate(title) {
    return html`<li part="menu-item">${title}</li>`;
  }

  renderMenuLevel(level) {
    const levels = level.map(item => this.renderMenuItem(item));

    return GdwcMenu.menuLevelTemplate(levels);
  }

  renderMenuItem(item) {
    const title = item?.link?.attributes?.title;
    const href = item?.link?.href;
    const children = item?.children;

    if (href) {
      return GdwcMenu.menuLinkTemplate(title, href);
    }

    if (children.length) {
      return this.menuParentTemplate(title, children);
    }

    return GdwcMenu.menuItemTemplate(title);
  }

  fetchData(baseURL, menuID) {
    const url = `${baseURL}/system/menu/${menuID}/linkset`;

    fetch(url, {})
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(
          `Unable to fetch ${url}. ${response.status} ${response.statusText}`
        );
      })
      .then(json => {
        try {
          const denormalized = denormalize(json, menuID);
          this.tree = denormalized.tree;
        } catch (e) {
          throw new Error('Unable to denormalize menu.');
        }
      });
  }

  render() {
    return html`
      <div class="gdwc-menu">
        <slot name="brand"><h2>${this.branding}</h2></slot>
        ${this.renderMenuLevel(this.tree)}
      </div>
    `;
  }
}
