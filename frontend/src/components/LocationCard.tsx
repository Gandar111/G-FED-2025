import React, { useState } from 'react';
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
};

type Props = {
    location: Location;
};




const LocationCard: React.FC<Props> = ({ location }) => {

const [likes, setLikes] = useState<number>(location.likes ?? 0 );
const handleLike = () => {
        fetch(`http://localhost:8001/ort/${location._id}/like`, {
            method: 'POST'
        })
        .then(res => res.json())
        .then(data => setLikes(data.likes ?? 0))   // neue Likes setzen
        .catch(err => console.error(err));
    };
    return (
        <div className="location-card">
            <h3>{location.name}</h3>
            <p>
                {location.street && `${location.street}, `}
                {location.zip} {location.city}
            </p>
            {location.category && <p>Kategorie: {location.category}</p>}

            {location.imageUrl
                ? (
                    <img
                        src={location.imageUrl}
                        alt={location.name}
                        className="location-image"
                    />
                )
                : <p>Kein Bild vorhanden!</p>}

            <button className="like-button" onClick={handleLike}>
                👍 {likes}
            </button>
        </div>
    );
};

export default LocationCard;
