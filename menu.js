import { GdwcMenu } from './gdwc-menu/gdwc-menu.js';

if (!customElements.get('gdwc-menu')) {
  customElements.define('gdwc-menu', GdwcMenu);
}
