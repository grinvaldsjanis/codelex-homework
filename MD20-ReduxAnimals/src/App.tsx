
import AnimalList from "./components/AnimalList";
import AnimalForm from "./components/AnimalForm";
import Header from "./components/Header";
import "./App.scss";

function App() {

  return (
    <div className="wrapper">
      <Header/>
      <AnimalList />
      <AnimalForm />
    </div>
  );
}

export default App;
