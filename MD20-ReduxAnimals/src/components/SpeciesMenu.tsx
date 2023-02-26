import React from "react";
import {
  useGetAnimalSpeciesQuery,
  useGetAllAnimalsQuery,
} from "../store/animalsApiSlice";
import { useDispatch } from "react-redux";
import { Breadcrumb, BreadcrumbItem } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

type SpeciesMenuProps = {
  selectedSpecies: string;
  setSelectedSpecies: (selectedSpecies: string) => void;
};

const SpeciesMenu: React.FC<SpeciesMenuProps> = ({
  selectedSpecies,
  setSelectedSpecies,
}) => {
  const dispatch = useDispatch();
  const { data: species, isLoading, isError } = useGetAnimalSpeciesQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Failed to load animal species</p>;
  }

  const handleClick = (selectedSpecies: string) => {
    setSelectedSpecies(selectedSpecies);
  };

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbItem
          onClick={() => handleClick("")}
          active={selectedSpecies === ""}
        >
          All
        </BreadcrumbItem>
        {species?.map((animal) => (
          <BreadcrumbItem
            key={animal.species}
            onClick={() => handleClick(animal.species)}
            active={animal.species === selectedSpecies}
          >
            {animal.species}
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
    </div>
  );
};

export default SpeciesMenu;
