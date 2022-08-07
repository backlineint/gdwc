import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import { controls, themeControls } from '../stories/fixtures/controls.js';

import '../image.js';
import '../store.js';
import '../provider.js';
import '../stories/components/gdwc-theme.js';

import imageWithData from '../stories/fixtures/data/image/imageFileData.json';

export default {
  title: 'Elements/Image',
  component: 'Image',
  description: 'A simple Image component',
  parameters: {
    docs: {
      description: {
        component: 'A generic Image',
      },
    },
  },
  argTypes: {
    defaultSlot: {
      table: {
        category: 'slots',
      },
    },
    src: {
      table: {
        category: 'properties',
      },
    },
    alt: {
      table: {
        category: 'properties',
      },
    },
    aspectRatio: {
      options: controls.aspectRatio.options,
      control: controls.aspectRatio.control,
      description: controls.aspectRatio.description,
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
  },
};

const Template = args => {
  const { defaultSlot, alt, src, aspectRatio, data } = args;

  return html` <gdwc-theme args=${JSON.stringify(args)}>
    <gdwc-image
      src=${ifDefined(src)}
      alt=${ifDefined(alt)}
      aspect-ratio=${ifDefined(aspectRatio)}
      data=${ifDefined(JSON.stringify(data))}
      >${defaultSlot}</gdwc-image
    >
  </gdwc-theme>`;
};

export const Primary = Template.bind({});
Primary.args = {
  src: 'https://images.unsplash.com/photo-1563738068154-8d2e9f19ed62?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmVhY2glMjBzdW5yaXNlfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
  alt: 'Sunrise image',
};

export const ImageWithData = Template.bind({});
ImageWithData.args = {
  data: imageWithData,
};

export const DefaultSlotImage = Template.bind({});

DefaultSlotImage.args = {
  defaultSlot: html`<img
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/The_Great_Wall_of_China_at_Jinshanling-edit.jpg/1200px-The_Great_Wall_of_China_at_Jinshanling-edit.jpg"
    alt="Defaultimg"
  />`,
};
