import { test, expect } from "@playwright/test";


// Use the test function to define your tests
test("Navigate to FoodCrawl page", async ({ page }) => {
  // Navigate to your home page (adjust the URL accordingly)
  await page.goto("http://localhost:3000");

  // Click the button to navigate to the FoodCrawl page
  await page.click("text=Click here to get a personalised foodcrawl map!");

  // Wait for the navigation to complete
  await page.waitForNavigation();

  // Check if the URL is as expected (adjust the URL accordingly)
  expect(page.url()).toBe("http://localhost:3000/foodcrawl");
});

test("Navigate to Restaurant Page for Al Forno from Home", async ({ page }) => {
  // Navigate to your home page URL
  await page.goto("http://localhost:3000");

  // Locate and click the element that should navigate to the restaurant page
  await page.click(
    "http://localhost:3000/restaurants/clqequqc6000xco2grcq9upus"
  );

  // Wait for navigation to complete
  await page.waitForNavigation();

  // Check if the URL has changed to the expected restaurant page URL
  expect(page.url()).toBe(
    "http://localhost:3000/restaurants/clqequqc6000xco2grcq9upus"
  );
});

test("Navigate to Restaurant Page for Andino's from Home", async ({ page }) => {
  // Navigate to your home page URL
  await page.goto("http://localhost:3000");

  // Locate and click the element that should navigate to the restaurant page
  await page.click(
    "http://localhost:3000/restaurants/clqequqc6000oco2g1rfxkbg3"
  );

  // Wait for navigation to complete
  await page.waitForNavigation();

  // Check if the URL has changed to the expected restaurant page URL
  expect(page.url()).toBe(
    "http://localhost:3000/restaurants/clqequqc6000oco2g1rfxkbg3"
  );
});

test("Navigate to User Profile from Home", async ({ page }) => {
  // Navigate to your home page URL
  await page.goto("http://localhost:3000");

  // Locate and click the element that should navigate to the user profile
  await page.click(
    "http://localhost:3000/users/user_2ZgkifBPIHcAYcMIyiOMhaFA5C6"
  );

  // Wait for navigation to complete
  await page.waitForNavigation();

  // Check if the URL has changed to the expected user profile URL
  expect(page.url()).toBe(
    "http://localhost:3000/users/user_2ZgkifBPIHcAYcMIyiOMhaFA5C6"
  );
});

test("Navigate form restaurant page home", async ({ page }) => {
  // Navigate from restaurant page 
  await page.goto(
    "http://localhost:3000/restaurants/clqequqc6000oco2g1rfxkbg3"
  );

  // Locate and click the element that should navigate to the user profile
  await page.click("http://localhost:3000/home");

  // Wait for navigation to complete
  await page.waitForNavigation();

  // Check if the URL has changed to the expected user profile URL
  expect(page.url()).toBe("http://localhost:3000/home");
});

test("Navigate from user profile page home", async ({ page }) => {
  await page.goto("http://localhost:3000/users");

  // Locate and click the element that should navigate to the user profile
  await page.click("http://localhost:3000/home");

  // Wait for navigation to complete
  await page.waitForNavigation();

  // Check if the URL has changed to the expected user profile URL
  expect(page.url()).toBe("http://localhost:3000/home");
});