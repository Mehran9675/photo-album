import {
  createContext,
  FC,
  HTMLProps,
  ReactNode,
  useContext,
  useMemo,
} from "react";
import useFetch from "@/hooks/useFetch.ts";
import { ImageDetails } from "@/types/apiResponse";
import { END_POINTS } from "@/constants/endPoints.ts";
import useLocalStorage from "@/hooks/useLocalStorage.ts";
import LS_KEYS from "@/constants/localStorageKeys.ts";
import PARAMS from "@/constants/params.ts";
import useParams from "@/hooks/useParams.ts";
import useFilterData from "@/hooks/useFilterData.ts";
import usePagination from "@/hooks/usePagination.ts";
import PhotoItem from "@/components/ui/photoItem.tsx";
import { AnimatePresence } from "framer-motion";

interface PhotosContext {
  addToFavorites: (id: number) => () => void;
  authors: { name: string; id: number }[];
  favorites: ImageDetails[];
  favoritesCache: number[];
  photos: ImageDetails[];
  renderPhotos: (data: ImageDetails[]) => ReactNode[];
  isFetching: boolean;
  next: () => void;
}

const PhotosContextInstance = createContext<PhotosContext>({} as PhotosContext);
export const usePhotosContext = () => useContext(PhotosContextInstance);

const PhotosContextProvider: FC<HTMLProps<HTMLDivElement>> = (props) => {
  const [params] = useParams();
  const { response, isFetching } = useFetch<ImageDetails>(END_POINTS.IMAGES);
  const { allData, next, values } = usePagination<ImageDetails>(
    response as ImageDetails[]
  );
  const [favoritesCache, setFavoritesCache] = useLocalStorage({
    key: LS_KEYS.FAVORITES,
    defaultValue: [],
  });
  const isSearching = !!(params[PARAMS.SEARCH] || params[PARAMS.AUTHOR_ID]);

  const authors = useMemo(() => {
    const ids = [];
    const results = [];
    for (const photo of allData) {
      if (!ids.includes(photo.photographer_id))
        results.push({ name: photo.photographer, id: photo.photographer_id });
      ids.push(photo.photographer_id);
    }
    return results;
  }, [allData]);

  const allFavorites = useMemo(
    () => allData.filter((photo) => favoritesCache.includes(photo.id)),
    [allData, favoritesCache]
  );

  const favorites = useFilterData(allFavorites, [
    (photo) =>
      photo.alt
        .toLowerCase()
        .includes((params[PARAMS.SEARCH] || "").toLowerCase()),
  ]);

  const searchedPhotos = useFilterData(allData, [
    (photo) =>
      photo.alt
        .toLowerCase()
        .includes((params[PARAMS.SEARCH] || "").toLowerCase()),
    (photo) =>
      params[PARAMS.AUTHOR_ID]
        ? photo.photographer_id.toString() === params[PARAMS.AUTHOR_ID]
        : true,
  ]);

  const addToFavorites = (id: number) => () => {
    if (favoritesCache.includes(id))
      return setFavoritesCache(
        favoritesCache.filter((fav: number) => fav !== id)
      );
    return setFavoritesCache([...favoritesCache, id]);
  };

  const renderPhotos = (photos: ImageDetails[]) => {
    const renders = [];
    let animationDelay = 0.3;
    for (const photo of photos) {
      const selected = params[PARAMS.PHOTO_ID] === photo.id.toString();
      if (animationDelay >= 2) animationDelay = 0.3;
      renders.push(
        <>
          <PhotoItem
            isFavorite={favoritesCache.includes(photo.id)}
            addToFavorites={addToFavorites(photo.id)}
            animationDelay={animationDelay}
            isSelected={selected}
            layoutID={photo.id.toString()}
            key={photo.id}
            photo={photo}
          />
          <AnimatePresence mode="wait">
            {selected && (
              <PhotoItem
                isFavorite={favoritesCache.includes(photo.id)}
                addToFavorites={addToFavorites(photo.id)}
                animationDelay={animationDelay}
                isSelected={selected}
                layoutID={params[PARAMS.PHOTO_ID]}
                key={photo.id}
                photo={photo}
              />
            )}
          </AnimatePresence>
        </>
      );
      animationDelay += 0.3;
    }
    return renders;
  };

  return (
    <PhotosContextInstance.Provider
      value={{
        photos: isSearching ? searchedPhotos : values,
        favoritesCache,
        addToFavorites,
        renderPhotos,
        isFetching,
        favorites,
        authors,
        next,
      }}
    >
      {props.children}
    </PhotosContextInstance.Provider>
  );
};
export default PhotosContextProvider;
