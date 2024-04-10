import path from "path";
import { promises as fsPromises } from "fs";

const waitForDirectory = async (dirPath: string, timeout = 10000) => {
    let timeElapsed = 0;
    const interval = 500;

    while (timeElapsed <= timeout) {
        try {
            await fsPromises.access(dirPath);
            return true;
        } catch {
            await new Promise((resolve) => setTimeout(resolve, interval));
            timeElapsed += interval;
        }
    }
    return false;
};

const deleteRecursively = async (dir: string) => {
    const files = await fsPromises.readdir(dir, { withFileTypes: true });

    for (const file of files) {
        const filePath = path.join(dir, file.name);
        if (file.isDirectory()) {
            await deleteRecursively(filePath);
            await fsPromises.rmdir(filePath);
        } else {
            await fsPromises.unlink(filePath);
        }
    }
};

export { waitForDirectory, deleteRecursively };
