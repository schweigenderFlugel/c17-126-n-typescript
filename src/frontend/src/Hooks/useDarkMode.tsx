import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

export const useDarkMode = () => {
  const { darkMode, setDarkMode } = useContext(AuthContext);
} 