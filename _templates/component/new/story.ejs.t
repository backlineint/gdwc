---
to: gdwc-<%= elementName %>/gdwc-<%= elementName %>.stories.js
---
<%
  className = 'Gdwc' + h.changeCase.pascal(elementName);
  gdwcElementName = 'gdwc-' + elementName;
  title = h.changeCase.title(elementName);
%>
import { html } from 'lit';

import { themeControls } from '../stories/fixtures/controls.js';

import '../<%= elementName %>.js';
import '../stories/components/gdwc-theme.js';

export default {
  title: 'Components/<%= title %>',
  component: '<%= title %>',
  description: '<%= description %>',
  parameters: {
    docs: {
      description: {
        component: '<%= description %>',
      },
    },
  },
  argTypes: {
    example: {
      table: {
        category: 'properties',
      },
    },
    ...themeControls,
    // It is possible to disable a theme control using the following:
    // gdwcShadow: {
    //   control: { disable: true },
    // },
  },
};

const Template = args => {
  const { example } = args;
  return html` <gdwc-theme args=${JSON.stringify(args)}>
      <<%= gdwcElementName %> example=${example}></<%= gdwcElementName %>>
    </gdwc-theme>`;
};

export const Primary = Template.bind({});
Primary.args = {
  example: 'Example prop',
};
