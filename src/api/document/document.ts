import {BASE_URL} from "@/utils/constants";
import axios, {AxiosResponse} from "axios";
import {GetDocumentsInCategory} from "@/api/document/document.types";
import {Category} from "@/api/category/category.types";

const GET_DOCUMENTS_IN_CATEGORY_URL = `${BASE_URL}/api/documents`
const CREATE_DOCUMENT_URL = `${BASE_URL}/api/documents`
export type Document = {
    id: number
    name: string
    description: string,
    category: Category,
}
export type CreateDocument = {
    categoryId: number,
    description: string,
    name: string
}

export const getDocumentsInCategory = async (categoryId: number) => {
    return await axios.get(`${GET_DOCUMENTS_IN_CATEGORY_URL}/${categoryId}`).then((response: AxiosResponse<GetDocumentsInCategory>) => response.data)
}

export const getDocumentsFromServer = async () => {
    return await axios.get(`${GET_DOCUMENTS_IN_CATEGORY_URL}`).then((response: AxiosResponse<Document[]>) => response.data)
}

export const createDocument = async ({
                                         categoryId,
                                         description,
                                         name
                                     }: CreateDocument) => {
    return await axios.post(CREATE_DOCUMENT_URL,
        {
            category: {
                id: categoryId
            },
            description: description,
            name: name
        })
}