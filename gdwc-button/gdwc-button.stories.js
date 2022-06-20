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
    defaultSlot: {
      description: 'Default slot',
      table: {
        category: 'slots',
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
    primary: {
      description: 'If button uses primary variant',
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
    gdwcLink: {
      table: {
        category: 'unused',
      },
      control: { disable: true },
    },
    gdwcLinkVisited: {
      table: {
        category: 'unused',
      },
      control: { disable: true },
    },
    gdwcSurface1: {
      table: {
        category: 'unused',
      },
      control: { disable: true },
    },
    gdwcShadow: {
      table: {
        category: 'unused',
      },
      control: { disable: true },
    },
  },
};

const Template = args => {
  const { defaultSlot, type, disabled, primary } = args;
  return html` <gdwc-theme args=${JSON.stringify(args)}>
    <gdwc-button ?primary=${primary} type=${type} ?disabled=${disabled}
      >${defaultSlot}</gdwc-button
    >
  </gdwc-theme>`;
};

export const Primary = Template.bind({});
Primary.args = {
  defaultSlot: 'button text',
  type: 'button',
  disabled: false,
  primary: true,
};

export const Secondary = Template.bind({});
Secondary.args = {
  ...Primary.args,
  primary: false,
};
