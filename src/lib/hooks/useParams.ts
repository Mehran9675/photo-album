import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const useParams = () => {
  const [searchParams, setSearchParams] = useState<Record<string, string>>({});
  const [params, updateSearchBar] = useSearchParams();

  useEffect(() => {
    parseParams();
  }, [params.toString()]);

  const parseParams = () => {
    const existingParams = new URLSearchParams(location.search);
    const result = {};
    for (const key of existingParams.keys()) {
      result[key] = existingParams.get(key);
    }
    setSearchParams(result);
  };

  const setParams = (key: string, value: string | number | null) => {
    const result = { ...searchParams };
    if (!value) delete result[key];
    else result[key] = value.toString();
    setSearchParams(result);
    return updateSearchBar(result);
  };
  return [searchParams, setParams] as const;
};
export default useParams;
