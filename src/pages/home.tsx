import PageContainer from "@/components/layout/pageContainer.tsx";
import { usePhotosContext } from "@/context/photosContext.tsx";
import InfiniteLoad from "@/components/util/infiniteLoad.tsx";
import { AnimatePresence } from "framer-motion";
import PhotosContainer from "@/components/layout/photosContainer.ts";
import NothingFound from "@/components/ui/nothingFound.tsx";
import { CircularProgress } from "@mui/material";

export default function Home() {
  const { next, photos, isFetching, renderPhotos } = usePhotosContext();

  return (
    <>
      <PageContainer>
        <AnimatePresence>
          {photos.length && !isFetching && (
            <PhotosContainer>
              <InfiniteLoad load={next}>{renderPhotos(photos)}</InfiniteLoad>
            </PhotosContainer>
          )}
          {!photos.length && !isFetching && <NothingFound />}
          {isFetching && !photos.length && (
            <CircularProgress sx={{ margin: "auto", color: "white" }} />
          )}
        </AnimatePresence>
      </PageContainer>
    </>
  );
}
