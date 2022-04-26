import { html } from 'lit';

import '../../store.js';
import '../../provider.js';
import '../../card.js';

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
        include="field_media_image.field_media_image"
        ?debug=${debug}
      >
        <template>
          <style>
            :host {
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
        id="b08476b6-8d10-4ac5-b539-ca3b9e8161ec"
      >
        <template
          ><h2>{{ title }}</h2>
          <p>{{ body }}</p>
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
  apiBase: 'https://live-contentacms.pantheonsite.io',
  apiPrefix: 'api',
  debug: true,
  objectName: 'pages',
};
