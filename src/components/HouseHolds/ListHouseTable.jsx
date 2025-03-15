import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect, useMemo, useState } from "react";
import PaginatedTable from "../Table/PaginatedTable";
import { View } from "lucide-react";
import { fetchData, patchData } from "../../utils/ApiHandlers";
import Loading from "../Loading/Loading";
import { useNavigate } from "react-router-dom";

const ListHouseTable = () => {
  const [housesList, setHousesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

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
          <div className=" text-14 text-[#24282E] ">{row.original.address}</div>
        ),
      },
      {
        header: "Action",

        cell: ({ row }) => (
          <button
            onClick={() => navigate(`/members/${row.original.id}`)}
            className=" cursor-pointer font-bold text-14 text-deep-navy"
          >
            {<View />}
          </button>
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
    <div className="mt-6">
      {isLoading && <Loading />}
      <PaginatedTable table={table} minWidth="100%" />
    </div>
  );
};

export default ListHouseTable;
