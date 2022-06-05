import { html } from 'lit';

import { themeControls } from '../stories/fixtures/controls.js';

import '../button.js';
import '../stories/components/gdwc-theme.js';

export default {
  title: 'Elements/Button',
  component: 'Button',
  description: 'Button that can also be treated as a link.',
  parameters: {
    docs: {
      description: {
        component: 'Button that can also be treated as a link.',
      },
    },
  },
  argTypes: {
    text: {
      description: 'Button text',
      table: {
        category: 'properties',
      },
    },
    type: {
      options: ['button', 'submit', 'reset', 'menu'],
      control: { type: 'select' },
      description: 'Button types',
      table: {
        defaultValue: 'button',
        category: 'properties',
      },
    },
    disabled: {
      description: 'If button is disabled',
      control: 'boolean',
      table: {
        category: 'properties',
      },
    },
    ...themeControls,
    gdwcText1: {
      table: {
        category: 'unused',
      },
      control: { disable: true },
    },
    gdwcBorder: {
      table: {
        category: 'unused',
      },
      control: { disable: true },
    },
  },
};

const Template = args => {
  const { text, type, disabled } = args;
  return html` <gdwc-theme args=${JSON.stringify(args)}>
    <gdwc-button type=${type} ?disabled=${disabled}>${text}</gdwc-button>
  </gdwc-theme>`;
};

export const Primary = Template.bind({});
Primary.args = {
  text: 'button text',
  type: 'button',
  disabled: false,
};
