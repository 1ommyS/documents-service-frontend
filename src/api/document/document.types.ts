import {Category} from "@/api/category/category.types";

export type GetDocumentsInCategory = {
    categoryId: number,
    documents: Document[]
}

export type Document = {
    id: number,
    title: string,
    description: string,
    category: Category
}