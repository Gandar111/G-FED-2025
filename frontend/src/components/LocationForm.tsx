import React, { useState } from 'react';
import { Location } from './LocationCard';

type Props = {
  initialData?: Partial<Location>;
  onSubmit: (data: Partial<Location>) => void;
  onCancel?: () => void; // Optional für Add/Edit
};

const LocationForm: React.FC<Props> = ({ initialData = {}, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Partial<Location>>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="location-form" onSubmit={handleSubmit}>
      <label>
        Name:
        <input name="name" required value={formData.name ?? ''} onChange={handleChange} />
      </label>

      <label>
        Straße:
        <input name="street" value={formData.street ?? ''} onChange={handleChange} />
      </label>

      <label>
        PLZ:
        <input name="zip" value={formData.zip ?? ''} onChange={handleChange} />
      </label>

      <label>
        Stadt:
        <input name="city" value={formData.city ?? ''} onChange={handleChange} />
      </label>

      <label>
        Kategorie:
        <input name="category" value={formData.category ?? ''} onChange={handleChange} />
      </label>

      <label>
        Bild-URL:
        <input name="imageUrl" value={formData.imageUrl ?? ''} onChange={handleChange} />
      </label>

      <div className="form-buttons">
        <button type="submit">Speichern</button>
        {onCancel && (
          <button type="button" className="cancel-button" onClick={onCancel}>
            Abbrechen
          </button>
        )}
      </div>
    </form>
  );
};

export default LocationForm;
