"use client";

import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { columns } from "./columns";
import { useModalContext } from "@/context/modal-context";
import OpenModalButton from "./modal/open-modal";
import { Plus } from "lucide-react";
export const Table = ({teachings}: any) => {
  const { isOpen, setIsOpen, setTitle } = useModalContext();

  const toggleModal = () => {
    setIsOpen(!isOpen)
    setTitle("Tambah Kelas Study")

  }
  const table = useMaterialReactTable({
    columns,
    data: teachings,
    enableHiding: false,
    enableDensityToggle: false,
    initialState: {
      showColumnFilters: false,
      density: "compact",
    },
  });

  return (
    <>
      <div className="flex justify-between p-2">
        <h1 className="font-semibold">Data Kelas Study</h1>
        <OpenModalButton openDrawer={toggleModal} title={"Tambah  Kelas Study"} icon={<Plus />} />
      </div>
      <MaterialReactTable table={table} />
    </>
  );
};

