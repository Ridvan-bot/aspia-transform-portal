import { defineConfig } from "cypress";

export default defineConfig({
  viewportWidth: 1280,
  viewportHeight: 720,

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
    },
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/integration/**/*.spec.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:8080',
  },
});