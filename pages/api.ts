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

expect (createUser.ok()).toBeTruthy();
return {email}

};


}