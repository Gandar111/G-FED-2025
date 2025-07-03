import React, { useEffect, useState } from 'react';
import LocationCard, { Location } from './LocationCard';
import './LocationList.css';

type User = {
  username: string;
  role: string;
};

type Props = {
  user: User;
};

const LocationList: React.FC<Props> = ({ user }) => {
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    fetch('http://localhost:8001/ort')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setLocations(data);
        } else if (data && Array.isArray(data.locations)) {
          setLocations(data.locations);
        } else {
          console.warn('Backend returned non-array data:', data);
          setLocations([]);
        }
      })
      .catch(err => console.error('Fehler beim Laden der Locations:', err));
  }, []);

  return (
    <div className="location-list">
      <h2>Alle Standorte</h2>
      <div className="card-grid">
        {locations.map(loc => (
          <LocationCard key={loc._id} location={loc} user={user} />
        ))}
      </div>
    </div>
  );
};

export default LocationList;
