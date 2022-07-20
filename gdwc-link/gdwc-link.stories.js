import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import { controls, themeControls } from '../stories/fixtures/controls.js';
import internalLink from '../stories/fixtures/data/link/internalLink.json';
import entityLink from '../stories/fixtures/data/link/entityLink.json';
import externalLink from '../stories/fixtures/data/link/externalLink.json';

import '../link.js';
import '../store.js';
import '../provider.js';
import '../stories/components/gdwc-theme.js';

export default {
  title: 'Elements/Link',
  component: 'Link',
  description: 'A simple Link component',
  parameters: {
    docs: {
      description: {
        component: 'A generic link',
      },
    },
  },
  argTypes: {
    defaultSlot: {
      table: {
        category: 'slots',
      },
    },
    href: {
      table: {
        category: 'properties',
      },
    },
    title: {
      table: {
        category: 'properties',
      },
    },
    rel: {
      options: controls.rel.options,
      control: controls.rel.control,
      description: controls.rel.description,
      table: {
        category: 'properties',
      },
    },
    target: {
      options: controls.target.options,
      control: controls.target.control,
      description: controls.target.description,
      table: {
        category: 'properties',
      },
    },
    data: {
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
    gdwcText2: {
      table: {
        category: 'unused',
      },
      control: { disable: true },
    },
  },
};

const Template = args => {
  const { defaultSlot, href, rel, target, data, title } = args;

  return html` <gdwc-theme args=${JSON.stringify(args)}>
    <gdwc-link
      href=${ifDefined(href)}
      rel=${ifDefined(rel)}
      target=${ifDefined(target)}
      title="${ifDefined(JSON.stringify(title))}"
      data=${ifDefined(JSON.stringify(data))}
      >${defaultSlot}</gdwc-link
    >
  </gdwc-theme>`;
};

export const Primary = Template.bind({});
Primary.args = {
  defaultSlot: 'My Link',
  href: 'http://example.com/landing-page',
  title: 'landing-page',
};

export const WithData = Template.bind({});
WithData.args = {
  defaultSlot: 'My Link',
  data: internalLink,
};

export const EntityLink = Template.bind({});
EntityLink.args = {
  defaultSlot: 'My Link',
  data: entityLink,
};

export const ExternalLink = Template.bind({});
ExternalLink.args = {
  defaultSlot: 'My Link',
  data: externalLink,
};
