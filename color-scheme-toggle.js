import { GdwcColorSchemeToggle } from './gdwc-color-scheme-toggle/gdwc-color-scheme-toggle.js';

if (!customElements.get('gdwc-color-scheme-toggle')) {
  customElements.define('gdwc-color-scheme-toggle', GdwcColorSchemeToggle);
}
