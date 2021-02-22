import { useEffect, useState } from "react";

export interface QueryResult<T> {
    loading: boolean;
    data?: T;
    error?: Error;
    refetch(): void;
}

/**
 * Executes an async function and returns its state: loading, error, data.
 * Allows to refetch, and cancels in-flight queries on refetch and unmount.
 */
export function useQuery<T>(queryFn: () => Promise<T>): QueryResult<T> {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<T>();
    const [error, setError] = useState<Error>();
    const [fetchCount, setFetchCount] = useState(0);

    useEffect(() => {
        let cancelled = false;

        setLoading(true);
        queryFn().then(
            (data) => {
                if (!cancelled) {
                    setLoading(false);
                    setData(data);
                    setError(undefined);
                }
            },
            (error) => {
                if (!cancelled) {
                    setLoading(false);
                    setData(undefined);
                    setError(error);
                }
            }
        );

        return () => {
            cancelled = true;
        };
    }, [queryFn, fetchCount]);

    return { loading, data, error, refetch: () => setFetchCount(fetchCount + 1) };
}
