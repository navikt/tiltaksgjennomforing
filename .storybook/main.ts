import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: ['@storybook/addon-essentials'],
    framework: '@storybook/react-vite',
    docs: {
        autodocs: 'tag',
    },
};
export default config;
