import { html } from 'lit';

import { themeControls } from './fixtures/controls.js';

import '../button.js';
import '../card.js';
import './components/gdwc-theme.js';

export default {
  title: 'Templates/Kitchen Sink',
  component: 'Kitchen Sink',
  description: 'Various components for testing css variable cascade.',
  parameters: {
    docs: {
      description: {
        component: 'Various components for testing css variable cascade.',
      },
    },
  },
  argTypes: {
    ...themeControls,
  },
};

const Template = args => html` <gdwc-theme args=${JSON.stringify(args)}>
  <gdwc-card headline="This is a card"
    ><p>
      This is card body<gdwc-button type="button" primary="true"
        >A Button!</gdwc-button
      >
    </p></gdwc-card
  >
  <gdwc-button type="button">A Button!</gdwc-button>
</gdwc-theme>`;

export const Primary = Template.bind({});
