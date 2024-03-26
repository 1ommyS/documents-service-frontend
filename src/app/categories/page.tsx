"use client"

import * as React from "react"
import {
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table"

import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {categoriesSchema} from "@/app/categories/categories.schema";
import {Category, getCategories} from "@/app/categories/categories.data";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

const CategoriesPage = () => {
    const [pagination, setPagination] = useState({
        pageIndex: 0, //initial page index
        pageSize: 20, //default page size
    });

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const router = useRouter()
    const [categoriesFromServer, setCategoriesFromServer] = useState<Category[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        getCategories().then(
            (categories) => {
                setCategoriesFromServer(categories);
                setIsLoaded(true);
            }
        )
            .catch((error) => {
                alert(error.response.data.message)
            })
    }, [])

    const table = useReactTable({
        data: categoriesFromServer,
        // @ts-ignore
        columns: categoriesSchema,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        onPaginationChange: setPagination,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            pagination
        },
    })

    return (
        <>
            {(!isLoaded) &&
                (<h1>Loading</h1>
                )}
            {
                isLoaded && (
                    <div className="w-full">
                        <div className="flex flex-row  justify-between py-4">
                            <Input
                                placeholder="Поиск по категории"
                                value={(table?.getColumn("name")?.getFilterValue() as string) ?? ""}
                                onChange={(event) =>
                                    table?.getColumn("name")?.setFilterValue(event.target.value)
                                }
                                className="max-w-sm"
                            />
                            <div>
                                <Button onClick={() => router.push('categories/new')}>
                                    Создать
                                    категорию</Button>
                            </div>
                        </div>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    {table?.getHeaderGroups().map((headerGroup) => (
                                        <TableRow key={headerGroup.id}>
                                            {headerGroup.headers.map((header) => {
                                                return (
                                                    <TableHead key={header.id}>
                                                        {header.isPlaceholder
                                                            ? null
                                                            : flexRender(
                                                                header.column.columnDef.header,
                                                                header.getContext()
                                                            )}
                                                    </TableHead>
                                                )
                                            })}
                                        </TableRow>
                                    ))}
                                </TableHeader>
                                <TableBody>
                                    {table?.getRowModel().rows?.length ? (
                                        table?.getRowModel().rows.map((row) => (
                                            <TableRow
                                                key={row.id}
                                                data-state={row.getIsSelected() && "selected"}
                                            >
                                                {row.getVisibleCells().map((cell) => (
                                                    <TableCell key={cell.id}>
                                                        {flexRender(
                                                            cell.column.columnDef.cell,
                                                            cell.getContext()
                                                        )}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell
                                                colSpan={categoriesSchema.length}
                                                className="h-24 text-center"
                                            >
                                                Нет категорий
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                        <div className="flex items-center justify-end space-x-2 py-4">
                            <div className="space-x-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => table?.previousPage()}
                                    disabled={!table?.getCanPreviousPage()}
                                >
                                    Предыдущая
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => table?.nextPage()}
                                    disabled={!table?.getCanNextPage()}
                                >
                                    Следующая
                                </Button>
                            </div>
                        </div>
                    </div>)
            }</>
    )

}

export default CategoriesPage