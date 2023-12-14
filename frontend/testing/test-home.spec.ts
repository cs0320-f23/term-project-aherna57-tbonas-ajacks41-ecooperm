import { test, expect } from "@playwright/test";
import { render, screen } from "@testing-library/react";

test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/");
});

test("test going to homepage without logging in", async ({ page }) => {
    await page.getByRole("heading", { name: "Bear Logo Bites" }).click();
    await page.getByRole("img", { name: "Logo" }).click();
    await page
      .getByRole("heading", { name: "Taste the Providence, one" })
      .click();
    await page
      .frameLocator('iframe[title="Sign in with Google Button"]')
      .locator("#container");


//   await page.getByLabel("Command input").click();
//   await page
//     .getByLabel("Command input")
//     .fill("filter -71.410972 -71.410972 41.859843 41.859843");
//   await page.waitForSelector('role=button[name="Submit"]');
//   await page.getByRole("button", { name: "Submit" }).click();
//   await page.waitForSelector("text=9512");
//   const text1 = await page.locator("text=9512");
//   await expect(text1).toBeVisible();
//   await page.waitForSelector("text=9511");
//   const text4 = await page.locator("text=9511");
//   await expect(text4).toBeVisible();
//   await page.screenshot({
//     path: "tests/mocked-backend/testing-images/integration-basic-1.png",
//     fullPage: true,
//   });
});
