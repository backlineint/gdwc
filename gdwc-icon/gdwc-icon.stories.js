import { html } from 'lit';

import { controls } from '../stories/fixtures/controls.js';

import '../icon.js';
import '../stories/components/gdwc-theme.js';

export default {
  title: 'Elements/Icon',
  component: 'Icon',
  description: 'Icon symbols based on the Shoelace icon component',
  parameters: {
    docs: {
      description: {
        component: 'Icon symbols based on the Shoelace icon component',
      },
    },
  },
  argTypes: {
    name: {
      description:
        'Any valid bootstrap icon value https://icons.getbootstrap.com/',
      table: {
        category: 'properties',
      },
    },
    gdwcText1: controls.colors,
    gdwcIconColor: {
      description: 'Icon color. Falls back to --gdwc-text-1 if not set.',
      options: controls.colors.options,
      control: controls.colors.control,
      table: {
        category: 'css variables',
      },
    },
    gdwcIconFontSize: {
      description: 'Font size of icon',
      options: controls.sizes.options,
      control: controls.sizes.control,
      table: {
        category: 'css variables',
      },
    },
  },
};

const Template = args => {
  const { name, gdwcIconColor, gdwcIconFontSize } = args;
  return html` <style>
      gdwc-icon {
        --gdwc-icon-color: var(${gdwcIconColor});
        --gdwc-icon-font-size: var(${gdwcIconFontSize});
      }
    </style>
    <gdwc-theme args=${JSON.stringify(args)}>
      <gdwc-icon name=${name}></gdwc-icon>
    </gdwc-theme>`;
};

export const Primary = Template.bind({});
Primary.args = {
  name: 'emoji-sunglasses',
  gdwcIconFontSize: '--size-8',
};
