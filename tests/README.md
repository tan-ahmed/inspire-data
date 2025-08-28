# Test Suite

This directory contains the test suite for the Inspire Prayer Scraper project.

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (re-runs on file changes)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Test Files

### `simple.test.js`

- Basic validation of project configuration
- Data structure validation
- Utility function exports
- Package.json structure validation

### `mosque-urls.test.js`

- Validates mosque URL configuration structure
- Checks for unique slugs and valid URL formats
- Ensures naming conventions are followed

### `integration.test.js`

- Tests with real data files
- Validates Jummah schedule generation
- Checks data consistency between config and actual files
- Validates data file JSON structure

## Test Coverage

The tests cover:

- ✅ Configuration validation (mosque-urls.js)
- ✅ Data file structure validation
- ✅ Utility function basic functionality
- ✅ Index generation with real data
- ✅ Jummah schedule structure validation
- ✅ Error handling for missing/malformed data

## Test Strategy

The test suite focuses on:

1. **Configuration Tests**: Ensure mosque configuration is valid and complete
2. **Data Validation**: Verify scraped data has correct structure
3. **Integration Tests**: Test with real project data
4. **Functionality Tests**: Validate core utility functions work correctly

## Notes

- Tests are designed to work with existing project data
- Tests gracefully handle missing data directories/files
- Console logging is preserved for debugging integration tests
- Tests validate both single and multiple Jummah time scenarios
