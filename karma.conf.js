// Karma configuration — supplements Angular's generated config.
// Defines ChromeHeadlessNoSandbox for use in CI environments.
module.exports = function (config) {
  config.set({
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-dev-shm-usage']
      }
    }
  });
};
