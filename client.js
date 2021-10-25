import { GdwcClient } from './gdwc-client/gdwc-client.js';

if (!customElements.get('gdwc-client')) {
  customElements.define('gdwc-client', GdwcClient);
}
