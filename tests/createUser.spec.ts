import test, { expect, request } from "@playwright/test";
import { dataSet, validation } from "../utils/dataSet";
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

test('Continue shoping with API registration', async ({ page }) => {

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
    // [1] create api method for login
    // [2] add tests for validation for input fields registration/login
    // [3] add to cart and buy (start ui from checkout)


    // [1]create api method for login

    test('Sign in via API', async ({ page }) => {

        const apiContext = await request.newContext()
        const api = new Api(apiContext)
        const app = new App(page);
                
        const user = await api.createUser(dataSet.userEmail);
        const loggedUser = await api.signIn(user.email);
        
        await app.loginPage.open();
        await app.loginPage.injectToken(loggedUser.token);
        await app.loginPage.open();
        await page.pause();

        });



    //[2]add tests for validation for input fields registration/login

    test.only('API SignUp Wrong Email', async ({ page }) => {

        const apiContext = await request.newContext()
        const api = new Api(apiContext)
                    
        const response = await api.createUser(validation.userEmailWithoutDog);
        expect(response.responseBody.error).toEqual('Enter Valid Email!');

                    
        });