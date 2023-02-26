import React, { useState } from 'react';
import { Button, Form, FormControl, FormLabel } from 'react-bootstrap';
import { useAddAnimalMutation } from '../store/animalsApiSlice';

const AnimalForm = () => {
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const [addAnimal, { isLoading }] = useAddAnimalMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addAnimal({ name, species, imageUrl });

    // Clear the form
    setName('');
    setSpecies('');
    setImageUrl('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormLabel>
        Name:
        <FormControl placeholder='Type the name' type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </FormLabel>
      <br />
      <FormLabel>
        Species:
        <FormControl placeholder='Type the species' type="text" value={species} onChange={(e) => setSpecies(e.target.value)} />
      </FormLabel>
      <br />
      <FormLabel>
        Image URL:
        <FormControl placeholder='Type the URL' type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
      </FormLabel>
      <br />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Adding...' : 'Add Animal'}
      </Button>
    </Form>
  );
};

export default AnimalForm;
