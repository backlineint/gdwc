import { html } from 'lit';

import '../../client.js';
import '../../query.js';

export default {
  title: 'Data/Query (Experimental)',
  component: 'Query',
  description:
    'Query element that adds data to a parent instance of Drupal State.',
  parameters: {
    docs: {
      description: {
        component:
          'Query element that adds data to a parent instance of Drupal State.',
      },
    },
  },
};

const Template = ({ apiBase, apiPrefix, debug, objectName }) =>
  html`<p>See console for debug output</p>
    <gdwc-client apiBase=${apiBase} apiPrefix=${apiPrefix} ?debug=${debug}>
      <gdwc-query objectName="pages"></gdwc-query>
      <p>Not GDWC</p>
      <gdwc-query
        objectName=${objectName}
        query=${`{ instructionsAlias: instructions }`}
      ></gdwc-query>
    </gdwc-client>`;

export const Primary = Template.bind({});
Primary.args = {
  apiBase: 'https://live-contentacms.pantheonsite.io',
  apiPrefix: 'api',
  debug: true,
  objectName: 'recipes',
};
