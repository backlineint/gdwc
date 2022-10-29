import { html } from 'lit';

import '../store.js';
import '../provider.js';
import '../card.js';
import '../container.js';

export default {
  title: 'Data/Provider (Experimental)',
  component: 'Provider',
  description:
    'Provider element that adds data to a parent instance of Drupal State and makes data available to a child template.',
  parameters: {
    docs: {
      description: {
        component:
          'Provider element that adds data to a parent instance of Drupal State and makes data available to a child template.',
      },
    },
  },
};

const collectionTemplate = ({ apiBase, debug, objectName }) =>
  html`
    <gdwc-store apiBase=${apiBase} ?debug=${debug}>
      <gdwc-provider
        objectName=${objectName}
        params="include=field_media_image.field_media_image"
        ?debug=${debug}
      >
        <template>
          <style>
            :host {
              --gdwc-shadow: var(--shadow-5);
              display: grid;
              grid-template-columns: 1fr 1fr 1fr;
              grid-gap: 20px;
            }
          </style>
          <gdwc-card
            headline="{{ title }}"
            imgSrc="https://dev-ds-demo.pantheonsite.io/{{ field_media_image.field_media_image.uri.url }}"
            >{{ field_summary.processed }}
          </gdwc-card>
        </template>
      </gdwc-provider>
    </gdwc-store>
  `;

const resourceTemplate = ({ apiBase, debug, apiPrefix, objectName }) =>
  html`
    <gdwc-store apiBase=${apiBase} apiPrefix=${apiPrefix} ?debug=${debug}>
      <gdwc-provider
        objectName=${objectName}
        id="c1a87e33-06a7-4c76-97dd-85b8d6fcd45b"
      >
        <template>
          <style>
            :host {
              --gdwc-padding: var(--size-6);
            }
          </style>
          <gdwc-container>
            <h2>{{ title }}</h2>
            <p>{{ body.processed }}</p>
          </gdwc-container>
        </template>
      </gdwc-provider>
    </gdwc-store>
  `;

export const Collection = collectionTemplate.bind({});
Collection.args = {
  apiBase: 'https://dev-ds-demo.pantheonsite.io',
  defaultLocale: 'en',
  debug: true,
  objectName: 'node--recipe',
};

export const Resource = resourceTemplate.bind({});
Resource.args = {
  apiBase: 'https://dev-ds-demo.pantheonsite.io',
  apiPrefix: 'jsonapi',
  debug: true,
  objectName: 'node--page',
};
