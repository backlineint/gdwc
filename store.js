import { GdwcStore } from './gdwc-store/gdwc-store.js';

if (!customElements.get('gdwc-store')) {
  customElements.define('gdwc-store', GdwcStore);
}
