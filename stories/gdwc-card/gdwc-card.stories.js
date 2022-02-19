import { html } from 'lit';

import '../../card.js';
import '../../client.js';
import '../../query.js';

export default {
  title: 'Components/Card',
  component: 'Card',
  description: 'A simple card component',
  parameters: {
    docs: {
      description: {
        component: 'A generic card.',
      },
    },
  },
};

const Template = ({ imgSrc, headline, body, linkHref }) =>
  html`<gdwc-card
    imgSrc=${imgSrc}
    headline=${headline}
    body=${body}
    linkHref=${linkHref}
  ></gdwc-card>`;

// TODO - Provide a list of recipe IDs to swap between in storybook.
// TODO - Various improvements to how set and dispatch methods are handled.

const DataTemplate = () =>
  html`
    <gdwc-client
      apiBase="https://live-contentacms.pantheonsite.io"
      apiPrefix="api"
      debug="true"
    >
      <gdwc-query
        objectName="recipes"
        include="image,image.thumbnail"
        query=${`{
            body: instructions
            headline: title
            id
            path {
              linkHref: alias
            }
            image {
              thumbnail {
                imageSrc: url
              }
            }
          }`}
      >
        <gdwc-card id="a542e833-edfe-44a3-a6f1-7358b115af4b"></gdwc-card>
      </gdwc-query>
    </gdwc-client>
  `;

export const Primary = Template.bind({});
Primary.args = {
  imgSrc: 'https://placeimg.com/640/480/nature',
  headline: 'Example Headline',
  body:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  linkHref: 'https://www.google.com',
};

export const WithData = DataTemplate.bind({});
