'use client'
import {useEffect, useState} from "react";
import {getDocumentsInCategory} from "@/api/document/document";
import {GetDocumentsInCategory} from "@/api/document/document.types";
import Loader from "@/components/common/Loader";

const CategoryPage = ({
                          params: {id},
                      }: {
    params: {
        id: number;
    }
}) => {

    const [documentInfo, setDocumentInfo] = useState<GetDocumentsInCategory | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        getDocumentsInCategory(id)
            .then(response => {
                setDocumentInfo(response);
            })
            .finally(() => {
                setIsLoaded(true);
            })
    }, [])

    return (
        <>
            {!isLoaded && <Loader/>}
            {(isLoaded && !documentInfo) && (<div>Нет документов в категории</div>)}
            {(isLoaded && documentInfo) && (
                <div>Данные о докуметнах в категории</div>
            )}
        </>

    )
}

export default CategoryPage;