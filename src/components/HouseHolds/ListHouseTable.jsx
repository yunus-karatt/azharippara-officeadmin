import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect, useMemo, useState } from "react";
import PaginatedTable from "../Table/PaginatedTable";
import { Check, OctagonMinus } from "lucide-react";
import { fetchData, patchData } from "../../utils/ApiHandlers";
import toast from "react-hot-toast";
import Loading from "../Loading/Loading";

const ListHouseTable = () => {
  const [housesList, setHousesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const columns = useMemo(
    () => [
      {
        header: "Mahall No",

        accessorKey: "mahalluNo",
        cell: ({ row }) => (
          <div className="font-bold text-14 text-[#24282E] min-w-[90px]">
            {row.original.mahalluNo}
          </div>
        ),
      },
      {
        header: "House No",

        accessorKey: "houseNo",
        cell: ({ row }) => (
          <div className="font-bold text-14 text-[#24282E] min-w-[90px]">
            {row.original.houseNo}
          </div>
        ),
      },
      {
        header: "Address",

        accessorKey: "address",
        cell: ({ row }) => (
          <div className="font-bold text-14 text-[#24282E] min-w-[90px]">
            {row.original.address}
          </div>
        ),
      },
    ],
    [housesList]
  );

  const table = useReactTable({
    data: housesList,
    columns,

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const fetchHousesList = async () => {
    setIsLoading(true);
    try {
      const res = await fetchData("/list/houses");
      setHousesList(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHousesList();
  }, []);

  console.log({ housesList });

  return (
    <div>
      {isLoading && <Loading />}
      <PaginatedTable table={table} minWidth="100%" />
    </div>
  );
};

export default ListHouseTable;
