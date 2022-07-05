import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import { controls, themeControls } from '../stories/fixtures/controls.js';

import '../heading.js';
import '../store.js';
import '../provider.js';
import '../stories/components/gdwc-theme.js';

export default {
  title: 'Elements/Heading',
  component: 'Heading',
  description: 'A simple heading component',
  parameters: {
    docs: {
      description: {
        component: 'A generic heading',
      },
    },
  },
  argTypes: {
    defaultSlot: {
      table: {
        category: 'slots',
      },
    },
    size: {
      options: controls.sizes.options,
      control: controls.sizes.control,
      description: controls.sizes.description,
      table: {
        category: 'properties',
      },
    },
    level: {
      options: controls.headingLevels.options,
      control: controls.headingLevels.control,
      description: controls.headingLevels.description,
      table: {
        category: 'properties',
      },
    },
    ...themeControls,
    gdwcText2: {
      table: {
        category: 'unused',
      },
      control: { disable: true },
    },
    gdwcFontLineheight: {
      table: {
        category: 'unused',
      },
      control: { disable: true },
    },
  },
};

const Template = args => {
  const { size, defaultSlot, level } = args;

  return html` <gdwc-theme args=${JSON.stringify(args)}>
    <gdwc-heading size=${ifDefined(size)} level=${ifDefined(level)}
      >${defaultSlot}</gdwc-heading
    >
  </gdwc-theme>`;
};

export const Primary = Template.bind({});

Primary.args = {
  defaultSlot: 'My Custom Heading',
};
