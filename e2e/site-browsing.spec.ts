import { test, expect } from '@playwright/test';
import { getSiteCards, getFirstSiteCard, getFirstCheckbox } from './helpers';

/**
 * Test Suite: Site Browsing
 * Tests the core functionality of browsing and viewing sites
 */
test.describe('Site Browsing', () => {
  test('should display site cards on page load', async ({ page }) => {
    await page.goto('/');
    
    // Wait for the site cards to be visible
    const firstCard = getFirstSiteCard(page);
    await expect(firstCard).toBeVisible();
    
    // Verify multiple cards are present
    const cardCount = await getSiteCards(page).count();
    expect(cardCount).toBeGreaterThan(0);
  });

  test('should display site card details', async ({ page }) => {
    await page.goto('/');
    
    // Get the first site card
    const firstCard = getFirstSiteCard(page);
    await expect(firstCard).toBeVisible();
    
    // Verify card has an image
    const cardImage = firstCard.locator('img').first();
    await expect(cardImage).toBeVisible();
    
    // Verify card has a checkbox for marking as visited
    const checkbox = getFirstCheckbox(page);
    await expect(checkbox).toBeVisible();
  });

  test('should show site ratings and badges', async ({ page }) => {
    await page.goto('/');
    
    const firstCard = getFirstSiteCard(page);
    
    // Cards should have badges (crowd level, popularity)
    const badges = firstCard.locator('[class*="badge"], [class*="Badge"]');
    const badgeCount = await badges.count();
    expect(badgeCount).toBeGreaterThan(0);
  });

  test('should display site descriptions', async ({ page }) => {
    await page.goto('/');
    
    const firstCard = getFirstSiteCard(page);
    
    // Each card should have descriptive text
    const cardText = await firstCard.textContent();
    expect(cardText).toBeTruthy();
    expect(cardText!.length).toBeGreaterThan(10);
  });

  test('should show duration information', async ({ page }) => {
    await page.goto('/');
    
    const firstCard = getFirstSiteCard(page);
    await expect(firstCard).toBeVisible();
    
    // Cards should display duration (look for common time patterns)
    const cardText = await firstCard.textContent();
    // Check for duration patterns like "1-2 hours", "30 min", etc.
    expect(cardText).toMatch(/\d+[\s-]*(?:hour|min|hr)/i);
  });
});
