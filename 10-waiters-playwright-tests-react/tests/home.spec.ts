import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000');
});

test('verify that "Home" page has correct title', async ({ page }) => {
  const heading = page.getByRole('heading', { name: 'Home Page' })

  await expect(heading).toBeVisible();
  await expect(heading).toContainText('Home Page');
});

test('verify that "Home" page has correct menu items', async ({ page }) => {
  const expectedMenuItems = ['Home', 'Waiters', 'About']
  const menuItems = page.locator('nav a')

   expect(await menuItems.allTextContents()).toEqual(expectedMenuItems)
});

test('verify that "Home" page menu marked as active', async ({ page }) => {
  const home = page.getByRole('link', { name: 'Home' })

  const pattern = new RegExp('.*active');
  await expect(home).toHaveAttribute('class', pattern)
});
