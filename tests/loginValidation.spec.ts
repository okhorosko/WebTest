import test, { expect, request } from "@playwright/test";
import { dataSet, validation } from "../utils/dataSet";
import { App } from "../pages/app";
import { Api } from "../pages/api";

let app;

test.describe.only("Login Validation", () => {
  let user;

  test.beforeEach(async ({ page }) => {
    app = new App(page);
    const apiContext = await request.newContext();
    const api = new Api(apiContext);
    user = await api.createUser(dataSet.userEmail);

    await app.loginPage.open();
  });

  test("Login validation. Incorrect password", async ({ page }) => {
    await app.loginPage.inputLoginCreadentials(
      user.email,
      validation.PasswordIncorrect
    );
    await expect(page.getByText("Incorrect email or password.")).toBeVisible();
  });

  test("Login validation. Incorrect Email", async ({ page }) => {
    await app.loginPage.inputLoginCreadentials(
      validation.EmailIncorrect,
      dataSet.userPassword
    );
    await expect(page.getByText("Incorrect email or password.")).toBeVisible();
  });

  test("Login validation. Incorrect Email format", async ({ page }) => {
    await app.loginPage.inputLoginCreadentials(
      validation.EmailWithoutDog,
      dataSet.userPassword
    );
    await expect(page.getByText("*Enter Valid Email")).toBeVisible();
  });

  test("Login validation. Empty Password", async ({ page }) => {
    await app.loginPage.inputLoginCreadentials(
      dataSet.userEmail,
      validation.PasswordEmpty
    );
    await expect(page.getByText("*Password is required")).toBeVisible();
  });
});

