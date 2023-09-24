import {
  createStorage,
  IStorageProperties,
} from "@/functions/createStorage.ts";

function useLocalStorage<T = string>(props: IStorageProperties<T>) {
  return createStorage<T>("localStorage", "use-local-storage")(props);
}
export default useLocalStorage;
