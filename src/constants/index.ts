const env = process.env.NODE_ENV;

const itemPerPage = 10;
const fileDestroyDuration = env === "production" ? 1000 * 60 * 60 : 1000 * 60 * 5;
const fileOutputDir = process.env.FILE_OUTPUT_DIR || "uploadedFiles";

const TEST_SELECTORS = {
    FEED_URL_INPUT: "feed-url-input",
    SUBMIT_BUTTON: "submit-button",
    FILENAME: "fileName",
    KEY: "key-check",
    ERROR_TOAST: "error-toast",
};

export { itemPerPage, fileDestroyDuration, fileOutputDir, TEST_SELECTORS };
