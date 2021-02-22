import { promises as fs } from "fs";
import { join } from "path";

export interface FsEntityDir {
    type: "directory";
    name: string;
    contents: FsEntity[];
}

export interface FsEntityFile {
    type: "file";
    name: string;
}

export type FsEntity = FsEntityDir | FsEntityFile;

/**
 * Get recursive tree of directory contents, sorted alphabetically, directories on top.
 */
export const getDirectoryTree = async (dirPath: string): Promise<FsEntity[]> => {
    const tree: FsEntity[] = [];
    const children = await fs.readdir(dirPath, { withFileTypes: true });

    for (const child of children) {
        if (child.isDirectory()) {
            const contents = await getDirectoryTree(join(dirPath, child.name));
            tree.push({ type: "directory", name: child.name, contents });
        } else {
            tree.push({ type: "file", name: child.name });
        }
    }

    return tree.sort(sortAlphabetically).sort(sortDirectoriesOnTop);
};

export const sortDirectoriesOnTop = (a: FsEntity, b: FsEntity): number => {
    if (a.type === "directory" && b.type !== "directory") {
        return -1;
    } else if (a.type !== "directory" && b.type === "directory") {
        return 1;
    }
    return 0;
};

export const sortAlphabetically = (a: FsEntity, b: FsEntity): number => {
    return a.name.localeCompare(b.name, "en");
};
