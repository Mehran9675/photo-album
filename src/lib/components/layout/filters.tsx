import Search from "@/components/ui/search.tsx";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { IconButton, styled } from "@mui/material";
import FilterByAuthor from "@/components/ui/filter.tsx";
import useToggle from "@/hooks/useToggle.ts";
import useParams from "@/hooks/useParams.ts";

const Trigger = styled(IconButton)`
  position: fixed;
  color: white;
  box-shadow: var(--shadow-xl);
  z-index: 2;
  top: 10px;
  right: 10px;
  &[data-show] {
    top: 60px;
    right: -40px;
  }
  &[data-show="true"] {
    right: 10px;
  }
`;

const Container = styled("aside")`
  position: fixed;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  background-color: var(--neutral-900);
  box-shadow: var(--shadow-xl);
  border-radius: 5px;
  width: 250px;
  top: 10px;
  right: -100%;
  z-index: 2;
  transition: right 300ms;
  gap: 1rem;
  &[data-show="true"] {
    right: 20px;
  }
`;

const Close = styled(IconButton)`
  width: fit-content;
  margin-left: auto;
  padding: 0;
  color: white;
`;

const Filters = () => {
  const [areFiltersVisible, toggleFilters] = useToggle();
  const [params] = useParams();
  const hasFilters = !!Object.keys(params).length;
  const clearFilters = () => (location.search = "");
  return (
    <>
      <Trigger title="Show filters" onClick={toggleFilters}>
        <SearchIcon />
      </Trigger>
      <Trigger
        title="Clear filters"
        onClick={clearFilters}
        data-show={hasFilters}
      >
        <FilterAltOffIcon />
      </Trigger>
      <Container data-show={areFiltersVisible}>
        <Close onClick={toggleFilters}>
          <CancelIcon />
        </Close>
        <Search />
        <FilterByAuthor />
      </Container>
    </>
  );
};
export default Filters;
