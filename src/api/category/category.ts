import {BASE_URL} from "@/utils/constants";
import axios from "axios";

const CREATE_CATEGORY_URL = `${BASE_URL}/api/category`

export const createCategory = async (categoryName: string) => {
    await axios.post(CREATE_CATEGORY_URL, {name: categoryName})
        .catch(error => alert(error.response.message));
}