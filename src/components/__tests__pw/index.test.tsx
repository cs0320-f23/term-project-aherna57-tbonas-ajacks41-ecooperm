import React from "react";
import { render, screen } from "@testing-library/react";
import { test, expect } from "@playwright/test";


////////////////////////// LOGIN PAGE TESTS //////////////////////////

test("testing login goes to google auth", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page
    .getByRole("button", { name: "Sign in with Google Continue" })
    .click();
  await expect(page.url()).toContain("google");
  // check text appearance
  const textElement = await page.getByText("Use your Google Account");
  const textContent = await textElement.textContent();
  expect(textContent).toContain("Use your Google Account");
});

test("checking redirection to login page", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  const bearLogoHeading = await page.getByRole("heading", {
    name: "Bear Logo Bites",
  });
  //bear logo and heading check
  expect(bearLogoHeading).toBeTruthy();
  //sign in text check
  const signInHeading = await page.getByRole("heading", { name: "Sign in" });
  expect(signInHeading).toBeTruthy();
  //tease text check
  const tasteProvidenceHeading = await page.getByRole("heading", {
    name: "Taste the Providence, one",
  });
  expect(tasteProvidenceHeading).toBeTruthy();
});

////////////////////////// HOME PAGE TESTS //////////////////////////

test("Sort items by price from low to high", async ({ page } : any) => {
  await page.goto("http://localhost:3000/home");
  await page.getByRole("button", { name: "Price▼" }).click();
  await page.getByText("Low to High").click();
  await page.waitForTimeout(1000);
  const prices = await page.$$eval(".item-price-selector", (elements : any) =>
    elements.map((e : any) => parseFloat(e.textContent.replace(/[^0-9.]/g, "")))
  );
  // Check if the prices array is sorted in ascending order
  for (let i = 0; i < prices.length - 1; i++) {
    expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
  }
});

test("Filter items by Vegan dietary restriction", async ({ page } : any) => {
  await page.goto("http://localhost:3000/home");
  await page.getByRole("button", { name: "Dietary Restrictions▼" }).click();
  await page.getByText("Vegan", { exact: true }).click();
  await page.waitForTimeout(1000);
  const items = await page.$$eval(".item-selector", (elements : any) =>
    elements.map((e : any) => e.textContent)
  );
  for (const item of items) {
    expect(item).toMatch(/Vegan/);
  }
});

test("Filter items by Lebanese cuisine", async ({ page }) => {
  await page.goto("http://localhost:3000/home");
  await page.getByRole("button", { name: "Cuisine▼" }).click();
  await page.getByText("Lebanese").click();
  await page.waitForTimeout(1000);
  const items = await page.$$eval(".item-selector", (elements : any) =>
    elements.map((e : any) => e.textContent)
  );
  for (const item of items) {
    expect(item).toMatch(/Lebanese/); 
  }
});

test("Filter items by ratings", async ({ page } : any) => {
  await page.goto("http://localhost:3000/home");
  await page.getByRole("button", { name: "Ratings▼" }).click();
  await page.getByText("4 Stars and up").click();
  await page.waitForTimeout(1000);
  const ratings = await page.$$eval(".item-rating-selector", (elements : any) =>
    elements.map((e : any) => parseFloat(e.textContent))
  );
  for (const rating of ratings) {
    expect(rating).toBeGreaterThanOrEqual(4);
  }
});

////////////////////////// USER PAGE TESTS //////////////////////////

test("check name is in header", async ({ page }) => {
  await page.goto("http://localhost:3000/users/user_2ZgfFvpAoMX62etO3HvNAVyC80o");
  await page.getByText("Amanda Hernandez Sandate").click();
  await expect(page).toHaveURL(/.*user_2ZgfFvpAoMX62etO3HvNAVyC80o/);
  await expect(page.locator(".user-profile-selector")).toBeVisible();
});

test("check redirection to restaurant page", async ({ page }) => {
  await page.goto("http://localhost:3000/users/user_2ZgfFvpAoMX62etO3HvNAVyC80o");
  await page.getByText("Amanda Hernandez Sandate").click();
  // verify detail is displayed
  await expect(page.locator(".profile-detail-selector")).toBeVisible();
  await page.getByRole("link", { name: "Bacaro" }).click();
  await expect(page).toHaveURL(/.*clqequqc6000tco2gto55xo02/);
  await page.getByText("Bacaro").click();
  await expect(page.locator(".final-action-confirmation-selector")).toBeVisible();
});


test("check rendering of user about", async ({ page }) => {
  await page.goto("http://localhost:3000/users/user_2ZgfFvpAoMX62etO3HvNAVyC80o");
  await page.getByText("About").click();
  await expect(page.locator(".about-section-selector")).toBeVisible();
  await page.getByText("Email:").click();
  await expect(page.locator(".email-display-selector")).toBeVisible();
  await page.getByText("amanda_hernandez_sandate@").click();
  await page.getByText("Suggestions").click();
  await expect(page.locator(".suggestions-section-selector")).toBeVisible();
});



