import type { FC } from "react";
import { useQuery } from "../hooks/use-query";
import { fetchDirectoryTree } from "./queries";
import { TreeDir } from "./tree-dir";
import styles from "./tree.css";

export const TreeRoot: FC = () => {
    const { data, error, refetch } = useQuery(fetchDirectoryTree);

    if (error) {
        return <div className={styles.root}>Error</div>;
    }

    if (!data) {
        return <div className={styles.root}>Loading</div>;
    }

    return (
        <div className={styles.root}>
            <TreeDir path="" contents={data} onChange={refetch} />
        </div>
    );
};
