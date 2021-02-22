import { FC, Fragment } from "react";
import type { FsEntity } from "../../server/fs";
import { TreeItem } from "./tree-item";
import styles from "./tree.css";

export interface TreeDirProps {
    path: string;
    contents: FsEntity[];
    onChange(): void;
}

/**
 * List of items in a directory.
 */
export const TreeDir: FC<TreeDirProps> = ({ path, contents, onChange }) => {
    return (
        <div className={styles.dir}>
            {contents.map((item) => (
                <Fragment key={item.name}>
                    <TreeItem fsEntity={item} parentDirPath={path} parentDirContents={contents} onChange={onChange} />
                    {item.type === "directory" && (
                        <TreeDir path={path + "/" + item.name} contents={item.contents} onChange={onChange} />
                    )}
                </Fragment>
            ))}
        </div>
    );
};
