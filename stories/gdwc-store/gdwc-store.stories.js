import { html } from 'lit';

import '../../store.js';

export default {
  title: 'Data/Store (Experimental)',
  component: 'Store',
  description: 'Store element that provides an instance of Drupal State',
  parameters: {
    docs: {
      description: {
        component: 'Store element that provides an instance of Drupal State.',
      },
    },
  },
};

const Template = ({ apiBase, apiPrefix, debug }) =>
  html`<p>See console for debug output</p>
    <gdwc-store
      apiBase=${apiBase}
      apiPrefix=${apiPrefix}
      ?debug=${debug}
    ></gdwc-store>`;

export const Primary = Template.bind({});
Primary.args = {
  apiBase: 'https://live-contentacms.pantheonsite.io',
  apiPrefix: 'api',
  debug: true,
};
