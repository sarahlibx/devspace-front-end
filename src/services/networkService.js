// services/networkService.js
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/users`;

const getNetworkData = async (userId) => {
    try {
        const res = await fetch(`${BASE_URL}/${userId}/wall`);
        const data = await res.json();
        if (data.err) throw new Error(data.err);
        return data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export { getNetworkData };