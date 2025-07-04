// 📌 AddLocation-Komponente: Ermöglicht es einem Benutzer, einen neuen Standort über ein Formular hinzuzufügen.

import React from 'react';
import { useNavigate } from 'react-router-dom';
import LocationForm from '../components/LocationForm';
import { Location } from '../components/LocationCard';
import { User } from '../types/User'; // ✅ hinzufügen
import './AddLocation.css';

type Props = {
  user: User;
};

const AddLocation: React.FC<Props> = ({ user }) => {
  const navigate = useNavigate();

  const handleAdd = async (data: Partial<Location>) => {
    try {
      const response = await fetch('http://localhost:8001/ort', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          likes: 0,
          owner: user.username, // ✅ direkt aus props
        }),
      });

      if (response.ok) {
        alert('Standort hinzugefügt!');
        navigate('/locations');
      } else {
        alert('Hinzufügen fehlgeschlagen.');
      }
    } catch (err) {
      console.error('Fehler beim Hinzufügen:', err);
      alert('Ein Fehler ist aufgetreten.');
    }
  };

  return (
    <div className="add-location-page">
      <h2>➕ Neuen Standort hinzufügen</h2>
      <LocationForm onSubmit={handleAdd} />
    </div>
  );
};

export default AddLocation;
