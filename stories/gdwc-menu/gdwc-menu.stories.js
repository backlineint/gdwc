import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined';

import '../../menu.js';
import './gdwc-menu-extended.js';

const pureTree = JSON.stringify([
  {
    link: {
      href: '/',
      attributes: {
        title: 'Who',
      },
    },
  },
  {
    link: {
      href: '/needs',
      attributes: {
        title: 'Needs',
      },
    },
  },
  {
    link: {
      attributes: {
        title: 'An',
      },
    },
    children: [
      {
        link: {
          href: '/api',
          attributes: {
            title: 'API',
          },
        },
      },
    ],
  },
]);

export default {
  title: 'Components/Menu',
  component: 'Menu',
  description: 'Top line description',
  parameters: {
    docs: {
      description: {
        component:
          'A generic menu. Use with baseUrl and menuId to source data from a menu endpoint provided by the [Decoupled Menus Module](https://www.drupal.org/project/decoupled_menus). Or provide your own [menu tree in a linkset format](https://www.npmjs.com/package/linkset-menu).',
      },
    },
  },
  argTypes: {
    branding: {
      description: 'Branding heading for the menu',
      table: {
        category: 'properties',
        type: { summary: 'string' },
      },
    },
    baseUrl: {
      description: 'Base URL of menu endpoint. Optional.',
      table: {
        category: 'properties',
        type: { summary: 'string' },
      },
    },
    menuId: {
      description: 'Machine name of menu used for menu endpoint. Optional.',
      table: {
        category: 'properties',
        type: { summary: 'string' },
      },
    },
    tree: {
      description:
        'An array of objects containing data for the menu tree. Optional. Set automatically when baseUrl and menuId is provided. Passed manually when baseUrl and menuId are not.',
      table: {
        category: 'properties',
        type: { summary: 'object', detail: `${pureTree}` },
      },
      control: {
        type: 'object',
      },
    },
    theme: {
      description:
        'Theme used to trigger alternate menu presentation. Optional.',
      table: {
        category: 'properties',
        type: { summary: 'string' },
      },
      control: { type: 'select', options: ['horizontal', 'unstyled'] },
    },
    isLoading: {
      description: 'Loading state',
      table: {
        category: 'properties',
        type: { summary: 'boolean' },
      },
    },
    id: {
      table: {
        disable: true,
      },
    },
    'menu-level': {
      description:
        'Stylable part for menu level. Example selector: gdwc-menu::part(menu-level) {}',
      table: {
        category: 'shadow parts',
      },
    },
    'menu-item': {
      description:
        'Stylable part for menu item. Example selector: gdwc-menu::part(menu-item) {}',
      table: {
        category: 'shadow parts',
      },
    },
    background: {
      description:
        'Background color. Currently used by horizontal theme. Consuming applications can override with: gdwc-menu { --background: red; }',
      table: {
        category: 'css variables',
      },
    },
    brand: {
      description: 'Slot that can be used to override site branding.',
      table: {
        category: 'slots',
      },
    },
    loading: {
      description: 'Slot that can be used to override loading message.',
      table: {
        category: 'slots',
      },
    },
  },
};

const Template = ({ branding, baseUrl, menuId, tree, theme, id, slot }) => html`
  <style>
    #slotted h1 {
      display: inline;
      padding: 0.5rem;
      background-color: hotpink;
      border: 5px solid black;
      font-family: 'Courier';
    }
    gdwc-menu#parts::part(menu-level) {
      border: 5px dotted red;
      background: hotpink;
    }
    gdwc-menu#parts::part(menu-item) {
      font-size: 20px;
      list-style: none;
      background: aliceblue;
    }
  </style>
  <gdwc-menu
    branding=${branding}
    id=${ifDefined(id)}
    baseurl=${ifDefined(baseUrl)}
    menuId=${ifDefined(menuId)}
    tree=${ifDefined(tree)}
    theme=${ifDefined(theme)}
  >
    ${slot ? html`<h1 slot="brand">👾👾👾 Brand Slot 👾👾👾</h1>` : ''}
    ${slot ? html`<div slot="loading">⏳⏳⏳ Loading... ⏳⏳⏳</div>` : ''}
  </gdwc-menu>
`;

const TemplateExtended = ({ branding, baseUrl, menuId }) => html`
  <gdwc-menu-extended
    branding=${branding}
    baseurl=${ifDefined(baseUrl)}
    menuId=${ifDefined(menuId)}
  ></gdwc-menu-extended>
`;

export const Primary = Template.bind({});
Primary.args = {
  branding: 'API Driven Menu',
  baseUrl: 'https://decoupled-menus.jsonapi.dev',
  menuId: 'main',
  theme: '',
};

export const DrupalWiki = Template.bind({});
DrupalWiki.args = {
  ...Primary.args,
  branding: 'Wiki Menu',
  menuId: 'drupal-wiki',
};

export const Pure = Template.bind({});
Pure.args = {
  branding: 'Pure Menu',
  tree: pureTree,
};

export const AccountMenu = Template.bind({});
AccountMenu.args = {
  ...Primary.args,
  branding: 'Account Menu',
  menuId: 'account',
};

export const ThemeHorizontal = Template.bind({});
ThemeHorizontal.args = {
  ...Primary.args,
  theme: 'horizontal',
};

export const ThemeUnstyled = Template.bind({});
ThemeUnstyled.args = {
  ...Primary.args,
  theme: 'unstyled',
};

export const StyledByShadowParts = Template.bind({});
StyledByShadowParts.args = {
  ...Primary.args,
  id: 'parts',
};

export const SlotOverride = Template.bind({});
SlotOverride.args = {
  ...Primary.args,
  id: 'slotted',
  slot: true,
};

export const ClassExtendOverride = TemplateExtended.bind({});
ClassExtendOverride.args = {
  ...Primary.args,
  branding: 'gdwc-menu-extended',
};
