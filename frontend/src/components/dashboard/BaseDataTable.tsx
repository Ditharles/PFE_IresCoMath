import { useState, useEffect } from "react";
import {
    useReactTable,
    ColumnFiltersState,
    SortingState,
    PaginationState,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    flexRender,
    ColumnDef,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { ChevronDown, ChevronUp, RefreshCw, Search, X } from "lucide-react";

const pageSizeOptions = [5, 10, 20, 50, 100];
interface BaseDataTableProps<TData> {
    columns: ColumnDef<TData>[];
    data: TData[];
    onRefresh?: () => void;
    isLoading?: boolean;
}

interface CustomColumnMeta {
    filterVariant?: string;
    filterSelectOptions: Array<{ value: string; label: string }>;
}
export function BaseDataTable<TData>({
    columns,
    data,
    onRefresh,
    isLoading = false,
}: BaseDataTableProps<TData>) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState<string>("");
    const [sorting, setSorting] = useState<SortingState>([]);
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    }, [columnFilters, globalFilter]);

    const table = useReactTable({
        data,
        columns,
        state: {
            columnFilters,
            globalFilter,
            sorting,
            pagination,
        },
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    const clearFilters = () => {
        setColumnFilters([]);
        setGlobalFilter("");
    };

    return (
        <div className="rounded-lg border border-border/40 bg-card/50 backdrop-blur-sm shadow-sm">
            {/* Header avec barre de recherche globale et contrôles */}
            <div className="bg-muted/50 p-4 flex flex-wrap items-center justify-between gap-2 border-b border-border/40">
                <div className="relative flex items-center w-full md:w-auto">
                    <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Recherche globale..."
                        value={globalFilter || ""}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        className="pl-8 h-9 w-full md:w-[300px] bg-background/50"
                    />
                    {globalFilter && (
                        <button
                            onClick={() => setGlobalFilter("")}
                            className="absolute right-2 rounded-full hover:bg-muted/80 transition-colors p-1"
                        >
                            <X className="h-4 w-4 text-muted-foreground" />
                        </button>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowFilters(!showFilters)}
                        className="h-9 bg-background/50 hover:bg-accent hover:text-accent-foreground"
                    >
                        {showFilters ? "Masquer les filtres" : "Afficher les filtres"}
                    </Button>

                    {(columnFilters.length > 0 || globalFilter) && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearFilters}
                            className="h-9 hover:bg-accent hover:text-accent-foreground"
                        >
                            Effacer les filtres
                        </Button>
                    )}

                    {onRefresh && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={onRefresh}
                            disabled={isLoading}
                            className="h-9 bg-background/50 hover:bg-accent hover:text-accent-foreground"
                        >
                            <RefreshCw className={`h-4 w-4 mr-1 ${isLoading ? "animate-spin" : ""}`} />
                            Actualiser
                        </Button>
                    )}
                </div>
            </div>

            <Table className="w-full">
                <TableHeader className="bg-muted/30">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id} className="hover:bg-muted/50">
                            {headerGroup.headers.map((header) => (
                                <TableHead
                                    key={header.id}
                                    className="whitespace-nowrap p-3 text-foreground/80"
                                    onClick={header.column.getCanSort() ? () => header.column.toggleSorting() : undefined}
                                    style={{ cursor: header.column.getCanSort() ? "pointer" : "default" }}
                                >
                                    <div className="flex items-center">
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        {header.column.getCanSort() && (
                                            <div className="pl-1">
                                                {header.column.getIsSorted() === "asc" ? (
                                                    <ChevronUp className="h-4 w-4 text-primary" />
                                                ) : header.column.getIsSorted() === "desc" ? (
                                                    <ChevronDown className="h-4 w-4 text-primary" />
                                                ) : (
                                                    <div className="h-4 w-4 text-muted-foreground/50">⇅</div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    {showFilters && header.column.getCanFilter() && (
                                        <div className="mt-2">
                                            {(header.column.columnDef.meta as CustomColumnMeta)?.filterVariant === "select" &&
                                                Array.isArray((header.column.columnDef.meta as CustomColumnMeta)?.filterSelectOptions) ? (
                                                <Select
                                                    value={(header.column.getFilterValue() as string) ?? ""}
                                                    onValueChange={(value) => header.column.setFilterValue(value)}
                                                >
                                                    <SelectTrigger className="h-8 text-sm bg-background/50">
                                                        <SelectValue placeholder={`Filtrer ${String(header.column.columnDef.header || '')}`} />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {(header.column.columnDef.meta as CustomColumnMeta).filterSelectOptions.map((option: { value: string; label: string }) => (
                                                            <SelectItem key={option.value} value={option.value}>
                                                                {option.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            ) : (
                                                <Input
                                                    className="h-8 text-sm bg-background/50"
                                                    placeholder={`Filtrer ${String(header.column.columnDef.header || '')}...`}
                                                    value={(header.column.getFilterValue() as string) ?? ""}
                                                    onChange={(event) => header.column.setFilterValue(event.target.value)}
                                                />
                                            )}
                                        </div>
                                    )}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                <div className="flex items-center justify-center text-muted-foreground">
                                    <RefreshCw className="h-5 w-5 animate-spin mr-2" />
                                    Chargement...
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                                className="hover:bg-muted/50 transition-colors"
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id} className="py-3 text-foreground/80">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                                Aucun résultat.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            <div className="flex items-center justify-between px-4 py-3 bg-muted/50 border-t border-border/40">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredRowModel().rows.length} résultat{table.getFilteredRowModel().rows.length > 1 ? 's' : ''} trouvé{table.getFilteredRowModel().rows.length > 1 ? 's' : ''}.
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground mr-1">Lignes par page:</span>
                    <Select
                        value={pagination.pageSize.toString()}
                        onValueChange={(value) => {
                            table.setPageSize(Number(value));
                        }}
                    >
                        <SelectTrigger className="h-8 w-[70px] bg-background/50">
                            <SelectValue placeholder={pagination.pageSize.toString()} />
                        </SelectTrigger>
                        <SelectContent>
                            {pageSizeOptions.map((pageSize) => (
                                <SelectItem key={pageSize} value={pageSize.toString()}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <div className="flex items-center gap-1">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            className="h-8 w-8 p-0 bg-background/50 hover:bg-accent hover:text-accent-foreground"
                        >
                            &lt;
                        </Button>
                        <span className="text-sm px-2 text-muted-foreground">
                            Page {table.getState().pagination.pageIndex + 1} sur {table.getPageCount()}
                        </span>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                            className="h-8 w-8 p-0 bg-background/50 hover:bg-accent hover:text-accent-foreground"
                        >
                            &gt;
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}