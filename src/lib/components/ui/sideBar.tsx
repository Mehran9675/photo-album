import { IconButton, styled } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import useToggle from "@/hooks/useToggle.ts";
import { NavLink } from "react-router-dom";
import { ROUTES } from "@/constants/routes.ts";
import CancelIcon from "@mui/icons-material/Cancel";
import { AnimatePresence, motion } from "framer-motion";

const Trigger = styled(IconButton)`
  position: fixed;
  color: white;
  box-shadow: var(--shadow-xl);
  z-index: 3;
  left: 10px;
  top: 10px;
`;
const Close = styled(IconButton)`
  position: absolute;
  width: fit-content;
  margin-left: auto;
  padding: 0;
  top: 10px;
  right: 10px;
  color: white;
`;

const Side = styled(motion.aside)`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--neutral-900);
  color: white;
  height: 100vh;
  width: 100%;
  max-width: 500px;
  box-sizing: content-box;
  z-index: 3;
`;
const Links = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
  span {
    font-size: 0.75rem;
  }
  a {
    text-decoration: none;
    font-size: 4rem;
    color: white;
  }
`;

const SideBar = () => {
  const [isSideBarVisible, toggleSideBar] = useToggle();

  return (
    <>
      <Trigger onClick={toggleSideBar}>
        <MenuIcon />
      </Trigger>
      <AnimatePresence mode="wait">
        {isSideBarVisible && (
          <Side
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.4 }}
          >
            <Close onClick={toggleSideBar}>
              <CancelIcon />
            </Close>
            <Links>
              <span>NAVIGATION</span>
              <NavLink
                style={({ isActive }) =>
                  isActive ? { textDecoration: "underline" } : null
                }
                to={ROUTES.HOME}
              >
                Home
              </NavLink>
              <NavLink
                style={({ isActive }) =>
                  isActive ? { textDecoration: "underline" } : undefined
                }
                to={ROUTES.FAVORITES}
              >
                Favorites
              </NavLink>
            </Links>
          </Side>
        )}
      </AnimatePresence>
    </>
  );
};
export default SideBar;
