import type { StorybookConfig } from "@storybook/sveltekit";

const config: StorybookConfig = {
  core: {
    disableTelemetry: true,
  },
  stories: ["../src/**/*.stories.@(js|ts|svelte)"],
  addons: ["@storybook/addon-svelte-csf"],
  framework: "@storybook/sveltekit",
  async viteFinal(config) {
    config.server = config.server || {};
    config.server.host = process.env.AUNTY_HOST || "localhost";
    config.server.allowedHosts = [process.env.AUNTY_HOST || "localhost"];
    return config;
  },
};
export default config;
