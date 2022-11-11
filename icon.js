import { GdwcIcon } from './gdwc-icon/gdwc-icon.js';

if (!customElements.get('gdwc-icon')) {
  customElements.define('gdwc-icon', GdwcIcon);
}
