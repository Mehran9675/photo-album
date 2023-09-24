import { useInView } from "react-intersection-observer";
import { FC, HTMLProps, useEffect } from "react";

interface Props extends HTMLProps<HTMLDivElement> {
  load: () => void;
}

const InfiniteLoad: FC<Props> = (props) => {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) props.load();
  }, [inView]);

  return (
    <>
      {props.children}
      <legend ref={ref} aria-label="infinite load trigger" />
    </>
  );
};
export default InfiniteLoad;
