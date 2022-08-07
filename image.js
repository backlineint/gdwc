import { GdwcImage } from './gdwc-image/gdwc-image.js';

if (!customElements.get('gdwc-image')) {
  customElements.define('gdwc-image', GdwcImage);
}
