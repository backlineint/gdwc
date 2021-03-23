import { LitElement, html } from 'lit-element';
import { denormalize } from 'linkset-menu';

function renderMenuItem(item) {
  if (item.link.href) {
    return html`<li><a href=${item.link.href}>${item.link.attributes.title}</a></li>`;
  }
  else {
    if (item.children.length) {
      return html`<li>${item.link.attributes.title} ${renderMenuLevel(item.children)}</li>`;
    }
    else {
      return html`<li>${item.link.attributes.title}</li>`;
    }
  }
}

function renderMenuLevel(level) {
  return html`<ul>
    ${level.map((item) => {
      return renderMenuItem(item);
    })}
  </ul>`
}

export class GdwcMenu extends LitElement {
  static get properties() {
    return {
      /**
       * Base URL of menu endpoint
       */
      'baseUrl': { type: String },

      /**
       * Machine name of menu
       */
      'menuId': { type: String },

      /**
       * Branding heading for the menu
       */
      'branding': { type: String },

      /**
       * An array of objects containing data for the menu tree
       */
      'tree': {type: Array},
    }
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

  fetchData(baseURL, menuID) {
    const url = `${baseURL}/system/menu/${menuID}/linkset`;

    fetch(url, {})
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error(`Unable to fetch ${url}. ${response.status} ${response.statusText}`);
      })
      .then((json => {
        try {
          const denormalized = denormalize(json, menuID);
          this.tree = denormalized.tree;
        }
        catch (e) {
          throw new Error(`Unable to denormalize menu.`);
        }
      }));
  }

  render() {
    return html`
      <div class="gdwc-menu">
        <h2>${this.branding}</h2>
        ${renderMenuLevel(this.tree)}
      </div>
    `
  }

}