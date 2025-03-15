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

const ListMembersTable = ({ members }) => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const columns = useMemo(
    () => [
      {
        header: "Name",

        accessorKey: "name",
        cell: ({ row }) => (
          <div className="font-bold text-14 text-[#24282E] text-nowrap min-w-[90px]">
            {row.original.name}
          </div>
        ),
      },
      {
        header: "Email",

        accessorKey: "email",
        cell: ({ row }) => (
          <div className=" text-14 text-[#24282E] text-nowrap min-w-[90px]">
            {row.original.email}
          </div>
        ),
      },
      {
        header: "Mobile Number",

        accessorKey: "mobileNumber",
        cell: ({ row }) => (
          <div className=" text-14 text-[#24282E] text-nowrap ">
            {row.original.mobileNumber}
          </div>
        ),
      },
      {
        header: "Date of Birth",

        accessorKey: "dob",
        cell: ({ row }) => (
          <div className=" text-14 text-[#24282E] text-nowrap ">{row.original.dob}</div>
        ),
      },
      {
        header: "Gender",

        accessorKey: "gender",
        cell: ({ row }) => (
          <div className=" text-14 text-[#24282E] text-nowrap ">{row.original.gender}</div>
        ),
      },
      {
        header: "Qualification",

        accessorKey: "qualification",
        cell: ({ row }) => (
          <div className=" text-14 text-[#24282E] text-nowrap ">
            {row.original.qualification}
          </div>
        ),
      },
      {
        header: "Occupation",

        accessorKey: "occupation",
        cell: ({ row }) => (
          <div className=" text-14 text-[#24282E] text-nowrap ">
            {row.original.occupation}
          </div>
        ),
      },
      {
        header: "Marital Status",

        accessorKey: "maritalStatus",
        cell: ({ row }) => (
          <div className=" text-14 text-[#24282E] text-nowrap ">
            {row.original.maritalStatus}
          </div>
        ),
      },
      {
        header: "Working Country",

        accessorKey: "workingCountry",
        cell: ({ row }) => (
          <div className=" text-14 text-[#24282E] text-nowrap ">
            {row.original.workingCountry}
          </div>
        ),
      },
      {
        header: "Working State",

        accessorKey: "workingState",
        cell: ({ row }) => (
          <div className=" text-14 text-[#24282E] text-nowrap ">
            {row.original.workingState}
          </div>
        ),
      },
      {
        header: "Income",

        accessorKey: "income",
        cell: ({ row }) => (
          <div className=" text-14 text-[#24282E] text-nowrap ">{row.original.income}</div>
        ),
      },
      {
        header: "Blood",

        accessorKey: "bloodGroup",
        cell: ({ row }) => (
          <div className=" text-14 text-[#24282E] text-nowrap ">
            {row.original.bloodGroup}
          </div>
        ),
      },
    ],
    [members]
  );

  const table = useReactTable({
    data: members,
    columns,

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="mt-6">
      {isLoading && <Loading />}
      <PaginatedTable table={table} minWidth="100%" />
    </div>
  );
};

export default ListMembersTable;
