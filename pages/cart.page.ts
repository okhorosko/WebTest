import { expect } from "@playwright/test";
import { AppComponent } from "./appComponen.page";
import { dataSet } from "../utils/dataSet";

export class Cart extends AppComponent{
    [x: string]: any;

    async open(){
        await this.page.goto(`${dataSet.mainUrl}/client/dashboard/cart`);
    }
    
    async cartLoaded(){
        await expect(this.page.getByRole('heading', { name: 'ZARA COAT' })).toBeVisible();
    
        }

    async cartProductLoaded(){
        await expect(this.page.getByRole('heading', { name: 'ZARA COAT' })).toBeVisible();
        
    }

    async checkout(){
        await expect(this.page.getByRole('button', { name: 'Checkout❯'})).toBeVisible();
        await this.page.getByRole('button', { name: 'Checkout❯' }).click();

    }


    async continueShoping(){
        await this.page.getByRole('button', { name: 'Continue Shopping' }).click();
        await this.page.getByRole('button', { name: '   Cart' }).click();

    }

    async injectToken(token:string){
        this.page.addInitScript(value=>{
            window.localStorage.setItem('token',value)
        },token) 
        await this.open();

    }

}