import { useEffect, useState } from "react";

export interface UseFetchResponse<R> {
  error: boolean;
  response: R[] | null | Blob | Response;
  isFetching: boolean;
  get: () => Promise<R[] | null | Blob | Response>;
}

interface Config {
  shouldFetch?: boolean;
  responseType:
    | "json"
    | "blob"
    | "text"
    | "arrayBuffer"
    | "formData"
    | "fetch-response";
}

const DEFAULT_CONFIG: Config = {
  responseType: "json",
};

const RESPONSE: Record<
  Config["responseType"],
  (data: Response) => Promise<any>
> = {
  json: async (data) => await data.json(),
  blob: async (data) => await data.blob(),
  text: async (data) => await data.text(),
  arrayBuffer: async (data) => await data.arrayBuffer(),
  formData: async (data) => await data.formData(),
  "fetch-response": async (data) => data,
};

const useFetch = <T>(
  endPoint: string,
  configuration?: Config
): UseFetchResponse<T> => {
  const config = configuration || DEFAULT_CONFIG;
  const [values, setData] = useState<T[] | null | Blob | Response>(null);
  const [isFetching, setIsFetching] = useState(config.shouldFetch !== false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (config.shouldFetch !== false) get(endPoint);
  }, []);

  const get = async (endPoint: string) => {
    try {
      setError(false);
      setIsFetching(true);
      const res = await fetch(endPoint);
      const data = await RESPONSE[config.responseType](res);
      setData(data);
      return data;
    } catch (e) {
      setError(true);
      setIsFetching(false);
    } finally {
      setIsFetching(false);
    }
  };

  return {
    get: () => get(endPoint),
    response: values || [],
    isFetching,
    error,
  } as const;
};
export default useFetch;
