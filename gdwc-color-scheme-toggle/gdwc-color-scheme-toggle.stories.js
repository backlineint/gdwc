import { html } from 'lit';

import { controls } from '../stories/fixtures/controls.js';

import '../color-scheme-toggle.js';
import '../stories/components/gdwc-theme.js';

export default {
  title: 'Components/Color Scheme Toggle',
  component: 'Color Scheme Toggle',
  description: 'An icon button that toggles between light and dark mode',
  parameters: {
    docs: {
      description: {
        component: 'An icon button that toggles between light and dark mode',
      },
    },
  },
  argTypes: {
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
  const { gdwcIconColor, gdwcIconFontSize } = args;
  return html` <style>
      gdwc-color-scheme-toggle {
        --gdwc-icon-color: var(${gdwcIconColor});
        --gdwc-icon-font-size: var(${gdwcIconFontSize});
      }
    </style>
    <gdwc-theme args=${JSON.stringify(args)}>
      <gdwc-color-scheme-toggle></gdwc-color-scheme-toggle>
      <h1>A Heading</h1>
      <p>And some body text to demonstrate the theme cascade.</p>
    </gdwc-theme>`;
};

export const Primary = Template.bind({});
