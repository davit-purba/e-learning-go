import { type MRT_ColumnDef } from "material-react-table";
import { useModalContext } from "@/context/modal-context";
import { PencilLine, Trash2 } from "lucide-react";
import { useUser } from "@/context/service/user";

export type User = {
    id: number;
    name: string;
    username: string;
    password: string;
    role: string;
    isActive: boolean;
};

export const userGroup = [
    "siswa",
    "guru",
    "admin"
];

export const columns: MRT_ColumnDef<User>[] = [
    {
        accessorKey: "name",
        header: "Nama",
        size: 200,
    },
    {
        accessorKey: "username",
        header: "Username",
        size: 200,
    },
    {
        accessorKey: "role",
        header: "Grup User",
        filterVariant: "multi-select",
        filterSelectOptions: userGroup,
    },
    {
        header: "Status",
        accessorKey: "isActive",
        Cell: ({ cell }) => {
            const value = cell.getValue<number>();
console.log("Value ,,,", value)
            return (
                <span
                    className={`px-2 py-1 rounded text-sm ${value === 1 ? "text-green-700" : "text-red-700"
                        }`}
                >
                    {value === 1 ? "Aktif" : "Nonaktif"}
                </span>
            );
        },
        filterVariant: "select",
        filterSelectOptions: [
            { label: "Aktif", value: "1" },
            { label: "Nonaktif", value: "0" },
        ],
    },
    {
        id: "actions",
        header: "Aksi",
        enableSorting: false,
        enableColumnFilter: false,

        Cell: ({ row }) => {
            const { isOpen, setIsOpen, setEditData, setTitle } = useModalContext();
            const { handleDelete } = useUser();
            return (
                <div className="flex flex-row gap-2">
                    {/* <button
                        className="btn btn-primary"
                        onClick={() => {
                            setEditData?.(row.original);
                            setIsOpen?.(true);
                            setTitle("Edit User")
                        }}
                    >
                        <PencilLine size={12} color="blue" />
                    </button> */}
                    <button
                        className="btn btn-primary"
                        onClick={() => handleDelete(row.original.id)}
                    >
                        <Trash2 size={12} color="red" />
                    </button>
                    {/* <DeleteDialog id={row.original.id}/> */}
                </div>
            );
        },
    }

];
