const env = process.env.NODE_ENV

const itemPerPage = 10;
const fileDestroyDuration = env === "production" ? 1000 * 60 * 60 : 10000;
const fileOutputDir = process.env.FILE_OUTPUT_DIR || "uploadedFiles";

export {
    itemPerPage,
    fileDestroyDuration,
    fileOutputDir
}
