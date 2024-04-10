import { test, expect } from "@playwright/test";
import path from "path";
import { promises as fsPromises } from "fs";
import { TEST_CONSTANTS } from "./constants";
import { deleteRecursively, waitForDirectory } from "./helpers";

test.describe("Feed Download", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(TEST_CONSTANTS.HOME_PAGE.URL);
        await page.waitForLoadState();
    });

    test("test test", async ({ page }) => {
        const pagetitle = await page.title();
        expect(pagetitle).toBe(TEST_CONSTANTS.HOME_PAGE.PAGE_TITLE);
    });

    test("input and submit button is in the DOM", async ({ page }) => {
        const input = page.getByTestId(TEST_CONSTANTS.SELECTORS.FEED_URL_INPUT);
        const button = page.getByTestId(TEST_CONSTANTS.SELECTORS.SUBMIT_BUTTON);

        await expect(input).toBeVisible();
        await expect(button).toBeVisible();
    });

    test("show error toast on form submit with empty input", async ({ page }) => {
        await page.getByTestId(TEST_CONSTANTS.SELECTORS.FEED_URL_INPUT).fill("");
        const button = page.getByTestId(TEST_CONSTANTS.SELECTORS.SUBMIT_BUTTON);
        await button.click();

        const errorToast = page.getByLabel("error-toast");
        await expect(errorToast).toBeVisible();
    });

    test("redirect to /filter and check URL parameters on successful form submission", async ({
        page,
    }) => {
        await page
            .getByTestId(TEST_CONSTANTS.SELECTORS.FEED_URL_INPUT)
            .fill(TEST_CONSTANTS.TEST_FEED_URL);
        const button = page.getByTestId(TEST_CONSTANTS.SELECTORS.SUBMIT_BUTTON);
        await button.click();

        await page.waitForURL(TEST_CONSTANTS.FILTER_PAGE.REGEX_URL);

        const url = page.url();
        const params = new URLSearchParams(url);
        const fileName = page.getByTestId(TEST_CONSTANTS.SELECTORS.FILENAME);
        const keys = await page.getByTestId(TEST_CONSTANTS.SELECTORS.KEY).all();

        expect(url).toContain(TEST_CONSTANTS.FILTER_PAGE.URL);
        expect(params.get(TEST_CONSTANTS.FILTER_PAGE.NAME_PARAM)).toBeDefined();
        expect(params.get(TEST_CONSTANTS.FILTER_PAGE.KEYS_PARAM)).toBeDefined();
        await expect(fileName).toBeVisible();

        expect(keys).toBeTruthy();
    });

    test("uploadedFiles directory is created", async () => {
        const directory = path.join(process.cwd(), TEST_CONSTANTS.FILE_OUTPUT_DIR);
        const directoryExists = await waitForDirectory(directory);
        expect(directoryExists).toBeTruthy();
    });

    test("uploadedFiles directory contains the expected files with matching names", async () => {
        const directory = path.join(process.cwd(), TEST_CONSTANTS.FILE_OUTPUT_DIR);

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

    test.afterAll(async () => {
        const directory = path.join(process.cwd(), TEST_CONSTANTS.FILE_OUTPUT_DIR);

        try {
            await deleteRecursively(directory);
        } catch (error) {
            console.error(error);
        }
    });
});
