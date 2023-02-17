import "./App.scss";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import About from "./pages/Results/Results";
import HeaderBar from "./components/Header/Header";
import GamePage from "./pages/GamePage/GamePage";
import Footer from "./components/Footer/Footer";
import './i18n/config';


const App = function () {


  return (
    <>
      <HeaderBar />
      <main className="section">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
