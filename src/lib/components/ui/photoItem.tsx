import { ImageDetails } from "@/types/apiResponse";
import {
  CircularProgress,
  IconButton,
  styled,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CancelIcon from "@mui/icons-material/Cancel";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { FC, SyntheticEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FileSaver from "file-saver";
import stopPropagation from "@/functions/stopPropagation.ts";
import PARAMS from "@/constants/params.ts";
import useParams from "@/hooks/useParams.ts";
import useFetch from "@/hooks/useFetch.ts";

const Container = styled(motion.div)`
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow-xl);
  cursor: pointer;
  border-radius: 2px;
  width: 280px;
  height: 200px;
  object-fit: contain;
  &[data-selected="true"] {
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 5;
    top: 0;
    left: 0;
    border-radius: 0;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.9);
  }
`;

const Footer = styled("footer")`
  display: flex;
  flex-direction: column;
  position: absolute;
  align-items: flex-start;
  justify-content: space-between;
  background: rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  width: 100%;
  height: 4.25rem;
  backdrop-filter: blur(5px);
  color: white;
  left: 0;
  bottom: 0;
  > div {
    display: flex;
    gap: 0.5rem;
    button {
      color: rgba(255, 255, 255, 0.6);
      padding: 0;
    }
  }
  &[data-selected="true"] {
    background-color: transparent;
    height: 5.5rem;
    padding: 0.25rem 1rem 1rem;
  }
`;

const PhotoItem: FC<{
  photo: ImageDetails;
  animationDelay: number;
  isFavorite: boolean;
  addToFavorites: () => void;
  isSelected: boolean;
  layoutID: string;
}> = (props) => {
  const [_, setParams] = useParams();
  const { isFetching, get } = useFetch(props.photo.src.original, {
    shouldFetch: false,
    responseType: "blob",
  });

  const unSelect = (event: SyntheticEvent) => {
    stopPropagation(event);
    setParams(PARAMS.PHOTO_ID, null);
  };
  const download = async () => {
    FileSaver.saveAs((await get()) as Blob);
  };

  const viewDetails = () => setParams(PARAMS.PHOTO_ID, props.photo.id);

  return (
    <AnimatePresence>
      <Container
        data-selected={props.isSelected}
        layoutId={props.layoutID}
        onClick={viewDetails}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        animate={{
          opacity: 1,
        }}
        whileHover={
          !props.isSelected && {
            scale: 1.05,
            zIndex: 1,
          }
        }
        transition={
          !props.isSelected && {
            duration: 0.2,
            opacity: { duration: props.animationDelay },
          }
        }
      >
        {props.isSelected && (
          <IconButton
            onClick={unSelect}
            sx={{ position: "absolute", right: "0", color: "white" }}
            aria-label="close"
          >
            <CancelIcon />
          </IconButton>
        )}
        <img
          alt={props.photo.alt}
          width={props.isSelected ? "100%" : "280"}
          height={props.isSelected ? "auto" : "200"}
          loading="eager"
          src={
            props.isSelected ? props.photo.src.landscape : props.photo.src.tiny
          }
        />
        <Footer data-selected={props.isSelected}>
          <div onClick={stopPropagation}>
            <IconButton onClick={props.addToFavorites}>
              <FavoriteIcon color={props.isFavorite ? "error" : undefined} />
            </IconButton>
            <IconButton onClick={download}>
              {isFetching ? (
                <CircularProgress size={15} />
              ) : (
                <FileDownloadIcon />
              )}
            </IconButton>
          </div>
          <Typography
            width={props.isSelected ? "100%" : "270px"}
            noWrap
            variant="body2"
          >
            {props.photo.alt}
          </Typography>
        </Footer>
      </Container>
    </AnimatePresence>
  );
};
export default PhotoItem;
