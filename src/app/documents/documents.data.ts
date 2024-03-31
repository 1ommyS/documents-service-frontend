import {getDocumentsFromServer, Document} from "@/api/document/document";

export const getDocuments = async (): Promise<Document[]> => {
    return await getDocumentsFromServer().then(documents => documents);
}
