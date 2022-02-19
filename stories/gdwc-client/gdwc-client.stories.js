import { html } from 'lit';

import '../../client.js';

export default {
  title: 'Data/Client (Experimental)',
  component: 'Client',
  description: 'Client element that provides an instance of Drupal State',
  parameters: {
    docs: {
      description: {
        component: 'Client element that provides an instance of Drupal State.',
      },
    },
  },
};

const Template = ({ apiBase, apiPrefix, debug }) =>
  html`<p>See console for debug output</p>
    <gdwc-client
      apiBase=${apiBase}
      apiPrefix=${apiPrefix}
      ?debug=${debug}
    ></gdwc-client>`;

export const Primary = Template.bind({});
Primary.args = {
  apiBase: 'https://live-contentacms.pantheonsite.io',
  apiPrefix: 'api',
  debug: true,
};
