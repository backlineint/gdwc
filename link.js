import { GdwcLink } from './gdwc-link/gdwc-link.js';

if (!customElements.get('gdwc-link')) {
  customElements.define('gdwc-link', GdwcLink);
}
