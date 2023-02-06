import "./App.scss";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/Home";
import Characters from "./pages/Characters/Characters";
import Character from "./pages/Character/Character";
import About from "./pages/About";
import Episode from "./pages/Episode/Episode";
import Episodes from "./pages/Episodes/Episodes";
import Header from "./components/Header/Header";

const App = function () {
  return (
    <>
      <Header />
      <main className="section">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/characters/search" element={<Characters />} />
          <Route path="/episodes" element={<Episodes />} />
          <Route path="/episode/:episodeId" element={<Episode />} />
          <Route path="/character/:characterId" element={<Character />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
