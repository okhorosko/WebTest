import { expect } from "@playwright/test";
import { AppComponent } from "./appComponen.page";

export class Cart extends AppComponent{
    [x: string]: any;

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

}