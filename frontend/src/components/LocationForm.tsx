import React, { useState } from 'react';
import { Location } from './LocationCard';

type Props = {
  initialData?: Partial<Location>; // für Bearbeiten optional
  onSubmit: (data: Partial<Location>) => void;
};

const LocationForm: React.FC<Props> = ({ initialData = {}, onSubmit }) => {
  const [formData, setFormData] = useState<Partial<Location>>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" value={formData.name || ''} onChange={handleChange} />
      <input name="street" placeholder="Straße" value={formData.street || ''} onChange={handleChange} />
      <input name="zip" placeholder="PLZ" value={formData.zip || ''} onChange={handleChange} />
      <input name="city" placeholder="Stadt" value={formData.city || ''} onChange={handleChange} />
      <input name="category" placeholder="Kategorie" value={formData.category || ''} onChange={handleChange} />
      <input name="imageUrl" placeholder="Bild-URL" value={formData.imageUrl || ''} onChange={handleChange} />
      <button type="submit">Speichern</button>
    </form>
  );
};

export default LocationForm;
