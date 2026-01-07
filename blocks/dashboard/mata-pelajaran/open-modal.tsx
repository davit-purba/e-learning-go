import { Plus } from "lucide-react";
import { useModalContext } from "@/context/modal-context";
import FormModal from "./modal-mapel";
export default function OpenModalButton({ openDrawer, icon }: any) {
    const { isOpen, setIsOpen, setEditData, handleDelete } = useModalContext()
    function toggleDrawer() {
        setEditData(null)
        setIsOpen(!isOpen)
    }
    return (
        <div>
            <button onClick={openDrawer}>
                <div tabIndex={0} role="button" className="text-blue-600">
                    {icon}
                </div>
            </button>
            <FormModal closeDrawer={toggleDrawer} />
        </div>
    );
}
