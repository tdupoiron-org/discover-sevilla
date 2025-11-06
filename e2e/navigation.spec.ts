import { test, expect } from '@playwright/test';

/**
 * Test Suite: Navigation and Initial Page Load
 * Tests the basic navigation and page rendering functionality
 */
test.describe('Navigation and Page Load', () => {
  test('should load the homepage successfully', async ({ page }) => {
    await page.goto('/');
    
    // Verify page title
    await expect(page).toHaveTitle('Discover Sevilla');
    
    // Verify main heading is visible
    await expect(page.getByRole('heading', { name: 'Discover Sevilla' })).toBeVisible();
  });

  test('should display the main header elements', async ({ page }) => {
    await page.goto('/');
    
    // Check for MapPin icon (by checking if header contains the title)
    const header = page.locator('header');
    await expect(header).toBeVisible();
    
    // Verify descriptive text
    await expect(page.getByText(/Welcome to your personal guide/)).toBeVisible();
  });

  test('should display footer information', async ({ page }) => {
    await page.goto('/');
    
    // Verify footer exists and contains expected text
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await expect(footer.getByText(/© 2025 Discover Sevilla/)).toBeVisible();
    await expect(footer.getByText(/Made with ❤️ for travelers/)).toBeVisible();
  });

  test('should be responsive on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Verify main elements are still visible on mobile
    await expect(page.getByRole('heading', { name: 'Discover Sevilla' })).toBeVisible();
    await expect(page.getByText(/Welcome to your personal guide/)).toBeVisible();
  });
});
