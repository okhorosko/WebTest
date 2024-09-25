import { APIRequestContext, expect, request } from "@playwright/test";
import { dataSet } from "../utils/dataSet";

export class Api{
    apiContext: APIRequestContext;
    constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext
    }

async createUser(email:string){
const apiContext = await request.newContext();
const createUser = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/register', {
    data: {
    firstName: dataSet.firstName,
    lastName: dataSet.lastName,
    userEmail: email,
    userRole: "customer",
    occupation: "Engineer",
    gender: "Male",
    userMobile: dataSet.userMobile,
    userPassword: dataSet.userPassword,
    confirmPassword: dataSet.userPassword,
    required:true
    
    
}});

// console.log('Status Code:', createUser.status());
const responseBody = await createUser.json();
//console.log('Response Body:', responseBody);

//expect (createUser.ok()).toBeTruthy();
return {email,responseBody}

};

async signIn(email:string){
    const apiContext = await request.newContext();
    const signIn = await apiContext.post(`${dataSet.mainUrl}/api/ecom/auth/login`, {
        data: {
            userEmail: email,
            userPassword: dataSet.userPassword,
        }
    });

    expect (signIn.ok()).toBeTruthy();

    // console.log('Status Code:', signIn.status());
    const responseBody = await signIn.json();
    const message = responseBody.message;
    const token = responseBody.token;
    const userId = responseBody.userId;
    expect (message).toEqual('Login Successfully');
    //console.log('Response Body:', responseBody);

    return {token,userId}

}

}