import { useMemo } from "react";

type Filter<T> = (data: T) => boolean;

const useFilterData = <T>(data: T[], filters: Filter<T>[]) => {
  return useMemo(() => {
    const result = [];
    for (const item of data) {
      if (filters.every((filter) => filter(item))) result.push(item);
    }
    return result;
  }, [data, filters]);
};
export default useFilterData;
