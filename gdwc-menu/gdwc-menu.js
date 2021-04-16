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
      .gdwc-menu li > ul {
        display: none;
      }
      .gdwc-menu ul.show {
        display: block;
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

      /**
       * Loading state
       */
      isLoading: {
        type: Boolean,
        attribute: false,
      },

      /**
       * Loading message
       */
      loadingMessage: { type: String },
    };
  }

  constructor() {
    super();

    this.tree = [];
    this.isLoading = false;
    this.loadingMessage = 'Loading...';
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
      <a
        @click="${GdwcMenu.openMenu}"
        role="button"
        aria-expanded="false"
        aria-haspopup="true"
        href="#"
      >
        ${title}
      </a>
      ${this.renderMenuLevel(children)}
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

    if (children && children.length) {
      return this.menuParentTemplate(title, children);
    }
    if (href) {
      return GdwcMenu.menuLinkTemplate(title, href);
    }
    return GdwcMenu.menuItemTemplate(title);
  }

  fetchData(baseURL, menuID) {
    this.isLoading = true;
    const url = `${baseURL}/system/menu/${menuID}/linkset`;

    fetch(url, {})
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        this.isLoading = false;
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
        this.isLoading = false;
      });
  }

  render() {
    return html`
      <div class="gdwc-menu">
        <slot name="brand"><h2>${this.branding}</h2></slot>
        ${this.isLoading
          ? html`<slot name="loading">${this.loadingMessage}</slot>`
          : this.renderMenuLevel(this.tree)}
      </div>
    `;
  }

  static openMenu(e) {
    e.preventDefault();

    const { target } = e;
    const isExpanded = target.getAttribute('aria-expanded') === 'true';

    if (isExpanded) {
      target.setAttribute('aria-expanded', 'false');
      target.nextElementSibling.classList.remove('show');
    } else {
      target.setAttribute('aria-expanded', 'true');
      target.nextElementSibling.classList.add('show');
    }
  }
}
