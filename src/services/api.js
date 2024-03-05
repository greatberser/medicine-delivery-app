import axios from "axios";

export const getShops = async () => {
    try {
        const response = await axios.get('/data/shops.json');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getDrugs = async () => {
    try{
        const response = await axios.get('/data/drugs.json');
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function getDrugsByShopId(shopId) {
    try {
        const response = await axios.get(`/data/drugs.json`);
        const filteredDrugs = response.data.filter(drug => drug.shopId === shopId);
        return filteredDrugs;
    } catch (error) {
        throw error;
    }
}

export async function getDrugsFromCart() {
    try {
        const cartData = await localStorage.getItem('cart');
        return cartData ? JSON.parse(cartData) : [];
    } catch (error) {
        throw error;
    }
}
