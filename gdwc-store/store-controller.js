import { DrupalState } from '@gdwc/drupal-state';

export class StoreController {
  constructor(
    host,
    apiBase,
    apiPrefix = 'jsonapi',
    defaultLocale = '',
    debug = false
  ) {
    // Store a reference to the host
    this.host = host;
    this.store = new DrupalState({
      apiBase,
      apiPrefix,
      defaultLocale,
      debug,
    });

    this.storeEvent = new CustomEvent('storeupdate', {
      bubbles: true, // bubble event to containing elements
      composed: true, // let the event pass through the shadowDOM boundary
    });

    // Register for lifecycle updates
    host.addController(this);
  }

  hostUpdate() {
    this.host.dispatchEvent(this.storeEvent);
  }

  async query({ objectName, query, id, include }) {
    if (include) {
      this.store.params.addInclude([include]);
    }
    const result = await this.store.getObject({ objectName, id, query });
    this.host.requestUpdate();
    return result;
  }
}
