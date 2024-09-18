import test, { expect } from "@playwright/test";
import { dataSet } from "../utils/dataSet";
import { Login } from "../pages/login.page";
import { SignUp } from "../pages/signUp.page";
import { Dashboard } from "../pages/dashboard.page";
import { Product } from "../pages/product.page";
import { Checkout } from "../pages/checkout.page";
import { Cart } from "../pages/cart.page";

test('Purchase first product in a list', async ({ page }) => {

const loginPage = new Login(page)
const signUpPage = new SignUp(page)
const dashboardPage = new Dashboard(page)
const productPage = new Product(page)
const cartPage = new Cart(page)
const checkoutPage = new Checkout(page)

await page.goto("https://rahulshettyacademy.com/client");
await signUpPage.inputSignUpCreadentials();
await loginPage.inputLoginCreadentials(dataSet.userEmail,dataSet.userPassword);
await dashboardPage.openProduct();
await productPage.addToCart();
await cartPage.cartLoaded();
await cartPage.checkout();
await checkoutPage.inputPaymentCredentials();
await checkoutPage.completePayment();

});


