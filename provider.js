import { GdwcProvider } from './gdwc-provider/gdwc-provider.js';

if (!customElements.get('gdwc-provider')) {
  customElements.define('gdwc-provider', GdwcProvider);
}
