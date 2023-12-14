import { test, expect } from "@playwright/test";

test("renders FilterButtons component with default state", async ({ page }) => {
  await page.setContent(
    '<FilterButtons category="Color" options={["Red", "Blue", "Green"]} activeCategory={null} setActiveCategory={() => {}} resetKey={1} />'
  );

  // Check if the component renders without errors
  const button = await page.waitForSelector(".toggle-button");
  expect(button).toBeTruthy();

  // Check if the dropdown is initially hidden
  const dropdown = await page.$(".dropdown");
  expect(dropdown).toBeFalsy();
});

test("toggles dropdown when button is clicked", async ({ page }) => {
  await page.setContent(
    '<FilterButtons category="Color" options={["Red", "Blue", "Green"]} activeCategory={null} setActiveCategory={() => {}} resetKey={1} />'
  );

  // Click on the button to toggle the dropdown
  await page.click(".toggle-button");

  // Check if the dropdown is now visible
  const dropdown = await page.waitForSelector(".dropdown");
  expect(dropdown).toBeTruthy();
});

test("selects an option from the dropdown", async ({ page }) => {
  await page.setContent(
    '<FilterButtons category="Color" options={["Red", "Blue", "Green"]} activeCategory={null} setActiveCategory={() => {}} resetKey={1} />'
  );

  // Click on the button to open the dropdown
  await page.click(".toggle-button");

  // Click on an option in the dropdown
  await page.click(".dropdown-item");

  // Check if the selected option is displayed in the button
  const selectedOptionText = await page.textContent(".toggle-button");
  expect(selectedOptionText).toBeTruthy();
});
