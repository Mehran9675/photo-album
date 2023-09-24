import { FC, HTMLProps } from "react";
import Filters from "@/components/layout/filters.tsx";
import { styled } from "@mui/material";
import SideBar from "@/components/ui/sideBar.tsx";

const Main = styled("main")`
  display: grid;
  align-items: flex-start;
  width: 100%;
  height: 100vh;
  overflow: auto;
`;

const PageContainer: FC<HTMLProps<HTMLDivElement>> = (props) => {
  return (
    <Main>
      <Filters />
      <SideBar />
      {props.children}
    </Main>
  );
};
export default PageContainer;
