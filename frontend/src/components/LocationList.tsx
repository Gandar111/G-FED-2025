import React, { useEffect, useState } from 'react';
import LocationCard, { Location } from './LocationCard';
import LocationForm from './LocationForm';
import './LocationList.css';

type Props = {
  user: { username: string; role: string };
};

const LocationList: React.FC<Props> = ({ user }) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadLocations();
  }, []);

  const loadLocations = () => {
    fetch('http://localhost:8001/ort')
      .then(res => res.json())
      .then(data => setLocations(Array.isArray(data) ? data : []))
      .catch(err => console.error('Fehler beim Laden der Locations:', err));
  };

  const handleAddLocation = (newData: Partial<Location>) => {
    fetch('http://localhost:8001/ort', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...newData,
        owner: user.username,
        likes: 0,
      }),
    })
      .then(res => res.json())
      .then(() => {
        setShowForm(false);
        loadLocations();
      });
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

      {/* Button am Ende */}
      <div className="add-location-section">
        {showForm && <LocationForm onSubmit={handleAddLocation} />}

        <button onClick={() => setShowForm(!showForm)} className="add-button">
          ➕ Neuer Standort
        </button>
      </div>
    </div>
  );
};

export default LocationList;
