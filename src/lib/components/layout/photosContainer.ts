import { styled } from "@mui/material";

const PhotosContainer = styled("div")`
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fit, 280px);
  justify-content: center;
  width: 100%;
  padding: 0.5rem;
  gap: 5px;
`;
export default PhotosContainer;
