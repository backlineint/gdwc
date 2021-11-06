import { GdwcQuery } from './gdwc-query/gdwc-query.js';

if (!customElements.get('gdwc-query')) {
  customElements.define('gdwc-query', GdwcQuery);
}
