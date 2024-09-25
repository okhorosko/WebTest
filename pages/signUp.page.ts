import { dataSet } from "../utils/dataSet";
import { AppComponent } from "./appComponen.page";

export class SignUp extends AppComponent{
    [x: string]: any;
    async open(){
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async inputSignUpCreadentials(){
        await this.page.locator('[href="/client/auth/register"]').click();
        await this.inputFirstName(dataSet.firstName);
        await this.page.locator('[id="lastName"]').fill(dataSet.lastName);
        await this.page.locator('[id="userEmail"]').fill(dataSet.userEmail);
        await this.page.locator('[id="userMobile"]').fill(dataSet.userMobile);
        await this.page.locator('[id="userPassword"]').fill(dataSet.userPassword);
        await this.page.locator('[id="confirmPassword"]').fill(dataSet.userPassword);
        await this.page.getByLabel('Male', { exact: true }).check();
        await this.page.getByRole('combobox').selectOption('2: Student');
        await this.page.getByRole('checkbox').check();
        //await this.clickregisterButton();

    }

    async inputSignUpEmail(email:string){
        await this.page.locator('[id="userEmail"]').fill(email);
        

    }

    async inputSignUpPass(userPassword:string){
        await this.page.locator('[id="userPassword"]').fill(userPassword);
        
    }

    async inputSignUpPassConfirm(userPasswordConfirm:string){
        await this.page.locator('[id="confirmPassword"]').fill(userPasswordConfirm);
        
    }

    async clickregisterButton(){
        await this.page.getByRole('button', { name: 'Register' }).click();
    }

    async inputFirstName(firstName:string){
        await this.page.locator('[id="firstName"]').fill(firstName);

}

}