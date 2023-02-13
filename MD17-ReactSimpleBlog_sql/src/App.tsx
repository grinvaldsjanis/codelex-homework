import "./App.scss";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import BlogPage from "./pages/BlogPage/BlogPage";
import About from "./pages/About/About";
import HeaderBar from "./components/Header/Header";
import ArticlePage from "./pages/ArticlePage/ArticlePage";
import NewArticlePage from "./pages/NewArticlePage/NewArticlePage";

const App = function () {
  return (
    <>
      <HeaderBar />
      <main className="section">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/article/:articleId" element={<ArticlePage />} />
          <Route path="/article/new" element={<NewArticlePage />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
