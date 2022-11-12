import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import { controls } from '../stories/fixtures/controls.js';

import '../icon-button.js';
import '../stories/components/gdwc-theme.js';

export default {
  title: 'Elements/Icon Button',
  component: 'Icon Button',
  description: 'An icon that can act as a button and handle onclick events',
  parameters: {
    docs: {
      description: {
        component: 'An icon that can act as a button and handle onclick events',
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
    href: {
      description: 'Use the href attribute to convert the button to a link.',
      table: {
        category: 'properties',
      },
    },
    disabled: {
      description: 'Display the button as disabled',
      control: 'boolean',
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
  const { name, gdwcIconColor, gdwcIconFontSize, href, disabled } = args;
  return html` <style>
      gdwc-icon-button {
        --gdwc-icon-color: var(${gdwcIconColor});
        --gdwc-icon-font-size: var(${gdwcIconFontSize});
      }
    </style>
    <gdwc-theme args=${JSON.stringify(args)}>
      <gdwc-icon-button name=${name} href=${ifDefined(
    href
  )} disabled=${ifDefined(disabled)}></gdwc-icon>
    </gdwc-theme>`;
};

export const Primary = Template.bind({});
Primary.args = {
  name: 'emoji-sunglasses-fill',
  gdwcIconFontSize: '--size-8',
};

export const LinkButton = Template.bind({});
LinkButton.args = {
  ...Primary.args,
  href: 'https://drupal.org',
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Primary.args,
  disabled: 'true',
};
