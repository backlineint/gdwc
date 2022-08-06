import { html } from 'lit';

import { themeControls } from '../stories/fixtures/controls.js';

import '../container.js';
import '../stories/components/gdwc-theme.js';

export default {
  title: 'Layout/Container',
  component: 'Container',
  description:
    'Container element that provides access to open props theme controls',
  parameters: {
    docs: {
      description: {
        component:
          'Container element that provides access to open props theme controls',
      },
    },
  },
  argTypes: {
    defaultSlot: {
      table: {
        category: 'slots',
      },
    },
    ...themeControls,
  },
};

const Template = args => {
  const { defaultSlot } = args;
  return html` <gdwc-theme args=${JSON.stringify(args)}>
    <gdwc-container>${defaultSlot}</gdwc-container>
  </gdwc-theme>`;
};

export const Primary = Template.bind({});
Primary.args = {
  defaultSlot: html`<p>Slotted Content</p>`,
};
