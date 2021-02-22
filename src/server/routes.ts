import fs from "fs";
import path from "path";
import { Router } from "express";
import { getDirectoryTree } from "./fs";

/**
 * Path to the directory containing user files.
 */
const USER_FILES_DIR = path.resolve(__dirname, "..", "..", "user-files");

export const router = Router();

router.get("/directory-tree", async (_req, res) => {
    res.json(await getDirectoryTree(USER_FILES_DIR));
});

router.get("/rename-file", (req, res) => {
    fs.renameSync(
        `${USER_FILES_DIR}/${req.query.parentDirPath}/${req.query.oldName}`,
        `${USER_FILES_DIR}/${req.query.parentDirPath}/${req.query.newName}`
    );
    res.sendStatus(200);
});
