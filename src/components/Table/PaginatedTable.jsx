import React from "react";
import { flexRender } from "@tanstack/react-table";
import TablePaginationButtons from "./TablePaginationButtons";

const PaginatedTable = ({ table, minWidth = "600px" }) => {
  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <div className="inline-block w-full" style={{ minWidth: minWidth }}>
          <table className="w-full table-auto  ">
            <thead className="border-b border-b-[#EEEEEE] text-left ">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className="text-[#777777] text-14 font-normal"
                >
                  {headerGroup.headers.map((header, index) => (
                    <th
                      key={header.id}
                      className={
                        index === 0
                          ? "px-3 py-3"
                          : "text-left py-3 cursor-pointer "
                      }
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <span className="flex items-center gap-2 text-nowrap">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {/* Sort indicator */}
                        <span className="text-black">
                          {{
                            asc: " ▲",
                            desc: " ▼",
                          }[header.column.getIsSorted()] ?? null}
                        </span>
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className={`  border-b border-b-[#EEEEEE] `}>
                  {row.getVisibleCells().map((cell, ind) => (
                    <td
                      key={cell.id}
                      className={`${ind === 0 && "px-3"} p-3`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {table.getCoreRowModel().rows.length > table.getState().pagination.pageSize && <div className="flex items-center justify-between gap-2 mt-y-gap px-x-gap pb-2">
        <div className="lg:block hidden">
          <span className="flex items-center gap-1 text-14 font-bold text-[#727A90] pb-2 ">
            <div>Showing</div>
            {/* Calculate the starting row number */}
            {table.getState().pagination.pageIndex *
              table.getState().pagination.pageSize +
              1}
            {" - "}
            {/* Calculate the ending row number, make sure it doesn't exceed total row count */}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) *
              table.getState().pagination.pageSize,
              table.getCoreRowModel().rows.length
            )}
            {" from "}
            {/* Show the total number of rows */}
            {table.getCoreRowModel().rows.length}
          </span>
        </div>
        <div>
          <TablePaginationButtons table={table} />
        </div>
      </div>}
    </div>
  );
};

export default PaginatedTable;
