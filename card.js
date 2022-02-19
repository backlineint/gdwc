import { GdwcCard } from './gdwc-card/gdwc-card.js';

if (!customElements.get('gdwc-card')) {
  customElements.define('gdwc-card', GdwcCard);
}
