import { useMemo, useState } from "react";

export interface UsePaginationResponse<T> {
  next: () => void;
  values: T[];
  allData: T[];
}

interface Config {
  pageSize: number;
  keepPrevData: boolean;
}

const DEFAULT_CONFIG: Config = {
  pageSize: 40,
  keepPrevData: true,
};

const usePagination = <T = null>(
  data: T[],
  config?: Config
): UsePaginationResponse<T> => {
  const configurations = config || DEFAULT_CONFIG;
  const [page, setPage] = useState(0);

  const paginated = useMemo(() => {
    const results = [];
    let page = [];
    if (!data) return results;
    data.forEach((value, index) => {
      if (index === data.length - 1) {
        page.push(value);
        results.push(page);
        return;
      }
      if (page.length < configurations.pageSize) {
        page.push(value);
      } else {
        results.push(page);
        page = [];
      }
    });
    return results;
  }, [data]);

  const values = useMemo(() => {
    if (!paginated.length) return [];
    let results = [];
    if (configurations.keepPrevData) {
      for (let i = 0; i <= page; ++i) {
        results = [...results, ...paginated[i]];
      }
    } else return paginated[page];

    return results;
  }, [page, data]);

  const next = () => {
    if (page + 1 >= paginated.length) return;
    setPage((page) => page + 1);
  };

  return { values, next, allData: data } as const;
};
export default usePagination;
