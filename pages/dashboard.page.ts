import { AppComponent } from "./appComponen.page";

export class Dashboard extends AppComponent{
    [x: string]: any;

    async openProduct(){
        await this.page.locator('[id="products"]').isVisible();
        await this.page.getByRole('button', { name: 'View' }).first().click();
    }

}