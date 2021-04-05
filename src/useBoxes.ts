import { useContext } from "react";
import BoxContext from "./BoxContext";

export default function useBoxes() {
  return useContext(BoxContext);
}
