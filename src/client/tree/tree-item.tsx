import classNames from "classnames";
import { ChangeEvent, FC, KeyboardEvent, useState } from "react";
import type { FsEntity } from "../../server/fs";
import { FileIcon, FolderIcon, PencilIcon } from "../icons";
import { renameFile } from "./queries";
import styles from "./tree-item.css";

export interface TreeItemProps {
    fsEntity: FsEntity;
    parentDirPath: string;
    parentDirContents: FsEntity[];
    onChange(): void;
}

/**
 * A single item in the tree. Either a file or a directory.
 */
export const TreeItem: FC<TreeItemProps> = ({ fsEntity, parentDirPath, parentDirContents, onChange }) => {
    const [rename, setRename] = useState(false);
    const [newName, setNewName] = useState(fsEntity.name);
    const [error, setError] = useState("");

    const onInputChange = (event: ChangeEvent) => {
        const { value } = event.target as any;
        const count = parentDirContents.filter((sinbling) => sinbling.name === value);
        if (count.length === 1 && value !== fsEntity.name) {
            setNewName(value);
            setError(`A file or folder ${newName} already exists.Please chose a diferent name.`);
        } else {
            setNewName(value);
            setError("");
        }
    };

    const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            setRename(false);
        }

        if (event.key === "Enter") {
            if (!error) {
                renameFile(parentDirPath, fsEntity.name, newName);
                onChange();
                setRename(false);
            }
        }
    };

    const onblur = () => {
        if (!error) {
            renameFile(parentDirPath, fsEntity.name, newName);
            onChange();
            setRename(false);
        } else {
            setRename(false);
        }
    };

    return (
        <div className={styles.root}>
            {fsEntity.type === "directory" ? (
                <FolderIcon className={styles.fileTypeIcon} />
            ) : (
                <FileIcon className={styles.fileTypeIcon} />
            )}
            {!rename ? (
                <div className={styles.name}>{fsEntity.name}</div>
            ) : (
                <div className={styles.nameEdit}>
                    <input
                        className={classNames(styles.nameInput, { [styles.nameInputInvalid]: error })}
                        value={newName}
                        onChange={onInputChange}
                        onKeyDown={onKeyDown}
                        onBlur={onblur}
                        spellCheck={false}
                        autoFocus
                    />
                    {error && <div className={styles.nameInputError}>{error}</div>}
                </div>
            )}
            {!rename ? <PencilIcon className={styles.editIcon} onClick={() => setRename(true)} /> : null}
        </div>
    );
};
