import {
  useGetAllAnimalsQuery,
  useDeleteAnimalMutation,
  setAnimals,
} from "../store/animalsApiSlice";
import { useSelector, useDispatch } from "react-redux";
import AnimalCard from "./AnimalCard";
import { RootState } from "../store/store";
import { useState, useEffect } from "react";
import SpeciesMenu from "./SpeciesMenu";
import { setSelectedSpecies } from "../store/animalsApiSlice";
import { Col, Container, Row } from "react-bootstrap";

const AnimalList = () => {
  const { data = [], isFetching } = useGetAllAnimalsQuery();
  const [selectedSpecies, setSelectedSpecies] = useState<string>("");

  const animals = useSelector((state: RootState) => state.animals);
  const [deleteAnimal] = useDeleteAnimalMutation();

  const handleDeleteAnimal = (id: string) => {
    deleteAnimal(id);
  };

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (!data.length) {
    return <h1>There are no animals in the library</h1>;
  }

  const filteredAnimals = data.filter((animal) => {
    if (selectedSpecies === "") {
      return true;
    } else {
      return animal.species
        .toLowerCase()
        .includes(selectedSpecies.toLowerCase());
    }
  });

  return (
    <div>
      <SpeciesMenu
        selectedSpecies={selectedSpecies}
        setSelectedSpecies={setSelectedSpecies}
      />
      <Container fluid>
        <Row>
          {filteredAnimals.map((animal) => (
            <Col md-1>
              <AnimalCard
                key={animal.id}
                animal={animal}
                onDelete={() => handleDeleteAnimal(animal.id)}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default AnimalList;
