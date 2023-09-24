import PageContainer from "@/components/layout/pageContainer.tsx";
import { usePhotosContext } from "@/context/photosContext.tsx";
import { AnimatePresence } from "framer-motion";
import PhotosContainer from "@/components/layout/photosContainer.ts";
import NothingFound from "@/components/ui/nothingFound.tsx";
import { CircularProgress } from "@mui/material";

export default function Favorites() {
  const { favorites, isFetching, renderPhotos } = usePhotosContext();

  return (
    <>
      <PageContainer>
        <AnimatePresence>
          {favorites.length && (
            <PhotosContainer>{renderPhotos(favorites)}</PhotosContainer>
          )}
          {!favorites.length && !isFetching && <NothingFound />}
          {isFetching && (
            <CircularProgress sx={{ margin: "auto", color: "white" }} />
          )}
        </AnimatePresence>
      </PageContainer>
    </>
  );
}
