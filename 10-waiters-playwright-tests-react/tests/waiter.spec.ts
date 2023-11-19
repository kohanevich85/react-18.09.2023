import { test, expect } from '@playwright/test';

const WAITERS = [
  {
    "id": 1,
    "firstName": "Denys",
    "phone": "+380-77-777-77",
  },
  {
    "id": 2,
    "firstName": "Maksym",
    "phone": "+18-02-626-88"
  },
  {
    "id": 3,
    "firstName": "Igor",
    "phone": "+48-88-888-88"
  },
]

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/waiter');
});

test('verify that "Waiter" page has correct title', async ({ page }) => {
  const pageTitle = 'Waiter List'
  const heading = page.getByRole('heading', { name: pageTitle })

  await expect(heading).toBeVisible();
  await expect(heading).toContainText(pageTitle);
});

test('create new "Waiter"', async ({ page }) => {

  await page.route('**/waiters/', async route => {
    await route.fulfill({ json: WAITERS });
  });

  const progressbar = page.getByRole('progressbar')
  await expect(progressbar).not.toBeVisible();

  await page.getByRole('button', { name: 'CREATE' }).click();
  const pageTitle = 'Edit Form'
  const heading = page.getByRole('heading', { name: pageTitle })
  await expect(heading).toBeVisible();
  await expect(heading).toContainText(pageTitle);

  await page.getByLabel('First Name').fill('Test User');
  await page.getByLabel('Phone').fill('+1-234-567-89-00');
  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(progressbar).not.toBeVisible();
});

test('edit "Waiter"', async ({ page }) => {

  await page.route('**/waiters/', async route => {
    await route.fulfill({ json: WAITERS });
  });

  await page.route('**/waiters/1', async route => {
    await route.fulfill({ json: WAITERS[0] });
  });

  const progressbar = page.getByRole('progressbar')
  await expect(progressbar).not.toBeVisible();

  await page.getByRole('button', { name: 'Edit' }).first().click();
  const pageTitle = 'Edit Form'
  const heading = page.getByRole('heading', { name: pageTitle })

  await expect(heading).toBeVisible();
  await expect(heading).toContainText(pageTitle);

  await page.getByLabel('Phone').fill('+18-02-626-88');
  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(progressbar).not.toBeVisible();

  const rows = page.locator('div[role=cell][data-field=firstName]')
  await expect(rows).toHaveCount(3);

});

test('filter "Waiter" by phones', async ({ page }) => {
  await page.route('**/waiters/', async route => {
    await route.fulfill({ json: WAITERS });
  });

  await page.getByRole('button', { name: 'UA Phone' }).click();

  const rows = page.locator('div[role=cell][data-field=firstName] > div[role=presentation]')
  await expect(rows).toHaveCount(1);
  // await expect(rows.allInnerTexts()).toContain('Denys');
});

