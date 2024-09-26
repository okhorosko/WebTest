import { AppComponent } from "./appComponen.page";

export class Dashboard extends AppComponent{
    [x: string]: any;

    async openProduct(){
        await this.page.locator('[id="products"]').isVisible();
        await this.page.getByRole('button', { name: 'View' }).first().click();
    }

    async openCart(){
        //await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds
        await this.page.getByRole('button', { name: '   Cart' }).click();

    }

}