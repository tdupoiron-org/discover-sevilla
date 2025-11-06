import { test, expect } from '@playwright/test';

/**
 * Test Suite: Visual Regression Testing
 * Captures and compares screenshots of key pages to detect visual changes
 */
test.describe('Visual Regression', () => {
  test('should match homepage screenshot', async ({ page }) => {
    await page.goto('/');
    
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Take screenshot and compare
    await expect(page).toHaveScreenshot('homepage.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });

  test('should match homepage on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    await expect(page).toHaveScreenshot('homepage-mobile.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });

  test('should match homepage on tablet viewport', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    await expect(page).toHaveScreenshot('homepage-tablet.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });

  test('should match "Visited" filter view', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Mark a few sites as visited
    const checkboxes = page.locator('[type="button"]').filter({ has: page.locator('[role="checkbox"]') });
    await checkboxes.nth(0).click();
    await checkboxes.nth(1).click();
    await checkboxes.nth(2).click();
    
    // Switch to visited filter
    await page.getByRole('button', { name: /Visited/i }).click();
    
    // Wait for any animations to complete
    await page.waitForTimeout(500);
    
    await expect(page).toHaveScreenshot('visited-filter-view.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });

  test('should match site card visual state', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Get first site card
    const firstCard = page.locator('[class*="grid"]').locator('[class*="card"], [class*="Card"]').first();
    
    await expect(firstCard).toHaveScreenshot('site-card-default.png', {
      maxDiffPixels: 50,
    });
  });

  test('should match visited site card visual state', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Mark first site as visited
    const firstCheckbox = page.locator('[type="button"]').filter({ has: page.locator('[role="checkbox"]') }).first();
    await firstCheckbox.click();
    
    // Wait for any animations
    await page.waitForTimeout(300);
    
    // Get the visited card
    const firstCard = page.locator('[class*="grid"]').locator('[class*="card"], [class*="Card"]').first();
    
    await expect(firstCard).toHaveScreenshot('site-card-visited.png', {
      maxDiffPixels: 50,
    });
  });

  test('should match progress card visual state', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Mark sites to show progress
    const checkboxes = page.locator('[type="button"]').filter({ has: page.locator('[role="checkbox"]') });
    await checkboxes.nth(0).click();
    await checkboxes.nth(1).click();
    
    // Wait for progress card to appear
    await page.waitForTimeout(300);
    
    // Screenshot the progress card
    const progressCard = page.locator('text=Your Progress').locator('..').locator('..');
    await expect(progressCard).toHaveScreenshot('progress-card.png', {
      maxDiffPixels: 50,
    });
  });

  test('should match empty state visual', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Switch to visited filter (should be empty)
    await page.getByRole('button', { name: /Visited/i }).click();
    
    // Wait for transition
    await page.waitForTimeout(300);
    
    await expect(page).toHaveScreenshot('empty-state.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });

  test('should match filter buttons visual state', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Screenshot the filter buttons area
    const filterButtons = page.locator('header').locator('div:has(button:text("All Sites"))');
    await expect(filterButtons).toHaveScreenshot('filter-buttons.png', {
      maxDiffPixels: 50,
    });
  });
});
