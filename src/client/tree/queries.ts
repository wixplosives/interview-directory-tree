import type { FsEntity } from "../../server/fs";

export async function fetchDirectoryTree(): Promise<FsEntity[]> {
    return fetch("/directory-tree").then((res) => res.json());
}

export async function renameFile(parentDirPath: string, oldName: string, newName: string): Promise<void> {
    await fetch(`/rename-file?parentDirPath=${parentDirPath}&oldName=${oldName}&newName=${newName}`);
}
