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

const Template = ({ apiRoot, debug }) =>
  html`<p>See console for debug output</p>
    <gdwc-client apiRoot=${apiRoot} ?debug=${debug}></gdwc-client>`;

export const Primary = Template.bind({});
Primary.args = {
  apiRoot: 'https://live-contentacms.pantheonsite.io/api',
  debug: true,
};
