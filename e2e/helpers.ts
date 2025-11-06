import { Page, Locator } from '@playwright/test';

/**
 * Helper functions for common test operations
 */

/**
 * Gets all site card elements on the page
 * @param page - Playwright page object
 * @returns Locator for all site cards
 */
export function getSiteCards(page: Page): Locator {
  return page.locator('[class*="grid"]').locator('[class*="card"], [class*="Card"]');
}

/**
 * Gets all site card checkboxes on the page
 * @param page - Playwright page object
 * @returns Locator for all checkboxes
 */
export function getSiteCheckboxes(page: Page): Locator {
  return page.locator('[type="button"]').filter({ has: page.locator('[role="checkbox"]') });
}

/**
 * Gets the first site card on the page
 * @param page - Playwright page object
 * @returns Locator for the first site card
 */
export function getFirstSiteCard(page: Page): Locator {
  return getSiteCards(page).first();
}

/**
 * Gets the first site checkbox on the page
 * @param page - Playwright page object
 * @returns Locator for the first checkbox
 */
export function getFirstCheckbox(page: Page): Locator {
  return getSiteCheckboxes(page).first();
}

/**
 * Marks a site as visited by clicking its checkbox
 * @param page - Playwright page object
 * @param index - Index of the site to mark (0-based)
 */
export async function markSiteAsVisited(page: Page, index: number = 0): Promise<void> {
  await getSiteCheckboxes(page).nth(index).click();
}

/**
 * Gets the filter button by name
 * @param page - Playwright page object
 * @param filterName - Name of the filter (e.g., "All Sites", "Visited")
 * @returns Locator for the filter button
 */
export function getFilterButton(page: Page, filterName: string): Locator {
  return page.getByRole('button', { name: new RegExp(filterName, 'i') });
}

/**
 * Switches to a specific filter view
 * @param page - Playwright page object
 * @param filterName - Name of the filter to switch to
 */
export async function switchToFilter(page: Page, filterName: string): Promise<void> {
  await getFilterButton(page, filterName).click();
}

/**
 * Waits for the page to be fully loaded
 * @param page - Playwright page object
 */
export async function waitForPageLoad(page: Page): Promise<void> {
  await page.waitForLoadState('networkidle');
}
