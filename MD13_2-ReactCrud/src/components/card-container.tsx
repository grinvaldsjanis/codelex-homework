import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./card";

interface CardData {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

const CardContainer: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [newCard, setNewCard] = useState<CardData | null>(null);
  const [editCardId, setEditCardId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3004/cards");
      setCards(response.data);
    };
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    await axios.delete(`http://localhost:3004/cards/${id}`);
    setCards((prevCards) => prevCards.filter((card) => card.id !== id));
  };

  const handleSave = async (updatedCard: CardData) => {
    try {
      let newCardIndex = -1;
      if (updatedCard.id.startsWith("new-")) {
        // new
        const response = await axios.post(
          "http://localhost:3004/cards",
          updatedCard
        );
        newCardIndex = cards.findIndex((card) => card.id === updatedCard.id);
        setCards((prevCards) => [
          ...prevCards.slice(0, newCardIndex),
          response.data,
          ...prevCards.slice(newCardIndex + 1),
        ]);
      } else {
        // existing
        await axios.put(
          `http://localhost:3004/cards/${updatedCard.id}`,
          updatedCard
        );
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.id === updatedCard.id ? updatedCard : card
          )
        );
      }
      setEditCardId(null);
    } catch (error) {
      console.error(error);
    }
  };

  const addNewCard = () => {
    if (!editCardId) {
      const newId = `new-${cards.length}`;
      setCards([
        ...cards,
        {
          id: newId,
          title: "",
          description: "",
          imageUrl: "",
        },
      ]);
      setEditCardId(newId);
    }
  };

  const newCardIndex = cards.findIndex((card) => card.id === newCard?.id);

  return (
    <div className="wrapper">
      {cards.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          title={card.title}
          description={card.description}
          imageUrl={card.imageUrl}
          onDelete={handleDelete}
          onEdit={() => setEditCardId(card.id)}
          onSave={handleSave}
          isEditing={card.id === editCardId}
        />
      ))}
      <button className="add-button" onClick={addNewCard}>
        Add
      </button>
    </div>
  );
};

export default CardContainer;
