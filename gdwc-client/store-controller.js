import { DrupalState } from '@gdwc/drupal-state';

export class StoreController {
  constructor(host, apiRoot, debug = false) {
    // Store a reference to the host
    this.host = host;
    this.store = new DrupalState({
      apiRoot,
      debug,
    });
    // Register for lifecycle updates
    host.addController(this);
  }

  async query({ objectName, query }) {
    await this.store.getObject({ objectName, query });
    this.host.requestUpdate();
  }
}
