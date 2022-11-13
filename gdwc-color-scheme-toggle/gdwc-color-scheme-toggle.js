import { LitElement, html, css } from 'lit';

import '../icon-button.js';

import normalize from '../styles/normalize.css.js';
import theme from '../styles/theme.css.js';
import '../styles/theme-toggle.css';

export class GdwcColorSchemeToggle extends LitElement {
  static get properties() {
    return {
      /**
       * Dark or light theme
       */
      _theme: { type: String, state: true },
    };
  }

  static get styles() {
    return [
      normalize,
      theme,
      css`
        :host {
          color: var(--gdwc-icon-color, var(--gdwc-text-1));
          font-size: var(--gdwc-icon-font-size);
        }
      `,
    ];
  }

  constructor() {
    super();

    this._theme = 'light';
    this.nameTheme = 'brightness-high-fill';
  }

  connectedCallback() {
    super.connectedCallback();

    this.nameLight = `brightness-high-fill`;
    this.nameDark = `moon-fill`;

    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      this.setDark();
    } else {
      this.setLight();
    }

    // Change theme when toggled
    this.addEventListener('click', this._handleClick);

    // Watch for color scheme changes
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', event => this._handleChange(event));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this._handleClick);
    window.removeEventListener('change', this._handleChange);
  }

  _handleClick() {
    if (this._theme === 'light') {
      this.nameTheme = this.nameDark;
      this._theme = 'dark';
    } else {
      this.nameTheme = this.nameLight;
      this._theme = 'light';
    }

    document.querySelector('html').setAttribute('data-theme', this._theme);
  }

  _handleChange(event) {
    if (event.matches) {
      this.setDark();
    } else {
      this.setLight();
    }
  }

  setDark() {
    document.querySelector('html').setAttribute('data-theme', 'dark');
    this.nameTheme = this.nameDark;
    this._theme = 'dark';
  }

  setLight() {
    document.querySelector('html').setAttribute('data-theme', 'light');
    this.nameTheme = this.nameLight;
    this._theme = 'light';
  }

  render() {
    return html`
      <div class="gdwc-color-scheme-toggle">
        <gdwc-icon-button
          name=${this.nameTheme}
          theme=${this._theme}
        ></gdwc-icon-button>
      </div>
    `;
  }
}
