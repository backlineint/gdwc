import { GdwcContainer } from './gdwc-container/gdwc-container.js';

if (!customElements.get('gdwc-container')) {
  customElements.define('gdwc-container', GdwcContainer);
}
