import { type MRT_ColumnDef } from "material-react-table";
import { PencilLine, Trash2 } from "lucide-react";
import { useModalContext } from "@/context/modal-context";

export const columns: MRT_ColumnDef<any>[] = [
  {
    accessorFn: (row) => row.User.name,
    id: "teacherName",
    header: "Nama Guru",
    size: 200,
  },
  {
    accessorFn: (row) => row.Subject.name,
    id: "subject",
    header: "Mata Pelajaran",
    size: 180,
  },
  {
    accessorFn: (row) => row.Class.name,
    id: "class",
    header: "Kelas",
    size: 120,
  },
  {
    accessorKey: "code",
    header: "Code",
    size: 200,
  },
  {
    accessorKey: "schedule",
    header: "Jadwal",
    size: 200,
  },
    {
    accessorKey: "tahun",
    header: "Tahun",
    size: 200,
  },
  {
    header: "Status Guru",
    accessorFn: (row) => row.User.isActive,
    id: "status",
    Cell: ({ cell }) => (
      <span
        className={`px-2 py-1 rounded text-sm ${
          cell.getValue<number>()
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {cell.getValue<number>() ? "Aktif" : "Nonaktif"}
      </span>
    ),
  },
  // {
  //   id: "actions",
  //   header: "Aksi",
  //   enableSorting: false,
  //   enableColumnFilter: false,
  //   Cell: ({ row }) => {
  //     const { setIsOpen, setEditData, handleDelete, setTitle } =
  //       useModalContext();

  //     return (
  //       <div className="flex flex-row gap-2">
  //         <button
  //           className="btn btn-primary"
  //           onClick={() => {
  //             setEditData?.(row.original);
  //             setIsOpen?.(true);
  //             setTitle("Edit Jadwal Mengajar");
  //           }}
  //         >
  //           <PencilLine size={12} color="blue" />
  //         </button>

  //         <button
  //           className="btn btn-primary"
  //           onClick={() => handleDelete(row.original.id)}
  //         >
  //           <Trash2 size={12} color="red" />
  //         </button>
  //       </div>
  //     );
  //   },
  // },
];
