import { test, expect } from "@playwright/test";
import path from "path";
import { deleteRecursively, waitForDirectory } from "./helpers";
import { promises } from "fs";

// tests must run in serial mode instead of parallel
// because the tests are dependent on each other
// and the order of the tests is important
// I choose playwright because nextjs official document
// recommends e2e tests when working with async server actions

test.describe("ROOT: Feed Download", () => {
    test.describe.configure({ mode: "serial" });

    test.beforeEach(async ({ page }) => {
        await page.goto("/");
        await page.waitForLoadState();
    });

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

        await page.waitForSelector('[aria-label="error-toast"]', { state: "visible" });
        const errorToast = page.getByLabel("error-toast");
        await expect(errorToast).toBeVisible();
    });

    test.describe("NESTED PART 2", () => {
        test.describe.configure({ mode: "serial" });

        test.beforeEach(async ({ page }) => {
            await page.getByTestId("feed-url-input").fill("http://localhost:3000/api/xmlfile");
            const button = page.getByTestId("submit-button");
            await button.click();
            await page.waitForURL("**/filter?*");
        });

        test("redirect to /filter and check URL parameters on successful form submission", async ({
            page,
        }) => {
            const url = page.url();
            expect(url).toContain("/filter");

            expect(new URLSearchParams(url).get("name")).toBeDefined();
            expect(new URLSearchParams(url).get("keys")).toBeDefined();

            const fileName = page.getByTestId("fileName");
            await expect(fileName).toBeVisible();
        });

        test("verify uploadedFiles directory is created", async ({ page }) => {
            const directory = path.join(process.cwd(), "src/uploadedFiles");
            const directoryExists = await waitForDirectory(directory);
            expect(directoryExists).toBeTruthy();

            const uuidDirectories = await promises.readdir(directory);

            for (const uuidDir of uuidDirectories) {
                const subDirectoryPath = path.join(directory, uuidDir);
                const stats = await promises.stat(subDirectoryPath);

                if (stats.isDirectory()) {
                    const files = await promises.readdir(subDirectoryPath);
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

        test("selecting number key", async ({ page }) => {
            const priceKey = page.getByLabel("key-check-Price");
            await expect(priceKey).toBeVisible();
            await priceKey.click();
            await expect(priceKey).toHaveAttribute("aria-checked", "true");
            const keyForm = page.getByTestId("key-form");
            await expect(keyForm).toBeVisible();
        });

        test("selecting string key", async ({ page }) => {
            const colorKey = page.getByLabel("key-check-Color", { exact: true });
            await expect(colorKey).toBeVisible();
            await colorKey.click();
            await expect(colorKey).toHaveAttribute("aria-checked", "true");
            const keyForm = page.getByTestId("key-form");
            await expect(keyForm).toBeVisible();
        });

        test("invalid case: submitting the key form", async ({ page }) => {
            const colorKey = page.getByLabel("key-check-Color", { exact: true });
            await colorKey.click();

            const submitButton = page.getByTestId("submit-button");
            await submitButton.click();

            const errorToast = page.getByLabel("error-toast");
            await expect(errorToast).toBeVisible();
        });

        test("valid case: submitting the key form", async ({ page }) => {
            const colorKey = page.getByLabel("key-check-Color", { exact: true });
            await colorKey.click();

            const keyInput = page.getByTestId("key-input-Color");
            await keyInput.fill("White");
            await page.click('[data-testid="key-datatype-Color"]');

            await page.waitForSelector('[id="Color-select"]');
            await page.click('[id="Color-select"] >> text=String');

            await page.click('[data-testid="key-scondition-Color"]');
            await page.waitForSelector('[id="Color-condition"]');
            await page.click('[id="Color-condition"] >> text=INCLUDES');

            const submitButton = page.getByTestId("submit-button");
            await submitButton.click();

            const successToast = page.getByLabel("success-toast");
            await expect(successToast).toBeVisible();

            await page.waitForURL("**/file?*");

            const resultCount = page.getByTestId("result-count");
            await expect(resultCount).toHaveText("4");
        });
    });

    test.afterAll(async () => {
        const directory = path.join(process.cwd(), "src/uploadedFiles");
        try {
            await deleteRecursively(directory);
        } catch (error) {
            console.error(error);
        }
    });
});
