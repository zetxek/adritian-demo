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
      { selector: 'a[href="/blog"]', text: 'HOW TO' },
      { selector: 'a[href="/#contact"]', text: 'CONTACT' }
    ];

    for (const link of navLinks) {
      const element = page.locator(link.selector).first();
      await expect(element).toBeVisible();
      await expect(element).toHaveText(link.text);
    }
  });

  test('should load all homepage images correctly', async ({ page }) => {
    await page.goto('http://localhost:1313');
    
    // Wait for network to be idle (most images loaded)
    await page.waitForLoadState('networkidle');
    
    // Helper function to check images - handles both regular and lazy-loaded images
    const checkImageElements = async (selector: string) => {
      const elements = page.locator(selector);
      const count = await elements.count();
      
      expect(count).toBeGreaterThan(0, `Expected to find at least one element matching "${selector}"`);
      
      for (let i = 0; i < count; i++) {
        const element = elements.nth(i);
        await expect(element).toBeVisible();
        
        const isLazyLoaded = await element.evaluate(el => 
          el.classList.contains('lozad') || el.hasAttribute('data-src'));
        
        if (isLazyLoaded) {
          // For lazy-loaded images, check that data attributes exist
          const dataSrc = await element.getAttribute('data-src');
          expect(dataSrc).toBeTruthy();
        } else {
          // For regular images, check naturalWidth
          const naturalWidth = await element.evaluate(el => (el as HTMLImageElement).naturalWidth);
          expect(naturalWidth).toBeGreaterThan(0, 'Image should have loaded (naturalWidth > 0)');
        }
      }
    };
    
    // Check all required image elements
    await checkImageElements('.profile-image img');
    
    // .image-left-overflow might be an element with background image or contain an img
    const leftOverflowElement = page.locator('.image-left-overflow').first();
    await expect(leftOverflowElement).toBeVisible();
    
    // Check if it contains any img elements
    const hasImg = await page.locator('.image-left-overflow img').count() > 0;
    if (hasImg) {
      await checkImageElements('.image-left-overflow img');
    }
    
    await checkImageElements('.client-works-container picture img');
    await checkImageElements('.testimonial__author .picture img');
  });
});