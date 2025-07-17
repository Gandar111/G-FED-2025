import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Location } from './LocationCard';

const LocationDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`http://13.60.78.19:8001/ort/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Nicht gefunden');
        return res.json();
      })
      .then(data => setLocation(data))
      .catch(err => {
        console.error(err);
        setError('Standort nicht gefunden.');
      });
  }, [id]);

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button onClick={() => navigate('/locations')}>Zurück zur Liste</button>
      </div>
    );
  }

  if (!location) {
    return <p>Lade Standortdaten...</p>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{location.name}</h2>
      <p><strong>Adresse:</strong> {location.street}, {location.zip} {location.city}</p>
      <p><strong>Kategorie:</strong> {location.category}</p>
      <p><strong>Likes:</strong> {location.likes}</p>
      {location.imageUrl && (
        <img
          src={location.imageUrl}
          alt={location.name}
          style={{ maxWidth: '400px', marginTop: '1rem', borderRadius: '10px' }}
        />
      )}

      <div style={{ marginTop: '1.5rem' }}>
        <button onClick={() => navigate('/locations')}>⬅ Zurück zur Liste</button>
        <button onClick={() => navigate(`/locations/edit/${location._id}`)} style={{ marginLeft: '1rem' }}>
          ✏️ Bearbeiten
        </button>
      </div>
    </div>
  );
};

export default LocationDetail;
