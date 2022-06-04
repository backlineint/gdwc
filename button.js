import { GdwcButton } from './gdwc-button/gdwc-button.js';

if (!customElements.get('gdwc-button')) {
  customElements.define('gdwc-button', GdwcButton);
}
