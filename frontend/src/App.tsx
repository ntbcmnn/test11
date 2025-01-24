import "./App.css";
import Toolbar from "./Components/UI/Toolbar/Toolbar.tsx";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./Containers/LoginPage/LoginPage.tsx";
import RegisterPage from "./Containers/RegisterPage/RegisterPage.tsx";

const App = () => {
  return (
    <>
      <Toolbar />
      <div className="container my-5">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="*"
            element={<h3 className="text-center">Page not found</h3>}
          />
        </Routes>
      </div>
    </>
  );
};

export default App;
