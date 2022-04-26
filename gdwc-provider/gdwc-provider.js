import { LitElement, html } from 'lit';
import { templateContent } from 'lit/directives/template-content.js';
import { until } from 'lit/directives/until.js';
import objectPath from 'object-path';

export class GdwcProvider extends LitElement {
  static get properties() {
    return {
      /**
       * A reference to the reactive controller instance provided by the parent client.
       */
      storeController: { type: Object },
      /**
       * Name of object to be retrieved.
       */
      objectName: { type: String },
      /**
       * UUID of an individual object to be retrieved.
       */
      id: { type: String },
      /**
       * Relationships to be included.
       */
      include: { type: String },
      /**
       * A GraphQL query to be used when retrieving the object.
       */
      query: { type: String },
      /**
       * Flag for debug mode
       */
      debug: { type: Boolean },
    };
  }

  constructor() {
    super();

    this.debug = false;
    this.template = this.querySelector('template');
  }

  connectedCallback() {
    super.connectedCallback();

    // Make data from the store available to the provided template
    this.processedTemplate = this.processTemplate();
  }

  async processTemplate() {
    // Ensure that we get data back from our provider before rendering
    await super.getUpdateComplete();
    const store = await this.storeController.query({
      objectName: this.objectName,
      id: this.id,
      query: this.query,
      include: this.include,
    });

    if (this.debug) {
      console.log('Provider scope', store);
    }

    const templateMarkup = this.template ? this.template?.innerHTML : '';
    let processedTemplateMarkup = '';

    if (!Array.isArray(store)) {
      processedTemplateMarkup = templateMarkup.replaceAll(
        /{{(.*?)}}/g,
        (match, p1) => objectPath.get(store, p1.trim(), '')
      );
    } else {
      store.forEach(item => {
        processedTemplateMarkup += templateMarkup.replaceAll(
          /{{(.*?)}}/g,
          (match, p1) => objectPath.get(item, p1.trim(), '')
        );
      });
    }

    // Will using document here cause any issues for SSR?
    const processedTemplate = document.createElement('template');
    processedTemplate.innerHTML = processedTemplateMarkup;
    // TODO - additional sanitization of template markup?

    return templateContent(processedTemplate);
  }

  setStoreController(storeController) {
    this.storeController = storeController;
  }

  render() {
    return html`${until(this.processedTemplate)}`;
  }
}
