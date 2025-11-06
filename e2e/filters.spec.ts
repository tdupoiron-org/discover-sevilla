import { test, expect } from '@playwright/test';

/**
 * Test Suite: Filter Interactions
 * Tests the filtering functionality (All Sites, To Visit, Visited)
 */
test.describe('Filter Interactions', () => {
  test('should display all three filter buttons', async ({ page }) => {
    await page.goto('/');
    
    // Verify all three filter buttons exist
    await expect(page.getByRole('button', { name: /All Sites/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /To Visit/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Visited/i })).toBeVisible();
  });

  test('should show "All Sites" filter as active by default', async ({ page }) => {
    await page.goto('/');
    
    const allSitesButton = page.getByRole('button', { name: /All Sites/i });
    await expect(allSitesButton).toBeVisible();
    
    // Check if it has the active styling (primary background)
    const buttonClasses = await allSitesButton.getAttribute('class');
    expect(buttonClasses).toContain('bg-primary');
  });

  test('should display site count in filter buttons', async ({ page }) => {
    await page.goto('/');
    
    // All filter buttons should show counts in parentheses
    const allSitesText = await page.getByRole('button', { name: /All Sites/i }).textContent();
    expect(allSitesText).toMatch(/\(\d+\)/);
    
    const toVisitText = await page.getByRole('button', { name: /To Visit/i }).textContent();
    expect(toVisitText).toMatch(/\(\d+\)/);
    
    const visitedText = await page.getByRole('button', { name: /Visited/i }).textContent();
    expect(visitedText).toMatch(/\(\d+\)/);
  });

  test('should switch to "To Visit" filter when clicked', async ({ page }) => {
    await page.goto('/');
    
    const toVisitButton = page.getByRole('button', { name: /To Visit/i });
    await toVisitButton.click();
    
    // Verify the button becomes active
    const buttonClasses = await toVisitButton.getAttribute('class');
    expect(buttonClasses).toContain('bg-primary');
  });

  test('should switch to "Visited" filter when clicked', async ({ page }) => {
    await page.goto('/');
    
    const visitedButton = page.getByRole('button', { name: /Visited/i });
    await visitedButton.click();
    
    // Verify the button becomes active
    const buttonClasses = await visitedButton.getAttribute('class');
    expect(buttonClasses).toContain('bg-primary');
  });

  test('should show empty state message when no sites match filter', async ({ page }) => {
    await page.goto('/');
    
    // Click on "Visited" filter (should be empty initially)
    await page.getByRole('button', { name: /Visited/i }).click();
    
    // Should show an empty state message
    await expect(page.getByText(/Start exploring Sevilla/i)).toBeVisible();
  });

  test('should update displayed sites when filter changes', async ({ page }) => {
    await page.goto('/');
    
    // Get initial card count with "All Sites"
    const initialCount = await page.locator('[class*="grid"]').locator('[class*="card"], [class*="Card"]').count();
    
    // Mark a site as visited
    const firstCheckbox = page.locator('[type="button"]').filter({ has: page.locator('[role="checkbox"]') }).first();
    await firstCheckbox.click();
    
    // Switch to "Visited" filter
    await page.getByRole('button', { name: /Visited/i }).click();
    
    // Should show only the visited site
    const visitedCount = await page.locator('[class*="grid"]').locator('[class*="card"], [class*="Card"]').count();
    expect(visitedCount).toBe(1);
    
    // Switch to "To Visit" filter
    await page.getByRole('button', { name: /To Visit/i }).click();
    
    // Should show all sites minus the visited one
    const toVisitCount = await page.locator('[class*="grid"]').locator('[class*="card"], [class*="Card"]').count();
    expect(toVisitCount).toBe(initialCount - 1);
  });

  test('should maintain filter state when interacting with sites', async ({ page }) => {
    await page.goto('/');
    
    // Switch to "To Visit" filter
    await page.getByRole('button', { name: /To Visit/i }).click();
    
    // Mark a site as visited
    const firstCheckbox = page.locator('[type="button"]').filter({ has: page.locator('[role="checkbox"]') }).first();
    await firstCheckbox.click();
    
    // Verify filter button is still active
    const toVisitButton = page.getByRole('button', { name: /To Visit/i });
    const buttonClasses = await toVisitButton.getAttribute('class');
    expect(buttonClasses).toContain('bg-primary');
  });
});
