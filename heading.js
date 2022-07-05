import { GdwcHeading } from './gdwc-heading/gdwc-heading.js';

if (!customElements.get('gdwc-heading')) {
  customElements.define('gdwc-heading', GdwcHeading);
}
