import React from "react";
import { useDeleteAnimalMutation } from "../store/animalsApiSlice";
import { Animal } from "../types";
import { Button, Card, CardImg } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css"

type Props = {
  animal: Animal;
  onDelete: () => void;
};

const AnimalCard: React.FC<Props> = ({ animal, onDelete }) => {
  const [deleteAnimal, { isLoading }] = useDeleteAnimalMutation();

  const handleDeleteAnimal = () => {
    deleteAnimal(animal.id);
    onDelete();
  };

  return (
    <Card style={{ margin: "0.5rem", padding: "1rem", width: "250px"}}>
      <Card.Title>{animal.name}</Card.Title>
      <Card.Text>{animal.species}</Card.Text>
      <CardImg  src={animal.imageUrl} alt={animal.name} />
      <Button style={{marginTop: "1rem"}} onClick={handleDeleteAnimal} disabled={isLoading}>
        Delete
      </Button>
    </Card>
  );
};

export default AnimalCard;
