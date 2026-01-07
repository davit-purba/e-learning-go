import { Plus } from "lucide-react";
import ModalMateri from "./modal";
import { useModalContext } from "@/context/modal-context";
import { Button } from "@mui/material";
export default function OpenModalButton({ id_study, openDrawer }: any) {
    const { isOpen, setIsOpen } = useModalContext()
    function toggleDrawer() {
        setIsOpen(!isOpen)
    }
    return (
        <div>
            <Button onClick={openDrawer} variant="contained">
                Ambil Mata Pelajaran
            </Button>
            <ModalMateri id_study={id_study} closeDrawer={toggleDrawer} title={"Ambil Mata Pelajaran"} />
        </div>
    );
}
