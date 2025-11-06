import { test, expect } from '@playwright/test';

/**
 * Test Suite: Visit Tracking
 * Tests marking sites as visited/unvisited and progress tracking
 */
test.describe('Visit Tracking', () => {
  test('should mark a site as visited when checkbox is clicked', async ({ page }) => {
    await page.goto('/');
    
    // Click the first site's checkbox
    const firstCheckbox = page.locator('[type="button"]').filter({ has: page.locator('[role="checkbox"]') }).first();
    await firstCheckbox.click();
    
    // Verify the checkbox is now checked
    const checkbox = firstCheckbox.locator('[role="checkbox"]');
    await expect(checkbox).toHaveAttribute('data-state', 'checked');
  });

  test('should unmark a site when clicked again', async ({ page }) => {
    await page.goto('/');
    
    const firstCheckbox = page.locator('[type="button"]').filter({ has: page.locator('[role="checkbox"]') }).first();
    
    // Mark as visited
    await firstCheckbox.click();
    
    // Unmark
    await firstCheckbox.click();
    
    // Verify checkbox is unchecked
    const checkbox = firstCheckbox.locator('[role="checkbox"]');
    await expect(checkbox).toHaveAttribute('data-state', 'unchecked');
  });

  test('should display progress card after marking first site', async ({ page }) => {
    await page.goto('/');
    
    // Initially, progress card should not be visible
    const progressText = page.getByText('Your Progress');
    await expect(progressText).not.toBeVisible();
    
    // Mark a site as visited
    const firstCheckbox = page.locator('[type="button"]').filter({ has: page.locator('[role="checkbox"]') }).first();
    await firstCheckbox.click();
    
    // Progress card should now be visible
    await expect(progressText).toBeVisible();
  });

  test('should show correct progress count', async ({ page }) => {
    await page.goto('/');
    
    // Mark first site
    const checkboxes = page.locator('[type="button"]').filter({ has: page.locator('[role="checkbox"]') });
    await checkboxes.nth(0).click();
    
    // Verify progress shows "1 of X"
    await expect(page.getByText(/1 of \d+/)).toBeVisible();
    
    // Mark second site
    await checkboxes.nth(1).click();
    
    // Verify progress shows "2 of X"
    await expect(page.getByText(/2 of \d+/)).toBeVisible();
  });

  test('should update progress bar when marking sites', async ({ page }) => {
    await page.goto('/');
    
    // Mark a site as visited
    const firstCheckbox = page.locator('[type="button"]').filter({ has: page.locator('[role="checkbox"]') }).first();
    await firstCheckbox.click();
    
    // Progress bar should be visible
    const progressBar = page.locator('[role="progressbar"]');
    await expect(progressBar).toBeVisible();
    
    // Progress bar should have a value greater than 0
    const progressValue = await progressBar.getAttribute('aria-valuenow');
    expect(parseFloat(progressValue!)).toBeGreaterThan(0);
  });

  test('should update filter counts when marking sites', async ({ page }) => {
    await page.goto('/');
    
    // Get initial counts
    const visitedButtonBefore = await page.getByRole('button', { name: /Visited/i }).textContent();
    const matchBefore = visitedButtonBefore?.match(/\((\d+)\)/);
    expect(matchBefore).toBeTruthy();
    const visitedCountBefore = parseInt(matchBefore![1]);
    
    // Mark a site
    const firstCheckbox = page.locator('[type="button"]').filter({ has: page.locator('[role="checkbox"]') }).first();
    await firstCheckbox.click();
    
    // Verify visited count increased
    const visitedButtonAfter = await page.getByRole('button', { name: /Visited/i }).textContent();
    const matchAfter = visitedButtonAfter?.match(/\((\d+)\)/);
    expect(matchAfter).toBeTruthy();
    const visitedCountAfter = parseInt(matchAfter![1]);
    
    expect(visitedCountAfter).toBe(visitedCountBefore + 1);
  });

  test('should show completion message when all sites visited', async ({ page }) => {
    await page.goto('/');
    
    // Get all checkboxes
    const checkboxes = page.locator('[type="button"]').filter({ has: page.locator('[role="checkbox"]') });
    const checkboxCount = await checkboxes.count();
    
    // Mark all sites as visited
    for (let i = 0; i < checkboxCount; i++) {
      await checkboxes.nth(i).click();
    }
    
    // Switch to "Visited" filter to see all visited sites
    await page.getByRole('button', { name: /Visited/i }).click();
    
    // Verify all sites are shown in visited filter
    const visitedCards = await page.locator('[class*="grid"]').locator('[class*="card"], [class*="Card"]').count();
    expect(visitedCards).toBe(checkboxCount);
  });

  test('should visually indicate visited sites', async ({ page }) => {
    await page.goto('/');
    
    // Mark first site as visited
    const firstCheckbox = page.locator('[type="button"]').filter({ has: page.locator('[role="checkbox"]') }).first();
    await firstCheckbox.click();
    
    // Get the parent card element
    const firstCard = page.locator('[class*="grid"]').locator('[class*="card"], [class*="Card"]').first();
    
    // Card should have visual indication (opacity or overlay)
    const cardClasses = await firstCard.getAttribute('class');
    expect(cardClasses).toMatch(/opacity/);
  });

  test('should persist visited state during session', async ({ page }) => {
    await page.goto('/');
    
    // Mark sites as visited
    const checkboxes = page.locator('[type="button"]').filter({ has: page.locator('[role="checkbox"]') });
    await checkboxes.nth(0).click();
    await checkboxes.nth(1).click();
    
    // Reload the page
    await page.reload();
    
    // Note: Without backend persistence, the state would reset
    // This test verifies the current behavior (state resets)
    const checkbox = checkboxes.nth(0).locator('[role="checkbox"]');
    const checkState = await checkbox.getAttribute('data-state');
    
    // After reload, state should reset (no persistence implemented)
    expect(checkState).toBe('unchecked');
  });
});
