// No automatic webServer: run only against an explicitly approved AWS host.
const {defineConfig} = require('@playwright/test');
module.exports = defineConfig({
  testDir: __dirname,
  testMatch: '**/*.spec.mjs',
  timeout: 60000,
  expect: {timeout: 15000},
  workers: 1,
  retries: 0,
  forbidOnly: true,
  reporter: [['list'],['json',{outputFile:'evidence/security-results.json'}]],
  outputDir: 'evidence/playwright',
  use: {
    baseURL: process.env.CAS_TEST_BASE_URL || 'http://127.0.0.1:4173',
    browserName: 'chromium',
    viewport: {width:1440,height:900},
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure'
  }
});
