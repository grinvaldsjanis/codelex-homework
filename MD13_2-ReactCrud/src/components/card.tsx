import axios from "axios";
import React, { useState } from "react";
import CardForm from "./card-form";

interface CardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  onDelete: (id: string) => void;
  onEdit: () => void;
  isEditing: boolean;
  onSave: (cardData: { id: string; title: string; description: string; imageUrl: string; }) => void;
}

const Card: React.FC<CardProps> = ({
  id,
  title,
  description,
  imageUrl,
  onDelete,
  onEdit,
  isEditing,
  onSave,
}) => (
  <div className="card">
    {isEditing ? (
      <CardForm
        id={id}
        title={title}
        description={description}
        imageUrl={imageUrl}
        onSave={onSave}
        onCancel={onEdit}
      />
    ) : (
      <>
        <h2>{title}</h2>
        <p>{description}</p>
        <img src={imageUrl} alt={title} />
        <button type="button" onClick={() => onDelete(id)}>Delete</button>
        <button type="button" onClick={onEdit}>Edit</button>
      </>
    )}
  </div>
);

export default Card;