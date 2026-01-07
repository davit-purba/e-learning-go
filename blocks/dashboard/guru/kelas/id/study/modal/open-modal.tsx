import { Plus } from "lucide-react";
import { useMeeting } from "@/context/service/meeting";
import ModalPertemuan from "./modal";
export default function OpenModalButtonPertemuan({ openDrawer }: any) {
    const { isOpenMeet, setIsOpenMeet } = useMeeting()
    function toggleDrawer() {
        setIsOpenMeet(!isOpenMeet)
    }
    return (
        <div>
            <button onClick={openDrawer}>
                <div tabIndex={0} role="button" className="">
                    <Plus />
                </div>
            </button>
            <ModalPertemuan closeDrawer={toggleDrawer} title={"Tambah Pertemuan"}/>
        </div>
    );
}
