import test, { expect, request } from "@playwright/test";
import { dataSet } from "../utils/dataSet";
import { App } from "../pages/app";
import { Api } from "../pages/api";

test('Purchase first product in a list', async ({ page }) => {

const app = new App(page)

    await app.signUpPage.open();
    await app.signUpPage.inputSignUpCreadentials();
    await app.loginPage.inputLoginCreadentials(dataSet.userEmail,dataSet.userPassword);
    await app.dashboardPage.openProduct();
    await app.productPage.addToCart();
    await app.cartPage.cartLoaded();
    await app.cartPage.checkout();
    await app.checkoutPage.inputPaymentCredentials();
    await app.checkoutPage.completePayment();


});

test('Continue shoping', async ({ page }) => {

const app = new App(page)
    
    await app.signUpPage.open();
    //await signUpPage.inputSignUpCreadentials();
    await app.loginPage.inputLoginCreadentials(dataSet.userEmail,dataSet.userPassword);
    await app.dashboardPage.openProduct();
    await app.productPage.addToCart();
    await app.cartPage.cartLoaded();
    await app.cartPage.continueShoping();
    await app.cartPage.checkout();
    await app.checkoutPage.inputPaymentCredentials();
    await app.checkoutPage.completePayment();
    

});

test.only('Continue shoping with API registration', async ({ page }) => {

    const app = new App(page)
    const apiContext = await request.newContext()
    const api = new Api(apiContext)
        
        const user = await api.createUser(dataSet.userEmail);
        await app.loginPage.open();
        await app.loginPage.inputLoginCreadentials(user.email,dataSet.userPassword);
        await app.dashboardPage.openProduct();
        await app.productPage.addToCart();
        await app.cartPage.cartLoaded();
        await app.cartPage.continueShoping();
        await app.cartPage.checkout();
        await app.checkoutPage.inputPaymentCredentials();
        await app.checkoutPage.completePayment();
        
    
    });

    // todo: 
    //add tests for validation for input fields registration/login
    //create api method for login