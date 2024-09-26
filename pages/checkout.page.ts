import { expect } from "@playwright/test";
import { AppComponent } from "./appComponen.page";

export class Checkout extends AppComponent{

    async inputPaymentCredentials(){
        await this.page.locator('input[type="text"]').first().fill('4242424242424242');
        await this.page.getByRole('combobox').nth(1).selectOption('26');
        await this.page.locator('input[type="text"]').nth(1).fill('123');
        await this.page.getByPlaceholder('Select country').type('Ukraine');
        await this.page.getByRole('button', { name: ' Ukraine' }).click();

    }

    async completePayment(){
        await this.page.getByText('Place Order').click();
        await expect(this.page.getByRole('heading', { name: 'Thankyou for the order.' })).toBeVisible();
    }


    
}