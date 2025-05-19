import React, { useState } from 'react';

const LikeButton: React.FC = () => {
    const [likes, setLikes] = useState(0);

    return (
        <button onClick={() => setLikes(likes + 1)}>
            👍 {likes}
        </button>
    );
};

export default LikeButton;    // ✅ Modul exportiert
