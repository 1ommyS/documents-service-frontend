// @ts-ignore
import {ColumnDef} from "@tanstack/react-table";
import {Button} from "@/components/ui/button";
import {ArrowUpDown} from "lucide-react";
import * as React from "react";

export const documentsSchema: ColumnDef<Document>[] = [
    {
        accessorKey: "id",
        header: "ID",
        cell: ({row}) => (
            <div className="capitalize">{row.getValue("id")}</div>
        ),
    },
    {
        accessorKey: "name",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Название документа
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => <div className="lowercase">{row.getValue("name")}</div>,
    },
    {
        accessorKey: "description",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Описание документа
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => <div className="lowercase">{row.getValue("description")}</div>,
    },
    {
        accessorKey: "Категория",
        header:({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Категория
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => {
            // @ts-ignore
            return <div className="lowercase">{row.original.category.name}</div>
        },
    }
]