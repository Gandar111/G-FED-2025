import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ HINZUFÜGEN
import LocationCard, { Location } from './LocationCard';
import './LocationList.css';

type Props = {
  user: { username: string; role: string };
};

const LocationList: React.FC<Props> = ({ user }) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const navigate = useNavigate(); // ✅ Hook für Navigation

  useEffect(() => {
    loadLocations();
  }, []);

  const loadLocations = () => {
    fetch('http://localhost:8001/ort')
      .then(res => res.json())
      .then(data => setLocations(Array.isArray(data) ? data : []))
      .catch(err => console.error('Fehler beim Laden der Locations:', err));
  };

  return (
    <div className="location-list">
      <h2>Alle Standorte</h2>

      <div className="card-grid">
        {locations.map((loc) => (
          <LocationCard
            key={loc._id}
            location={loc}
            user={user}
            onDelete={loadLocations}
          />
        ))}
      </div>

      <div className="add-location-section">
        <button onClick={() => navigate('/locations/add')} className="add-button">
          ➕ Neuer Standort
        </button>
      </div>
    </div>
  );
};

export default LocationList;
