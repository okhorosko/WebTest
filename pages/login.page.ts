import { AppComponent } from "./appComponen.page";

export class Login extends AppComponent{
async open(){
    await this.page.goto("https://rahulshettyacademy.com/client");

}

    async inputLoginCreadentials(email: string, userPassword: string){
    
        await this.page.getByRole('button', { name: 'Login' }).click();
        await this.page.locator('[id="userEmail"]').fill(email);
        await this.page.locator('[id="userPassword"]').fill(userPassword);
        await this.page.getByRole('button', { name: 'Login' }).click();

    }

}