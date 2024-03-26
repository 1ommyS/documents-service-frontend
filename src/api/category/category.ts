import {BASE_URL} from "@/utils/constants";
import axios from "axios";

const CREATE_CATEGORY_URL = `${BASE_URL}/api/category`
const GET_CATEGORIES_URL = `${BASE_URL}/api/category`

export const createCategory = async (categoryName: string) => {
    await axios.post(CREATE_CATEGORY_URL, {name: categoryName})
        .catch(error => alert(error.response.message));
}

export const getCategoriesFromServer = async () => {
    const response = await axios.get(GET_CATEGORIES_URL);
    return response.data;
}
