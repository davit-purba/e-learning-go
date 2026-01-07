import { Plus } from "lucide-react";
import ModalMataPelajaran from "./modal";
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
            <ModalMataPelajaran closeDrawer={toggleDrawer} title={"Tambah Mata Pelajaran"}/>
        </div>
    );
}
