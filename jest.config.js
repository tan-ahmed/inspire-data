module.exports = {
  testEnvironment: "node",
  collectCoverageFrom: ["util.js", "scraper.js", "mosque-urls.js"],
  testMatch: ["**/tests/**/*.test.js"],
  // Suppress console.log during tests
  silent: false,
  verbose: true,
};
