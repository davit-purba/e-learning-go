import { type MRT_ColumnDef } from "material-react-table";
import { type MataPelajaran, } from "./make-data";
import { useModalContext } from "@/context/modal-context";
import { PencilLine, Trash2 } from "lucide-react";

export const columns: MRT_ColumnDef<MataPelajaran>[] = [
  {
    accessorKey: "code",
    header: "Code",
    size: 200,
  },
  {
    accessorKey: "name",
    header: "Nama",
    size: 160,
  },
  {
    id: "actions",
    header: "Aksi",
    enableSorting: false,
    enableColumnFilter: false,
    Cell: ({ row }) => {
      const { setIsOpen, setEditData, handleDelete, setTitle } =
        useModalContext();

      return (
        <div className="flex flex-row gap-2">
          <button
            className="btn btn-primary"
            onClick={() => {
              setEditData?.(row.original);
              setIsOpen?.(true);
              setTitle("Edit Mata Pelajaran");
            }}
          >
            <PencilLine size={12} color="blue" />
          </button>

          <button
            className="btn btn-primary"
            onClick={() => handleDelete(row.original.id)}
          >
            <Trash2 size={12} color="red" />
          </button>
        </div>
      );
    },
  },
];
