import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test('should load successfully', async ({ page }) => {
    await page.goto('http://localhost:1313');
    
    // Check if main elements are visible
    await expect(page.locator('nav.navbar')).toBeVisible();
    await expect(page.locator('section#showcase')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('should have correct title', async ({ page }) => {
    await page.goto('http://localhost:1313');
    await expect(page).toHaveTitle("Demo site for Adritian - a high performance hugo theme by Adrián Moreno");
  });

  test('should have working navigation links', async ({ page }) => {
    await page.goto('http://localhost:1313');
    
    // Check main navigation links
    const navLinks = [
      { selector: 'a[href="/#about"]', text: 'ABOUT' },
      { selector: 'a[href="/#portfolio"]', text: 'PORTFOLIO' },
      { selector: 'a[href="/blog"]', text: 'BLOG' },
      { selector: 'a[href="/#contact"]', text: 'CONTACT' }
    ];

    for (const link of navLinks) {
      const element = page.locator(link.selector).first();
      await expect(element).toBeVisible();
      await expect(element).toHaveText(link.text);
    }
  });
}); 