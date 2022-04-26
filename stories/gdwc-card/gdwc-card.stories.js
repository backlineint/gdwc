import { html } from 'lit';

import '../../card.js';
import '../../store.js';
import '../../provider.js';

export default {
  title: 'Components/Card',
  component: 'Card',
  description: 'A simple card component',
  parameters: {
    docs: {
      description: {
        component: 'A generic card.',
      },
    },
  },
};

const Template = ({ imgSrc, headline, body, linkHref }) =>
  html`<gdwc-card
    imgSrc=${imgSrc}
    headline=${headline}
    body=${body}
    linkHref=${linkHref}
  ></gdwc-card>`;

// TODO - Provide a list of recipe IDs to swap between in storybook.
// TODO - Various improvements to how set and dispatch methods are handled.

const DataTemplate = ({ apiBase, defaultLocale, debug, objectName }) =>
  html`
    <gdwc-store
      apiBase=${apiBase}
      defaultLocale=${defaultLocale}
      ?debug=${debug}
    >
      <gdwc-provider
        objectName=${objectName}
        id="616d69df-e9a1-41e9-ac4f-4d5d649f40d4"
        include="field_media_image.field_media_image"
        query=${`{
          headline: title
          field_media_image {
            field_media_image {
              uri {
                url
              }
            }
          }
          field_summary {
            processed
          }
        }`}
        debug="true"
      >
        <template>
          <gdwc-card
            headline="{{ headline }}"
            imgSrc="https://dev-ds-demo.pantheonsite.io/{{ field_media_image.field_media_image.uri.url }}"
          >
            {{ field_summary.processed }}
          </gdwc-card>
        </template>
      </gdwc-provider>
    </gdwc-store>
  `;

export const Primary = Template.bind({});
Primary.args = {
  imgSrc: 'https://placeimg.com/640/480/nature',
  headline: 'Example Headline',
  body:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  linkHref: 'https://www.google.com',
};

export const WithData = DataTemplate.bind({});
WithData.args = {
  apiBase: 'https://dev-ds-demo.pantheonsite.io',
  defaultLocale: 'en',
  debug: true,
  objectName: 'node--recipe',
};
