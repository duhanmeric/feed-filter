import { test, expect } from "@playwright/test";
import { deleteRecursively, waitForDirectory } from "./helpers";
import path from "path";
import { promises as fsPromises } from "fs";

test.describe("Feed Download Application Tests", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/");
        await page.waitForLoadState();
    });

    test.describe("Part 1: Initial Page and Form Submission", () => {
        test("check if initial elements are visible", async ({ page }) => {
            const input = page.getByTestId("feed-url-input");
            const button = page.getByTestId("submit-button");
            await expect(input).toBeVisible();
            await expect(button).toBeVisible();
        });

        test("display error toast on form submit with empty input", async ({ page }) => {
            await page.getByTestId("feed-url-input").fill("");
            const button = page.getByTestId("submit-button");
            await button.click();
            const errorToast = page.getByLabel("error-toast");
            await expect(errorToast).toBeVisible();
        });

        test("redirect to /filter and check URL parameters on successful form submission", async ({
            page,
        }) => {
            await page
                .getByTestId("feed-url-input")
                .fill("https://www.baqa.com.tr/XMLExport/5E8A9B3E8A984DED8CE5D667CB56B5B9");
            const button = page.getByTestId("submit-button");
            await button.click();
            await page.waitForURL("**/filter?*");

            const url = page.url();
            expect(url).toContain("/filter");

            expect(new URLSearchParams(url).get("name")).toBeDefined();
            expect(new URLSearchParams(url).get("keys")).toBeDefined();

            const fileName = page.getByTestId("fileName");
            await expect(fileName).toBeVisible();
        });
    });

    test.describe("Part 2: File and Directory Checks", () => {
        test("verify uploadedFiles directory is created", async () => {
            const directory = path.join(process.cwd(), "src/uploadedFiles");
            const directoryExists = await waitForDirectory(directory);
            expect(directoryExists).toBeTruthy();
        });

        test("check uploadedFiles directory contains the expected files with matching names", async () => {
            const directory = path.join(process.cwd(), "src/uploadedFiles");
            const uuidDirectories = await fsPromises.readdir(directory);

            for (const uuidDir of uuidDirectories) {
                const subDirectoryPath = path.join(directory, uuidDir);
                const stats = await fsPromises.stat(subDirectoryPath);

                if (stats.isDirectory()) {
                    const files = await fsPromises.readdir(subDirectoryPath);
                    const xmlFile = files.find((file) => file.endsWith(".xml"));
                    const jsonFile = files.find((file) => file.endsWith(".json"));

                    expect(xmlFile).toBeDefined();
                    expect(jsonFile).toBeDefined();

                    const xmlBaseName = xmlFile ? xmlFile.slice(0, -4) : "";
                    const jsonBaseName = jsonFile ? jsonFile.slice(0, -5) : "";
                    expect(xmlBaseName).toEqual(jsonBaseName);
                }
            }
        });
    });

    test.describe("Part 3: Key Selection and Form Interaction", () => {
        test.beforeEach(async ({ page }) => {
            await page.goto("/");
            await page.waitForLoadState();

            await page
                .getByTestId("feed-url-input")
                .fill("https://www.baqa.com.tr/XMLExport/5E8A9B3E8A984DED8CE5D667CB56B5B9");
            const submitButton = page.getByTestId("submit-button");
            await submitButton.click();

            await page.waitForURL("**/filter?*");
        });

        test("selecting number key", async ({ page }) => {
            const priceKey = page.getByLabel("key-check-g:price");
            await priceKey.click();
            await expect(priceKey).toHaveAttribute("aria-checked", "true");

            const keyForm = page.getByTestId("key-form");
            expect(keyForm).toBeVisible();

            const submitButton = page.getByTestId("submit-button");
            await submitButton.click();

            const errorToast = page.getByLabel("error-toast");
            await expect(errorToast).toBeVisible();

            const keyInput = page.getByTestId("key-input-g:price");
            await keyInput.fill("5000");
            await page.click('[data-testid="key-datatype-g:price"]');

            await page.waitForSelector('[id="g:price-select"]');
            await page.click('[id="g:price-select"] >> text=Number');

            await page.click('[data-testid="key-ncondition-g:price"]');
            await page.waitForSelector('[id="g:price-condition"]');
            await page.click('[id="g:price-condition"] >> text=GREATER THAN');

            await submitButton.click();
            const successToast = page.getByLabel("success-toast");
            await expect(successToast).toBeVisible();

            await page.waitForURL("**/file?*");
            const url = page.url();
            expect(url).toContain("/file");
        });

        // TODO: selecting string key
    });

    // TODO: Part 4: Rendering the results

    test.afterAll(async () => {
        const directory = path.join(process.cwd(), "src/uploadedFiles");
        try {
            await deleteRecursively(directory);
        } catch (error) {
            console.error(error);
        }
    });
});
