import { html } from 'lit';

import { themeControls } from './fixtures/controls.js';

import '../card.js';
import '../container.js';
import '../heading.js';
import '../image.js';
import '../menu.js';
import '../provider.js';
import '../store.js';
import './components/gdwc-theme.js';

export default {
  title: 'Templates/Homepage',
  component: 'Homepage',
  description:
    'A layout containing various elements from the Umami Demo homepage',
  parameters: {
    docs: {
      description: {
        component:
          'A layout containing various elements from the Umami Demo homepage',
      },
    },
  },
  argTypes: {
    ...themeControls,
  },
};

const accountMenu = html`<gdwc-menu
  baseUrl="https://dev-ds-demo.pantheonsite.io"
  menuId="account"
  theme="horizontal"
></gdwc-menu>`;

// TODO: Research possibility to get lang links.
const languageMenu = html`<ul>
  <li><a href="#" class="active">English</a></li>
  <li><a href="#">Español</a></li>
</ul>`;

const mainMenu = html`<gdwc-menu
  baseUrl="https://dev-ds-demo.pantheonsite.io"
  menuId="main"
  theme="horizontal"
></gdwc-menu>`;

const banner = html`<gdwc-store apiBase="https://dev-ds-demo.pantheonsite.io/">
  <gdwc-provider
    objectName="block_content--banner_block"
    id="9aadf4a1-ded6-4017-a10d-a5e043396edf"
    params="include=field_media_image.field_media_image"
  >
    <template>
      <style>
        @media (min-width: 1024px) {
          gdwc-card {
            --gdwc-text-1: var(--gray-0);
            --gdwc-text-2: var(--gray-0);
          }

          gdwc-card::part(card) {
            display: grid;
            align-items: center;
          }
          gdwc-card::part(image) {
            grid-column: 1;
            grid-row: 1;
          }

          gdwc-card::part(body) {
            grid-column: 1;
            grid-row: 1;
            background: #0000006b;
            padding: 1.777em;
            margin-left: 120px;
            max-width: 500px;
          }
        }
      </style>
      <gdwc-card
        headline="{{field_title}}"
        body="{{field_summary}}"
        imgSrc="https://dev-ds-demo.pantheonsite.io/{{ field_media_image.field_media_image.uri.url }}"
        linkHref="{{field_content_link.uri}}"
      ></gdwc-card>
    </template>
  </gdwc-provider>
</gdwc-store>`;

const Template = args => html` <gdwc-theme args=${JSON.stringify(args)}>
  <style>
    :root {
      --gdwc-padding: 0 var(--size-8);
    }
    header {
      padding-bottom: var(--size-3);
    }
    .header-flex {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
    }
    header ul {
      margin: 0;
      padding: 0;
      display: inline-flex;
      list-style: none;
    }
    header ul li {
      padding: var(--size-2);
    }
    header ul li:first-child {
      padding-left: 0;
    }
    header ul li:last-child {
      padding-right: 0;
    }
    header gdwc-menu {
      flex: 1;
    }
    .active {
      font-weight: var(--font-weight-7);
    }
    .main-content {
      --gdwc-surface-1: var(--orange-0);
      --gdwc-text-1: var(--gray-7);
      padding: var(--size-5) var(--size-8);
    }
    .main-content gdwc-store {
      display: grid;
      grid-gap: var(--size-5);
      --gdwc-surface-1: var(--gray-0);
      --gdwc-padding: var(--size-3);
    }

    @media (min-width: 1024px) {
      .main-content gdwc-store {
        grid-template-columns: 2fr 1fr 1fr;
      }
    }
    .main-content > * {
      --gdwc-padding: 0;
    }
  </style>
  <gdwc-container>
    <header>
      <div class="header-flex">${languageMenu} ${accountMenu}</div>
      <hr />
      <div class="header-flex">
        <img
          src="https://dev-ds-demo.pantheonsite.io/core/profiles/demo_umami/themes/umami/logo.svg"
          alt="Umami Logo"
        />
        ${mainMenu}
      </div>
    </header>
  </gdwc-container>
  ${banner}
  <gdwc-container class="main-content">
    <gdwc-store apiBase="https://dev-ds-demo.pantheonsite.io/">
      <gdwc-provider
        objectName="node--article"
        id="5d091b54-417c-47c6-9146-35df80d6bb6e"
        params="include=field_media_image.field_media_image"
      >
        <template>
          <gdwc-card
            headline="{{ title }}"
            imgSrc="https://dev-ds-demo.pantheonsite.io/{{ field_media_image.field_media_image.uri.url }}"
          ></gdwc-card>
        </template>
      </gdwc-provider>
      <gdwc-provider
        objectName="node--recipe"
        id="da1359f4-2e60-462c-8909-47c3bce11fdf"
        params="include=field_media_image.field_media_image"
      >
        <template>
          <gdwc-card
            headline="{{ title }}"
            imgSrc="https://dev-ds-demo.pantheonsite.io/{{ field_media_image.field_media_image.uri.url }}"
          ></gdwc-card>
        </template>
      </gdwc-provider>
      <gdwc-provider
        objectName="node--recipe"
        id="50c3e7c9-64a9-453c-9289-278132beb4a2"
        params="include=field_media_image.field_media_image"
      >
        <template>
          <gdwc-card
            headline="{{ title }}"
            imgSrc="https://dev-ds-demo.pantheonsite.io/{{ field_media_image.field_media_image.uri.url }}"
          ></gdwc-card>
        </template>
      </gdwc-provider>
    </gdwc-store>
  </gdwc-container>
  <div><gdwc-heading>Content Bottom</gdwc-heading></div>
  <div><gdwc-heading>Footer</gdwc-heading></div>
  <div><gdwc-heading>Post Footer</gdwc-heading></div>
</gdwc-theme>`;

export const Primary = Template.bind({});
