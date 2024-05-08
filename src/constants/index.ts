const itemPerPage = 10;
const fileDestroyDuration = 1000 * 60 * 5;
const fileOutputDir = process.env.FILE_OUTPUT_DIR as string;

export { itemPerPage, fileDestroyDuration, fileOutputDir };
