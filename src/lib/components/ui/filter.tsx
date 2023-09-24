import { NativeSelect } from "@mui/material";
import { usePhotosContext } from "@/context/photosContext.tsx";
import PARAMS from "@/constants/params.ts";
import useParams from "@/hooks/useParams.ts";
import { ChangeEvent } from "react";

const FilterByAuthor = () => {
  const { authors } = usePhotosContext();
  const [params, setParams] = useParams();

  const handleSetFilter = (event: ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === "author")
      return setParams(PARAMS.AUTHOR_ID, null);
    setParams(PARAMS.AUTHOR_ID, event.target.value);
  };
  const renderAuthors = (author) => (
    <option key={author.id} value={author.id}>
      {author.name}
    </option>
  );
  return (
    <NativeSelect
      sx={{
        background: "var(--neutral-700)",
        padding: " 0.25rem",
        borderRadius: "3px",
        color: "white",
      }}
      onChange={handleSetFilter}
      size="small"
      variant="standard"
      value={params[PARAMS.AUTHOR_ID] || "author"}
    >
      <option value="author">Author</option>
      {authors.map(renderAuthors)}
    </NativeSelect>
  );
};
export default FilterByAuthor;
