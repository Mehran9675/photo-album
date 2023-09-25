import { useEffect, useState } from "react";

type Value<T> = T extends Blob
  ? Blob
  : T extends Response
  ? Response
  : T | null;
export interface UseFetchResponse<R> {
  error: boolean;
  response: Value<R>;
  isFetching: boolean;
  get: () => Promise<Value<R>>;
}

interface Config {
  defaultValue?: any;
  shouldFetch?: boolean;
  responseType?:
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
  (data: Response) => Promise<Value<any>>
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
  const config = { ...DEFAULT_CONFIG, ...configuration };
  const [response, setResponse] = useState<Value<T>>(
    config.defaultValue || null
  );
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
      setResponse(data);
      return data;
    } catch (e) {
      console.error(e);
      setError(true);
      setIsFetching(false);
    } finally {
      setIsFetching(false);
    }
  };

  return {
    get: () => get(endPoint),
    response,
    isFetching,
    error,
  } as const;
};
export default useFetch;
