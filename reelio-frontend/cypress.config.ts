import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'https://reelio-staging-ajekckccfabmg8ht.northeurope-01.azurewebsites.net',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
