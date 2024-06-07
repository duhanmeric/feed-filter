const itemPerPage = 10;
const fileDestroyDuration = 1000 * 60 * 60;
const fileOutputDir = process.env.FILE_OUTPUT_DIR as string;
const cookieNames = {
    fileName: "fileName",
    keys: "keys",
    filters: "filters",
}

export { itemPerPage, fileDestroyDuration, fileOutputDir, cookieNames };
