import { APIRequestContext, expect, request } from "@playwright/test";
import { dataSet, validation } from "../utils/dataSet";

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

async addToCart(token:string,userId:string) {
    const apiContext = await request.newContext();
    const productId = "6581ca399fd99c85e8ee7f45"
    const addToCart = await apiContext.post(`${dataSet.mainUrl}/api/ecom/user/add-to-cart`, {
        headers: {
            Authorization: token, // token - doesn't work???    
        },
        data: {
            _id: userId,
            product: {
                _id: productId,
                productName: "ZARA COAT 3",
                productCategory: "fashion",
                productSubCategory: "shirts",
                productPrice: 31500,
                productDescription: "Zara coat for Women and girls",
                productImage: "https://rahulshettyacademy.com/api/ecom/uploads/productImage_1650649434146.jpeg",
                productRating: "0",
                productTotalOrders: "0",
                productStatus: true,
                productFor: "women",
                productAddedBy: "admin@gmail.com",
                __v: 0,
            },
        },
    });

    const responseBody = await addToCart.json();
    const message = responseBody.message;

    console.log('******');
    console.log('Response Body:', responseBody);
    expect (message).toEqual('Product Added To Cart');
    
    return{productId}
}

}

