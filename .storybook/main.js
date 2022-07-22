module.exports = {
  stories: [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
    '../**/gdwc*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  core: {
    builder: '@storybook/builder-vite',
  },
  framework: '@storybook/web-components',
  // Fix for iFrame path issues from https://github.com/storybookjs/storybook/discussions/17433
  async viteFinal(config) {
    config.base = process.env.BASE_URL || config.base;

    // return the customized config
    return config;
  },
};
