import { LitElement, html, css } from 'lit-element';
import { denormalize } from 'linkset-menu';

export class GdwcMenu extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }
      :host(:not([theme='unstyled'])) a {
        text-decoration: none;
      }
      :host(:not([theme='unstyled'])) a:hover {
        text-decoration: underline;
      }

      /* Menu expand and collapse */
      :host(:not([theme='unstyled'])) li > ul {
        display: none;
      }
      :host(:not([theme='unstyled'])) ul.show {
        display: block;
      }
      :host(:not([theme='unstyled'])) a[aria-haspopup='true']:after {
        content: '';
        display: inline-block;
        position: relative;
        vertical-align: top;
        height: 0.45em;
        width: 0.45em;
        top: 0.15em;
        left: 0.25em;
        border-style: solid;
        border-width: 0.1em 0.1em 0 0;
        transform: rotate(135deg);
      }
      :host(:not([theme='unstyled']))
        a[aria-haspopup='true'][aria-expanded='true']:after {
        transform: rotate(-45deg);
        top: 0.45em;
      }

      /* Horizontal Theme */
      :host([theme='horizontal']) {
        overflow: visible;
        float: left;
        width: 100%;
        background-color: var(--background, #f8f9fa);
      }
      :host([theme='horizontal']) slot h2 {
        float: left;
      }
      :host([theme='horizontal']) .navbar-toggler {
        float: right;
        /* Would much rather flex align this... */
        margin: 0.75rem 0;
        border: 0;
        border-radius: 5px;
        background: transparent;
      }
      :host([theme='horizontal']) .change .bar1 {
        -webkit-transform: rotate(-45deg) translate(-9px, 6px);
        transform: rotate(-45deg) translate(-9px, 6px);
      }
      :host([theme='horizontal']) .change .bar2 {
        opacity: 0;
      }
      :host([theme='horizontal']) .change .bar3 {
        -webkit-transform: rotate(45deg) translate(-8px, -8px);
        transform: rotate(45deg) translate(-8px, -8px);
      }
      :host([theme='horizontal']) .navbar-toggler .bar {
        width: 30px;
        height: 3px;
        background-color: #333;
        margin: 8px 0;
        transition: 0.4s;
      }
      :host([theme='horizontal']) #main-menu {
        display: none;
        float: right;
        clear: both;
        width: 100%;
      }
      :host([theme='horizontal']) ul {
        list-style-type: none;
        padding-left: 0;
        margin-top: 0;
      }
      :host([theme='horizontal']) #main-menu > ul > li {
        margin: 0 1em 1em 0;
      }
      :host([theme='horizontal']) ul li {
        margin: 1em;
      }
      :host([theme='horizontal']) ul ul {
        list-style-type: none;
      }
      @media (min-width: 1024px) {
        :host([theme='horizontal']) .navbar-toggler {
          display: none;
        }
        :host([theme='horizontal']) #main-menu {
          border-bottom: none;
          /*
          !important is a hacky fix below. I'm hoping we can remove this when the expand and
          collapse is animated and no longer depends on 'display'
          */
          display: block !important;
          width: auto;
          clear: none;
        }
        :host([theme='horizontal']) ul {
          display: flex;
          padding-left: 0;
          margin-top: 1em;
          float: right;
        }
        :host([theme='horizontal']) ul ul {
          background-color: white;
        }
        :host([theme='horizontal']) li {
          padding: 0.75rem 0.75rem 0.75rem 1rem;
          position: relative;
        }
        :host([theme='horizontal']) #main-menu > ul > li {
          margin: 0;
        }
        :host([theme='horizontal']) ul li {
          margin: 0;
        }
        :host([theme='horizontal']) li > ul {
          position: absolute;
          top: 3rem;
          right: 0;
          border: 1px solid black;
        }
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

      /**
       * Theme to trigger alternate menu presentations
       */
      theme: { type: String },
    };
  }

  constructor() {
    super();

    this.tree = [];
    this.mobileStyle = 'none';
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
        ${this.theme === 'horizontal'
          ? html`
              <button
                id="mobile-menu"
                @click=${this._mobileMenu}
                aria-label="Toggle navigation"
                class="navbar-toggler collapsed"
              >
                <div class="bar bar1"></div>
                <div class="bar bar2"></div>
                <div class="bar bar3"></div>
              </button>
            `
          : ''}
        <div id="main-menu">
          ${this.isLoading
            ? html`<slot name="loading">${this.loadingMessage}</slot>`
            : this.renderMenuLevel(this.tree)}
        </div>
      </div>
    `;
  }

  get mobileMainNav() {
    return this.shadowRoot.getElementById('main-menu');
  }

  _mobileMenu() {
    this.mobileFunc = this.shadowRoot.getElementById('mobile-menu');
    this.mobileFunc.classList.toggle('change');

    if (this.mobileStyle === 'none') {
      this.mobileMainNav.style.display = 'block';
      this.mobileMainNav.setAttribute('aria-expanded', true);
      this.mobileStyle = 'block';
    } else {
      this.mobileMainNav.style.display = 'none';
      this.mobileMainNav.setAttribute('aria-expanded', false);
      this.mobileStyle = 'none';
    }
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
