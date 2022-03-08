import { BrowserRouter } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { AppRouter } from "./components/Routes";

export const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
};
