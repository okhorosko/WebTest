import { AppComponent } from "./appComponen.page";
import { Cart } from "./cart.page";
import { Checkout } from "./checkout.page";
import { Dashboard } from "./dashboard.page";
import { Login } from "./login.page";
import { Product } from "./product.page";
import { SignUp } from "./signUp.page";

export class App extends AppComponent{
    loginPage = new Login(this.page)
    signUpPage = new SignUp(this.page)
    dashboardPage = new Dashboard(this.page)
    productPage = new Product(this.page)
    cartPage = new Cart(this.page)
    checkoutPage = new Checkout(this.page)
}