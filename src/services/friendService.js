// services/friendService.js
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/friends` || 'http://127.0.0.1:5000/friends';

const addFriend = async (friendId) => {
    try {
        const res = await fetch(`${BASE_URL}/${friendId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
        });
    
        const data = await res.json();
        if (data.error) throw new Error(data.error);
            return data;
        } catch (err) {
            console.error("Friend Service Error:", err);
            throw err;
    }
};

export { addFriend };