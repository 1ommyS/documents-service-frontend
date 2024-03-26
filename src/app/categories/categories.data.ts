import {getCategoriesFromServer} from "@/api/category/category";

export type Category = {
    id: number
    name: string
}

export const getCategories = async (): Promise<Category[]> => {
    return await getCategoriesFromServer().then(categories => categories);
}
