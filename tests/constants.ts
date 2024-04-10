import { TEST_SELECTORS } from "@/constants";

const TEST_CONSTANTS = {
    HOME_PAGE: {
        URL: "/",
        PAGE_TITLE: "Create Next App",
    },
    SELECTORS: TEST_SELECTORS,
    FILTER_PAGE: {
        URL: "/filter",
        REGEX_URL: "**/filter?*",
        URL_HOST: "http://localhost:3000",
        NAME_PARAM: "name",
        KEYS_PARAM: "keys",
    },
    FILE_OUTPUT_DIR: "src/uploadedFiles",
    TEST_FEED_URL: "https://www.baqa.com.tr/XMLExport/5E8A9B3E8A984DED8CE5D667CB56B5B9",
} as const;

export { TEST_CONSTANTS };
