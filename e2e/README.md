# End-to-End Testing Guide

This directory contains end-to-end (E2E) tests for the Discover Sevilla application using [Playwright](https://playwright.dev/).

## Overview

The E2E tests ensure that critical user flows work correctly across different browsers and devices. They cover:

- **Navigation**: Page loading and basic navigation
- **Site Browsing**: Viewing site cards and their details
- **Filter Interactions**: Using filter buttons to show/hide sites
- **Visit Tracking**: Marking sites as visited/unvisited and tracking progress
- **Visual Regression**: Detecting unexpected visual changes

## Test Structure

```
e2e/
├── navigation.spec.ts          # Page load and navigation tests
├── site-browsing.spec.ts       # Site card display and content tests
├── filters.spec.ts             # Filter button functionality tests
├── visit-tracking.spec.ts      # Visit marking and progress tracking tests
└── visual-regression.spec.ts   # Visual regression testing
```

## Running Tests

### Prerequisites

Ensure dependencies are installed:

```bash
npm install
```

Install Playwright browsers (first time only):

```bash
npx playwright install
```

### Run All Tests

```bash
npm test
```

### Run Tests in UI Mode (Interactive)

```bash
npm run test:ui
```

This opens the Playwright Test UI where you can:
- See all tests
- Run specific tests
- Watch tests run in real-time
- Debug failed tests

### Run Tests in a Specific Browser

```bash
npx playwright test --project=chromium  # Chrome
npx playwright test --project=firefox   # Firefox
npx playwright test --project=webkit    # Safari
```

### Run a Specific Test File

```bash
npx playwright test e2e/navigation.spec.ts
```

### Run Tests in Headed Mode (See Browser)

```bash
npx playwright test --headed
```

### Debug Tests

```bash
npx playwright test --debug
```

This opens the Playwright Inspector where you can:
- Step through tests
- See what Playwright is doing
- Edit locators live

## Test Reports

After running tests, view the HTML report:

```bash
npx playwright show-report
```

This shows:
- Pass/fail status for each test
- Screenshots of failures
- Videos of test runs
- Execution traces

## Visual Regression Tests

Visual regression tests capture screenshots and compare them against baseline images.

### First Run (Creating Baselines)

The first time you run visual tests, they will create baseline screenshots:

```bash
npx playwright test e2e/visual-regression.spec.ts
```

Baseline images are stored in `e2e/visual-regression.spec.ts-snapshots/`.

### Updating Baselines

If visual changes are intentional, update the baseline screenshots:

```bash
npx playwright test --update-snapshots
```

⚠️ **Important**: Review visual changes carefully before updating baselines!

### Visual Test Configuration

Visual tests use these settings:
- `maxDiffPixels`: Maximum allowed pixel difference (allows minor anti-aliasing differences)
- `fullPage`: Captures the entire page, including below-the-fold content

## Writing New Tests

### Test Structure

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test('should do something specific', async ({ page }) => {
    // Navigate to page
    await page.goto('/');
    
    // Interact with elements
    await page.getByRole('button', { name: 'Click Me' }).click();
    
    // Verify expectations
    await expect(page.getByText('Success')).toBeVisible();
  });
});
```

### Best Practices

1. **Use Descriptive Test Names**: Test names should clearly describe what is being tested
2. **Use Role-Based Selectors**: Prefer `getByRole()`, `getByLabel()`, `getByText()` over CSS selectors
3. **Wait for Elements**: Use `await expect().toBeVisible()` to ensure elements are ready
4. **Test User Flows**: Focus on what users actually do, not implementation details
5. **Keep Tests Independent**: Each test should work on its own, don't rely on test order
6. **Use Page Object Pattern**: For complex pages, consider creating page objects

### Locator Strategies

Playwright provides several ways to find elements (in order of preference):

```typescript
// 1. By Role (Best - semantic and accessible)
page.getByRole('button', { name: 'Submit' })

// 2. By Label
page.getByLabel('Email address')

// 3. By Placeholder
page.getByPlaceholder('Enter your name')

// 4. By Text
page.getByText('Welcome')

// 5. By Test ID (use data-testid attributes)
page.getByTestId('submit-button')

// 6. CSS Selector (Last resort)
page.locator('.submit-btn')
```

## Continuous Integration

Tests run automatically on:
- Every pull request
- Every push to main branch

CI configuration is in `.github/workflows/playwright.yml`.

### CI Test Strategy

- Tests run on multiple browsers (Chrome, Firefox, Safari)
- Tests run on desktop and mobile viewports
- Failed tests generate screenshots and videos
- Test reports are uploaded as artifacts

## Troubleshooting

### Tests Fail Locally but Pass in CI

- Ensure your local environment matches CI (same Node version, dependencies)
- Check for timing issues - add explicit waits if needed
- Verify browser versions match

### Flaky Tests

- Add more explicit waits: `await page.waitForLoadState('networkidle')`
- Increase timeout for slow operations
- Check for race conditions in the application

### Visual Tests Failing

- Minor differences can occur due to font rendering across OS
- Increase `maxDiffPixels` if differences are trivial
- Use `--update-snapshots` to accept intentional changes

### Development Server Not Starting

- Check if port 5173 is already in use
- Verify `npm run dev` works manually
- Check the `webServer` config in `playwright.config.ts`

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Locators Guide](https://playwright.dev/docs/locators)
- [Visual Comparisons](https://playwright.dev/docs/test-snapshots)
- [Debugging Tests](https://playwright.dev/docs/debug)

## Contributing

When adding new features:

1. Write E2E tests for critical user flows
2. Run tests locally before pushing
3. Update this README if adding new test categories
4. Keep tests maintainable and readable
5. Add comments for complex test logic

For questions or issues with tests, please open an issue or contact the team.
