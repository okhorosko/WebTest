import test, { expect, request } from "@playwright/test";
import { dataSet, validation } from "../utils/dataSet";
import { App } from "../pages/app";
import { Api } from "../pages/api";


    
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
        await app.cartPage.checkout();
        await app.checkoutPage.inputPaymentCredentials();
        await app.checkoutPage.completePayment();
            
        
    });


// home work  
// [3] add to cart and buy (start ui from checkout)

test('API preconditions for Checkout', async ({ page }) => {
    const app = new App(page);
    const apiContext = await request.newContext();
    const api = new Api(apiContext);
    const user = await api.createUser(dataSet.userEmail);
    const loggedUser = await api.signIn(user.email);
    const product = await api.addToCart(loggedUser.token, loggedUser.userId);

    
    await app.loginPage.injectToken(loggedUser.token);
    await page.pause();
    //await app.loginPage.open();
    await page.goto(`https://rahulshettyacademy.com/client/dashboard/order?prop=%5B%${product.productId}%5D`);
    // await app.dashboardPage.openCart();
    // await app.cartPage.checkout();
    await app.checkoutPage.inputPaymentCredentials();
    await app.checkoutPage.completePayment();

});

test('env', async ({ page }) => {
    
    console.log (process.env)
    const app = new App(page)
    const apiContext = await request.newContext()
    const api = new Api(apiContext)
    const user = await api.createUser(dataSet.userEmail);
        
        await app.loginPage.open();
        await app.loginPage.inputLoginCreadentials(process.env.USER_EMAIL,process.env.USER_PASSWORD);
        await app.dashboardPage.openProduct();
    

});