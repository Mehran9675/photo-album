import { useState } from "react";

const useToggle = () => {
  const [state, setState] = useState(false);
  return [state, () => setState(!state)] as const;
};
export default useToggle;
