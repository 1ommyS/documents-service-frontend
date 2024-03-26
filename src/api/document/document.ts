import {BASE_URL} from "@/utils/constants";
import axios, {AxiosResponse} from "axios";
import {GetDocumentsInCategory} from "@/api/document/document.types";

const GET_DOCUMENTS_IN_CATEGORY_URL = `${BASE_URL}/api/documents`

export const getDocumentsInCategory = async (categoryId: number) => {
    return await axios.get(`${GET_DOCUMENTS_IN_CATEGORY_URL}/${categoryId}`).then((response: AxiosResponse<GetDocumentsInCategory>) => response.data)
}