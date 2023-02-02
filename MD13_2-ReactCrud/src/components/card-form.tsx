import React, { useState } from 'react';

interface CardFormProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  onSave: (cardData: { id: string; title: string; description: string; imageUrl: string; }) => void;
  onCancel: () => void;
}

const CardForm: React.FC<CardFormProps> = ({
  id,
  title,
  description,
  imageUrl,
  onSave,
  onCancel,
}) => {
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [editImageUrl, setEditImageUrl] = useState(imageUrl);

  const handleSave = () => {
    onSave({
      id,
      title: editTitle,
      description: editDescription,
      imageUrl: editImageUrl,
    });
  };

  return (
    <div className="card-form">
      <div className="form-input">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />
      </div>
      <div className="form-input">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
        />
      </div>
      <div className="form-input">
        <label htmlFor="image-url">Image URL</label>
        <input
          type="text"
          id="image-url"
          value={editImageUrl}
          onChange={(e) => setEditImageUrl(e.target.value)}
        />
      </div>
      <button className="save-button" onClick={handleSave}>Save</button>
      <button className="cancel-button" onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default CardForm;