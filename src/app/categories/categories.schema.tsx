// @ts-ignore
import {ColumnDef} from "@tanstack/react-table";
import {Category} from "@/app/categories/categories.data";
import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button";
import {ArrowUpDown, MoreHorizontal} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import * as React from "react";
import Link from "next/link";

export const categoriesSchema: ColumnDef<Category>[] = [
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
        accessorKey: "_",
        header: () => <></>,
        cell: ({row}) => {

            return <div className="text-right font-medium">{
                <Button >
                <Link href={`/document/${row.getValue("id")}`}>Перейти</Link>
                </Button>
            }</div>
        },
    }
]