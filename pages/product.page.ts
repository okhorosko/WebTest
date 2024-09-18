import { AppComponent } from "./appComponen.page";

export class Product extends AppComponent{
    [x: string]: any;

    async addToCart(){
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 seconds
        await this.page.getByRole('button', { name: 'Add to Cart' }).click();
        await this.page.getByRole('button', { name: '   Cart' }).click();

    }

}