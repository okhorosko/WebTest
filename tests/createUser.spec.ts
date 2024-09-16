import test, { expect } from "@playwright/test";
import { dataSet } from "../utils/dataSet";
import { Login } from "../pages/login.page";


// test('Simple sign in and login', async ({ page }) => {
//     // Generate unique email
//     const loginPage = new Login(page)


//     // Step 1: Register a new user
//     await page.goto("https://rahulshettyacademy.com/client");
//     //await page.pause()
//     await page.locator('[href="/client/auth/register"]').click();
//     await page.locator('[id="firstName"]').fill(dataSet.firstName);
//     await page.locator('[id="lastName"]').fill(dataSet.lastName);
//     await page.locator('[id="userEmail"]').fill(dataSet.userEmail);
//     await page.locator('[id="userMobile"]').fill(dataSet.userMobile);
//     await page.locator('[id="userPassword"]').fill(dataSet.userPassword);
//     await page.locator('[id="confirmPassword"]').fill(dataSet.userPassword);
//     await page.getByLabel('Male', { exact: true }).check();
//     await page.getByRole('combobox').selectOption('2: Student');
//     await page.getByRole('checkbox').check();
//     await page.getByRole('button', { name: 'Register' }).click();
//     await page.locator('Account Created Successfully').isVisible();

//     // Step 2: login
//     // await page.getByRole('button', { name: 'Login' }).click();
//     // await page.locator('[id="userEmail"]').fill(dataSet.userEmail);
//     // await page.locator('[id="userPassword"]').fill(dataSet.userPassword);
//     // await page.getByRole('button', { name: 'Login' }).click();
//     await loginPage.inputLoginCreadentials(dataSet.userEmail,dataSet.userPassword)

//     await expect(page.getByRole('button', { name: 'Sign Out' })).toBeVisible();
// });

// todo: add test for products purchase

test('Purchase first product in a list', async ({ page }) => {
// Generate unique email
const loginPage = new Login(page)


// Step 1: Register a new user
await page.goto("https://rahulshettyacademy.com/client");
//await page.pause()
await page.locator('[href="/client/auth/register"]').click();
await page.locator('[id="firstName"]').fill(dataSet.firstName);
await page.locator('[id="lastName"]').fill(dataSet.lastName);
await page.locator('[id="userEmail"]').fill(dataSet.userEmail);
await page.locator('[id="userMobile"]').fill(dataSet.userMobile);
await page.locator('[id="userPassword"]').fill(dataSet.userPassword);
await page.locator('[id="confirmPassword"]').fill(dataSet.userPassword);
await page.getByLabel('Male', { exact: true }).check();
await page.getByRole('combobox').selectOption('2: Student');
await page.getByRole('checkbox').check();
await page.getByRole('button', { name: 'Register' }).click();
await page.locator('Account Created Successfully').isVisible();
// Step 2: Login
await loginPage.inputLoginCreadentials(dataSet.userEmail,dataSet.userPassword)
await page.pause()
await expect(page.getByRole('button', { name: 'Sign Out' })).toBeVisible();
// Step 3: Add product to cart
await page.locator('[id="products"]').isVisible();
await page.getByRole('button', { name: 'View' }).first().click();
await page.getByRole('button', { name: 'Add to Cart' }).click();
await page.getByRole('button', { name: '   Cart' }).click();
await expect(page.getByRole('button', { name: 'Buy Now❯' })).toBeVisible();
// Step 5: Checkout
await page.getByRole('button', { name: 'Checkout❯' }).click();

await page.locator('input[type="text"]').first().fill('4242424242424242');
await page.getByRole('combobox').nth(1).selectOption('26');
await page.locator('input[type="text"]').nth(1).fill('123');
await page.getByPlaceholder('Select country').type('Ukraine');
//await page.getByPlaceholder('Select country').click();
await page.getByRole('button', { name: ' Ukraine' }).click();
await page.getByText('Place Order').click();
await expect(page.getByRole('heading', { name: 'Thankyou for the order.' })).toBeVisible();

});


