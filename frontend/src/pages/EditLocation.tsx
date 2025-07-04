// 📌 EditLocation-Komponente: Ermöglicht Bearbeiten eines vorhandenen Standorts anhand der ID aus der URL.

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LocationForm from '../components/LocationForm';
import { Location } from '../components/LocationCard';
import { User } from '../types/User';
import './EditLocation.css';

type Props = {
  user: User;
};

const EditLocation: React.FC<Props> = ({ user }) => {
  const { id } = useParams<{ id: string }>(); // Holt die Standort-ID aus der URL
  const navigate = useNavigate();
  const [locationData, setLocationData] = useState<Partial<Location> | null>(null); // Lokaler Zustand für Standortdaten

  useEffect(() => {
    async function loadLocation() {
      try {
        const res = await fetch(`http://localhost:8001/ort/${id}`); // Holt Standortdetails vom Backend

        if (!res.ok) throw new Error('Not found');
        const data = await res.json();
        setLocationData(data); // Speichert geladene Daten im State
      } catch (err) {
        console.error('Fehler beim Laden der Daten:', err);
      }
    }

    if (id) loadLocation();
  }, [id]);

  const handleSubmit = async (updatedData: Partial<Location>) => {
    try {
      const res = await fetch(`http://localhost:8001/ort/${id}`, {
        method: 'PUT', // Sendet aktualisierte Daten an Backend
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (res.ok) {
        alert('Änderungen gespeichert!');
        navigate('/locations'); // Nach Erfolg zurück zur Liste
      } else {
        alert('Speichern fehlgeschlagen.');
      }
    } catch (err) {
      console.error('Fehler beim Speichern:', err);
      alert('Ein Fehler ist aufgetreten.');
    }
  };

  if (!locationData) return <p>Lade Standortdaten...</p>; // Ladeanzeige während Daten geladen werden

  return (
    <div className="edit-page">
      <h2>📍 Standort bearbeiten</h2>

      <div className="preview-card">
        <h3>{locationData.name}</h3>
        <p>{locationData.street}, {locationData.zip} {locationData.city}</p>
        <p>Kategorie: {locationData.category}</p>
        {locationData.imageUrl ? (
          <img
            src={locationData.imageUrl}
            alt={locationData.name}
            className="location-image"
          />
        ) : (
          <p>Kein Bild vorhanden</p>
        )}
      </div>

      <LocationForm initialData={locationData} onSubmit={handleSubmit} /> {/* Formular zum Bearbeiten */}
    </div>
  );
};

export default EditLocation;
