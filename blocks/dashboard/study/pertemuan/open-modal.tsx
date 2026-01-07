import { Plus } from "lucide-react";
import ModalMateri from "./modal-materi";
import { useModalContext } from "@/context/modal-context";
export default function OpenModalButton({ openDrawer }: any) {
    const { isOpen, setIsOpen } = useModalContext()
    function toggleDrawer() {
        setIsOpen(!isOpen)
    }
    return (
        <div>
            <button onClick={openDrawer}>
                <div tabIndex={0} role="button" className="">
                    <Plus />
                </div>
            </button>
            <ModalMateri closeDrawer={toggleDrawer} title={"Tambah Materi"} />
        </div>
    );
}
