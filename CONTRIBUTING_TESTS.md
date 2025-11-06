# Contributing to Tests

Thank you for contributing to the Discover Sevilla test suite! This guide will help you write and maintain high-quality end-to-end tests.

## Prerequisites

Before writing tests, make sure you have:

1. Installed all dependencies: `npm install`
2. Installed Playwright browsers: `npx playwright install`
3. Familiarity with the application functionality
4. Read the [E2E Testing Guide](./e2e/README.md)

## Writing Tests

### Test Philosophy

Our E2E tests should:
- **Test user behavior**, not implementation details
- **Be reliable** and not flaky
- **Be maintainable** and easy to understand
- **Be fast** enough to run frequently
- **Be independent** from each other

### Test Categories

We organize tests into these categories:

1. **Navigation Tests** (`navigation.spec.ts`)
   - Page loading
   - URL navigation
   - Responsive behavior

2. **Site Browsing Tests** (`site-browsing.spec.ts`)
   - Viewing site cards
   - Site information display
   - Card interactions

3. **Filter Tests** (`filters.spec.ts`)
   - Filter button functionality
   - Content filtering
   - Filter state management

4. **Visit Tracking Tests** (`visit-tracking.spec.ts`)
   - Marking sites as visited
   - Progress tracking
   - State management

5. **Visual Regression Tests** (`visual-regression.spec.ts`)
   - Screenshot comparisons
   - Visual consistency
   - Cross-browser appearance

### Writing a New Test

#### 1. Choose the Right File

Add your test to an existing file that matches its category. If it doesn't fit any category, consider creating a new spec file.

#### 2. Follow the Test Structure

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Category', () => {
  test('should perform specific action', async ({ page }) => {
    // Arrange: Set up the test
    await page.goto('/');
    
    // Act: Perform the action
    await page.getByRole('button', { name: 'Submit' }).click();
    
    // Assert: Verify the result
    await expect(page.getByText('Success')).toBeVisible();
  });
});
```

#### 3. Use Semantic Selectors

Always prefer semantic selectors over CSS/XPath:

```typescript
// ✅ Good - Semantic and accessible
await page.getByRole('button', { name: 'Submit' })
await page.getByLabel('Email')
await page.getByText('Welcome')

// ❌ Avoid - Brittle and non-semantic
await page.locator('.btn-submit')
await page.locator('#email-input')
await page.locator('div > span.welcome-text')
```

#### 4. Write Clear Test Names

```typescript
// ✅ Good - Describes what and why
test('should display error message when form is submitted empty', ...)

// ❌ Avoid - Vague or technical
test('test form', ...)
test('should call validateForm()', ...)
```

#### 5. Add Proper Waits

```typescript
// ✅ Good - Wait for element to be ready
await expect(page.getByText('Success')).toBeVisible();

// ❌ Avoid - Arbitrary timeouts
await page.waitForTimeout(2000);
```

Use `waitForTimeout()` only for animations or when absolutely necessary.

### Visual Regression Tests

#### When to Add Visual Tests

Add visual regression tests for:
- New page layouts
- Significant UI components
- Different responsive breakpoints
- Important user states (loading, error, success)

#### Writing Visual Tests

```typescript
test('should match component appearance', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  
  // Capture full page
  await expect(page).toHaveScreenshot('page-name.png', {
    fullPage: true,
    maxDiffPixels: 100,
  });
  
  // Or capture specific element
  const component = page.getByTestId('component');
  await expect(component).toHaveScreenshot('component.png', {
    maxDiffPixels: 50,
  });
});
```

#### Updating Visual Baselines

When you intentionally change the UI:

1. Review the visual diff carefully
2. Update snapshots: `npx playwright test --update-snapshots`
3. Commit the new baseline images
4. Document the visual change in your PR

### Testing Responsive Design

Test key breakpoints:

```typescript
test('should work on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/');
  // ... test mobile-specific behavior
});

test('should work on tablet', async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto('/');
  // ... test tablet-specific behavior
});
```

### Testing Interactive Features

```typescript
test('should toggle site as visited', async ({ page }) => {
  await page.goto('/');
  
  // Find and click checkbox
  const checkbox = page.locator('[type="button"]')
    .filter({ has: page.locator('[role="checkbox"]') })
    .first();
  await checkbox.click();
  
  // Verify state changed
  const checkboxElement = checkbox.locator('[role="checkbox"]');
  await expect(checkboxElement).toHaveAttribute('data-state', 'checked');
});
```

## Best Practices

### Do's ✅

1. **Write Descriptive Tests**
   ```typescript
   test('should show error when email is invalid', ...)
   ```

2. **Test User Flows, Not Implementation**
   ```typescript
   // ✅ Good
   await page.getByRole('button', { name: 'Submit' }).click();
   
   // ❌ Bad
   await page.locator('[onclick="handleSubmit()"]').click();
   ```

3. **Use Auto-Waiting**
   ```typescript
   // Playwright waits automatically
   await expect(page.getByText('Success')).toBeVisible();
   ```

4. **Keep Tests Independent**
   - Each test should work on its own
   - Don't rely on test execution order
   - Clean up after yourself if needed

5. **Use Page Object Pattern for Complex Pages**
   ```typescript
   class LoginPage {
     constructor(private page: Page) {}
     
     async login(email: string, password: string) {
       await this.page.getByLabel('Email').fill(email);
       await this.page.getByLabel('Password').fill(password);
       await this.page.getByRole('button', { name: 'Login' }).click();
     }
   }
   ```

### Don'ts ❌

1. **Don't Use Arbitrary Waits**
   ```typescript
   // ❌ Bad
   await page.waitForTimeout(3000);
   
   // ✅ Good
   await page.waitForLoadState('networkidle');
   await expect(element).toBeVisible();
   ```

2. **Don't Test Implementation Details**
   ```typescript
   // ❌ Bad
   expect(page.evaluate(() => window.myInternalState)).toBe(true);
   
   // ✅ Good
   await expect(page.getByText('Updated')).toBeVisible();
   ```

3. **Don't Write Flaky Tests**
   - Avoid race conditions
   - Use proper waits
   - Don't depend on timing

4. **Don't Make Tests Too Long**
   - Split complex tests into smaller ones
   - Each test should verify one thing

5. **Don't Ignore Failing Tests**
   - Fix or update tests immediately
   - Don't skip tests without documenting why

## Running Tests

### Before Committing

Always run tests locally:

```bash
npm test
```

### Debugging Failed Tests

1. **Run in headed mode**
   ```bash
   npm run test:headed
   ```

2. **Use debug mode**
   ```bash
   npm run test:debug
   ```

3. **Use UI mode**
   ```bash
   npm run test:ui
   ```

4. **Check screenshots and videos**
   - Located in `test-results/`
   - Generated on failure

### Fixing Flaky Tests

If a test fails intermittently:

1. Add explicit waits:
   ```typescript
   await page.waitForLoadState('networkidle');
   ```

2. Increase timeout for slow operations:
   ```typescript
   await expect(element).toBeVisible({ timeout: 10000 });
   ```

3. Check for race conditions in the application

4. Verify element stability:
   ```typescript
   await element.waitFor({ state: 'stable' });
   ```

## Code Review Checklist

When reviewing test code, check:

- [ ] Tests are in the correct file/category
- [ ] Test names clearly describe what is being tested
- [ ] Tests use semantic selectors (role, label, text)
- [ ] Tests use auto-waiting, not arbitrary timeouts
- [ ] Tests are independent and can run in any order
- [ ] Visual tests have appropriate `maxDiffPixels` tolerance
- [ ] Tests follow existing patterns and conventions
- [ ] Tests actually fail when the feature is broken
- [ ] Tests are not too long or complex
- [ ] Comments explain "why", not "what"

## CI/CD Integration

Tests run automatically on:
- Pull requests
- Pushes to main/develop branches
- Manual workflow dispatch

### Viewing CI Results

1. Go to the GitHub Actions tab
2. Find your workflow run
3. Check test results for each browser
4. Download artifacts for detailed reports

### CI Failures

If tests pass locally but fail in CI:

1. Check if it's a timing issue (add more waits)
2. Verify browser versions match
3. Check for environment-specific issues
4. Look at CI screenshots/videos

## Getting Help

If you need help with tests:

1. Check the [E2E Testing Guide](./e2e/README.md)
2. Review existing tests for examples
3. Read [Playwright documentation](https://playwright.dev/)
4. Ask the team in PR comments or issues

## Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Writing Tests](https://playwright.dev/docs/writing-tests)
- [Locators](https://playwright.dev/docs/locators)
- [Assertions](https://playwright.dev/docs/test-assertions)
- [Visual Comparisons](https://playwright.dev/docs/test-snapshots)

Thank you for contributing to our test suite! 🎭
