import test, { expect, request } from "@playwright/test";
import { dataSet, validation } from "../utils/dataSet";
import { App } from "../pages/app";
import { Api } from "../pages/api";

test('Sign up', async ({ page }) => {

    const app = new App(page)
    
    await app.signUpPage.open();
    await page.pause();
    await app.signUpPage.inputSignUpCreadentials();
    await expect(page.getByText('Registered Successfully')).toBeVisible();

    });


test('Sign up via API', async ({ page }) => {

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

// todo: 
    // [1] create api method for login (done)
    // [2] add tests for validation for input fields registration/login (done)
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



    //[2]add tests for validation for input fields login

    test('API SignUp Incorrect Email format', async ({ page }) => {

        const apiContext = await request.newContext()
        const api = new Api(apiContext)
                    
        const response = await api.createUser(validation.EmailWithoutDog);
        expect(response.responseBody.error).toEqual('Enter Valid Email!');
                    
        });

    test('Login validation. Incorrect password', async ({ page }) => {

        const app = new App(page)
        const apiContext = await request.newContext()
        const api = new Api(apiContext)            
        const user = await api.createUser(dataSet.userEmail);
    
        await app.loginPage.open();
        await app.loginPage.inputLoginCreadentials(user.email,validation.PasswordIncorrect);
        await expect(page.getByText('Incorrect email or password.')).toBeVisible();
           
        });

    test('Login validation. Incorrect Email', async ({ page }) => {

        const app = new App(page)
        const apiContext = await request.newContext()
        const api = new Api(apiContext)            
        const user = await api.createUser(dataSet.userEmail);
        
        await app.loginPage.open();
        await app.loginPage.inputLoginCreadentials(validation.EmailIncorrect,dataSet.userPassword);
        await expect(page.getByText('Incorrect email or password.')).toBeVisible();
           
        });
    
    test('Login validation. Incorrect Email format', async ({ page }) => {

        const app = new App(page)
        const apiContext = await request.newContext()
        const api = new Api(apiContext)            
        const user = await api.createUser(dataSet.userEmail);
        
        await app.loginPage.open();
        //await page.pause();
        await app.loginPage.inputLoginCreadentials(validation.EmailWithoutDog,dataSet.userPassword);
        await expect(page.getByText('*Enter Valid Email')).toBeVisible();

        });
        
    test('Login validation. Empty Password', async ({ page }) => {

        const app = new App(page)
        const apiContext = await request.newContext()
        const api = new Api(apiContext)            
        const user = await api.createUser(dataSet.userEmail);
        
        await app.loginPage.open();
        await page.pause();
        await app.loginPage.inputLoginCreadentials(dataSet.userEmail,validation.PasswordEmpty);
        await expect(page.getByText('*Password is required')).toBeVisible();

        });

    //[2]add tests for validation for input fields Registration

    test('Sign up. Email validation', async ({ page }) => {

        const app = new App(page)
        
        await app.signUpPage.open();
        await app.signUpPage.inputSignUpCreadentials();
        await app.signUpPage.inputSignUpEmail(validation.EmailWithoutDog);
        await app.signUpPage.clickregisterButton();
        await expect(page.getByText('*Enter Valid Email')).toBeVisible();
        await app.signUpPage.inputSignUpEmail(validation.EmailEmpty);
        await app.signUpPage.clickregisterButton();
        await expect(page.getByText('*Email is required')).toBeVisible();
    
        });

    test.only('Sign up. Password validation', async ({ page }) => {

        const app = new App(page)
        
        await app.signUpPage.open();
        await page.pause();
        await app.signUpPage.inputSignUpCreadentials();
        await app.signUpPage.inputSignUpPass(validation.PasswordEmpty);
        await app.signUpPage.clickregisterButton();
        await expect(page.getByText('*Password is required')).toBeVisible();
        await app.signUpPage.inputSignUpPass(validation.PasswordLessThen8Symbols);
        await app.signUpPage.inputSignUpPassConfirm(validation.PasswordLessThen8Symbols)
        await app.signUpPage.clickregisterButton();
        await expect(page.getByText('Password must be 8 Character Long!')).toBeVisible();
        await app.signUpPage.inputSignUpPass('test');
        await app.signUpPage.inputSignUpPassConfirm('test2')
        await app.signUpPage.clickregisterButton();
        await expect(page.getByText('Password and Confirm Password must match with each other.')).toBeVisible();
    
        });

