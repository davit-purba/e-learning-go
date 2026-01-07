"use client";

import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { data } from './make-data';
import { columns } from "./columns";
const UserTable = () => {
  const { isOpen, setIsOpen, setTitle } = useModalContext();

  const toggleModal = () => {
    setIsOpen(!isOpen)
    setTitle("Tambah Mata Pelajaran")

  }
  const table = useMaterialReactTable({
    columns,
    data,
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
        <h1 className="font-semibold">Data Mata Pelajaran</h1>
        <OpenModalButton openDrawer={toggleModal} title={"Tambah Mata Pelajaran"} icon={<Plus />} />
      </div>
      <MaterialReactTable table={table} />
    </>
  );
};

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Modal from "./modal-mapel";
import { useModalContext } from "@/context/modal-context";
import OpenModalButton from "./open-modal";
import { Plus } from "lucide-react";

const ExampleWithLocalizationProvider = () => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Modal />
    <UserTable />
  </LocalizationProvider>
);

export default ExampleWithLocalizationProvider;
