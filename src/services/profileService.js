// services/profileService.js
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/profiles` || 'http://127.0.0.1:5000/profiles';

// Fetch someone's bio/prompts
const getDevSpaceData = async (userId) => {
    try {
        const res = await fetch(`${BASE_URL}/${userId}`);
        const data = await res.json();
        return data; 
    } catch (err) {
        console.error(err);
        throw err;
    }
};

// Create or Update your own profile
const updateDevSpace = async (formData) => {
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                // 'Content-Type': 'application/json',
            },
            body: formData,
        });
        return res.json();
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export { getDevSpaceData, updateDevSpace };