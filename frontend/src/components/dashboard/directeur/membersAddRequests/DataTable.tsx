import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  PaginationState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../ui/table";
import { Input } from "../../../ui/input";
import { Button } from "../../../ui/button";
import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Search, X, RefreshCw } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../ui/select";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onRefresh?: () => void;
  isLoading?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onRefresh,
  isLoading = false,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [showFilters, setShowFilters] = useState(false);

  // Réinitialiser la pagination quand les filtres changent
  useEffect(() => {
    setPagination(prev => ({ ...prev, pageIndex: 0 }));
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

  // Options de taille de page
  const pageSizeOptions = [5, 10, 20, 50, 100];

  return (
    <div className="rounded-md border overflow-hidden">
      {/* Header avec barre de recherche globale et contrôles */}
      <div className="bg-gray-50 p-4 flex flex-wrap items-center justify-between gap-2">
        <div className="relative flex items-center w-full md:w-auto">
          <Search className="absolute left-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Recherche globale..."
            value={globalFilter || ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-8 h-9 w-full md:w-[300px]"
          />
          {globalFilter && (
            <button
              onClick={() => setGlobalFilter("")}
              className="absolute right-2 rounded-full"
            >
              <X className="h-4 w-4 text-gray-500" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="h-9"
          >
            {showFilters ? "Masquer les filtres" : "Afficher les filtres"}
          </Button>

          {(columnFilters.length > 0 || globalFilter) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="h-9"
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
              className="h-9"
            >
              <RefreshCw className={`h-4 w-4 mr-1 ${isLoading ? "animate-spin" : ""}`} />
              Actualiser
            </Button>
          )}
        </div>
      </div>

      <Table className="w-full">
        <TableHeader className="w-full">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="whitespace-nowrap p-3"
                    onClick={header.column.getCanSort() ? () => header.column.toggleSorting() : undefined}
                    style={{ cursor: header.column.getCanSort() ? "pointer" : "default" }}
                  >
                    <div className="flex items-center">
                      {header.isPlaceholder ? null : (
                        <div className="flex items-center gap-1">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {header.column.getCanSort() && (
                            <div className="pl-1">
                              {header.column.getIsSorted() === "asc" ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : header.column.getIsSorted() === "desc" ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <div className="h-4 w-4 text-gray-300 opacity-50">⇅</div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {showFilters && header.column.getCanFilter() ? (
                      <div className="mt-2">
                        <Input
                          className="h-8 text-sm"
                          placeholder={`Filtrer ${header.column.columnDef.header?.toString() || ''}...`}
                          value={(header.column.getFilterValue() as string) ?? ""}
                          onChange={(event) =>
                            header.column.setFilterValue(event.target.value)
                          }
                        />
                      </div>
                    ) : null}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                <div className="flex items-center justify-center">
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
                className="hover:bg-gray-50"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="py-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Aucun résultat.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50">
        <div className="flex-1 text-sm text-gray-700">
          {table.getFilteredRowModel().rows.length} résultat{table.getFilteredRowModel().rows.length > 1 ? 's' : ''} trouvé{table.getFilteredRowModel().rows.length > 1 ? 's' : ''}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700 mr-1">Lignes par page:</span>
          <Select
            value={pagination.pageSize.toString()}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pagination.pageSize} />
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
              className="h-8 w-8 p-0"
            >
              &lt;
            </Button>
            <span className="text-sm px-2">
              Page {table.getState().pagination.pageIndex + 1} sur{" "}
              {table.getPageCount()}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="h-8 w-8 p-0"
            >
              &gt;
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}