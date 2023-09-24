import { ChangeEvent } from "react";
import { IconButton, styled } from "@mui/material";
import PARAMS from "@/constants/params.ts";
import useParams from "@/hooks/useParams.ts";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

const Container = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.25rem;
  color: white;
  background-color: var(--neutral-700);
  border-radius: 3px;
  gap: 3px;
  > button {
    color: white;
  }
`;

const Input = styled("input")`
  all: unset;
  border: none;
  width: 100%;
  background-color: transparent;
  &::placeholder {
    color: var(--neutral-300);
    font-weight: 300;
  }
`;

const Search = () => {
  const [params, setParams] = useParams();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setTimeout(() => setParams(PARAMS.SEARCH, event.target.value), 500);

  const handleClear = () => setParams(PARAMS.SEARCH, null);

  return (
    <Container>
      <SearchIcon />
      <Input
        placeholder="Search"
        onChange={handleChange}
        defaultValue={params[PARAMS.SEARCH]}
      />
      <IconButton disabled={!params[PARAMS.SEARCH]} onClick={handleClear}>
        <CloseIcon />
      </IconButton>
    </Container>
  );
};
export default Search;
