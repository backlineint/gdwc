import { html } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';

import "../menu";

const tree = JSON.stringify([
  {
    "link": {
      "href": "/",
      "attributes": {
        "title": "Who",
      }
    },
  },
  {
    "link": {
      "href": "/needs",
      "attributes": {
        "title": "Needs",
      }
    },
  },
  {
    "link": {
      "attributes": {
        "title": "An",
      }
    },
    "children": [
      {
        "link": {
          "href": "/api",
          "attributes": {
            "title": "API",
          }
        },
      },
    ]
  },
]);

export default {
  title: 'Components/Menu',
  component: 'Menu',
  description: 'Top line description',
  parameters: {
    docs: {
      description: {
        component: 'A generic menu. Use with baseUrl and menuId to source data from a menu endpoint provided by the [Decoupled Menus Module](https://www.drupal.org/project/decoupled_menus). Or provide your own [menu tree in a linkset format](https://www.npmjs.com/package/linkset-menu).',
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
      description: 'An array of objects containing data for the menu tree. Optional. Set automatically when baseUrl and menuId is provided. Passed manually when baseUrl and menuId are not.',
      table: {
        category: 'properties',
        type: { summary: 'object', detail: `${tree}` },
      },
      control: {
        type: 'object',
      }
    },
  }
};

const Template = ({ branding, baseUrl, menuId, tree }) => {
  return html`
    <gdwc-menu 
      branding=${branding} 
      baseurl=${ifDefined(baseUrl)} 
      menuId=${ifDefined(menuId)} 
      tree=${ifDefined(tree)}
    >
    </gdwc-menu>
  `
}

export const Primary = Template.bind({});
Primary.args = {
  branding: "API Driven Menu",
  baseUrl: 'https://decoupled-menus.jsonapi.dev',
  menuId: 'main'
};

export const Pure = Template.bind({});
Pure.args = {
  branding: "Pure Menu",
  tree: tree
};

export const AccountMenu = Template.bind({});
AccountMenu.args = {
  ...Primary.args,
  branding: 'Account Menu',
  menuId: 'account',
};

