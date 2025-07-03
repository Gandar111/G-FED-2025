import React, { useState } from 'react';
import LocationForm from './LocationForm';
import './LocationCard.css';

export type Location = {
  _id: string;
  name: string;
  street?: string;
  zip?: string;
  city?: string;
  category?: string;
  imageUrl?: string | null;
  likes?: number;
  owner?: string;
};

type Props = {
  location: Location;
  user: { username: string; role: string };
  onDelete?: () => void; // optionaler Callback nach dem Löschen oder Edit
};

const LocationCard: React.FC<Props> = ({ location, user, onDelete }) => {
  const [likes, setLikes] = useState<number>(location.likes ?? 0);
  const [isEditing, setIsEditing] = useState(false);

  const handleLike = () => {
    fetch(`http://localhost:8001/ort/${location._id}/like`, {
      method: 'POST',
    })
      .then(res => res.json())
      .then(data => setLikes(data.likes ?? 0))
      .catch(err => console.error(err));
  };

  const handleDelete = () => {
    if (!window.confirm(`Möchtest du "${location.name}" wirklich löschen?`)) return;

    fetch(`http://localhost:8001/ort/${location._id}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (res.ok) {
          onDelete?.(); // Liste neu laden, wenn Funktion übergeben
        } else {
          alert('Löschen fehlgeschlagen.');
        }
      })
      .catch(err => console.error(err));
  };

  const handleUpdate = async (updatedData: Partial<Location>) => {
    try {
      const res = await fetch(`http://localhost:8001/ort/${location._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (res.ok) {
        alert('Änderung gespeichert!');
        setIsEditing(false);
        onDelete?.(); // z. B. refetch auslösen
      } else {
        alert('Speichern fehlgeschlagen.');
      }
    } catch (err) {
      console.error(err);
      alert('Fehler beim Speichern.');
    }
  };

  const isOwner = user.username === location.owner || user.role === 'admin';

  return (
    <div className="location-card">
      {isEditing ? (
        <LocationForm initialData={location} onSubmit={handleUpdate} />
      ) : (
        <>
          <h3>{location.name}</h3>
          <p>
            {location.street && `${location.street}, `}
            {location.zip} {location.city}
          </p>
          {location.category && <p>Kategorie: {location.category}</p>}

          {location.imageUrl ? (
            <img
              src={location.imageUrl}
              alt={location.name}
              className="location-image"
            />
          ) : (
            <p>Kein Bild vorhanden!</p>
          )}

          <button className="like-button" onClick={handleLike}>
            👍 {likes}
          </button>

          {isOwner && (
            <>
              <button className="edit-button" onClick={() => setIsEditing(true)}>
                ✏️ Bearbeiten
              </button>
              <button className="delete-button" onClick={handleDelete}>
                🗑 Löschen
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default LocationCard;
