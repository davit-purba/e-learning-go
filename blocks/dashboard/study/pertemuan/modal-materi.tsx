"use client";

import { X } from "lucide-react";
import { useModalContext } from "@/context/modal-context";
import { useForm, SubmitHandler } from "react-hook-form";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useMaterial } from "@/context/service/material";
import { useMeeting } from "@/context/service/meeting";

const id_guru = 201;
type Inputs = {
    meeting_id: number;
    title: string;
    type: number;
    file: FileList;
};

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    boxShadow: "none",
    color: (theme.vars ?? theme).palette.text.secondary,
    ...theme.applyStyles("dark", {
        backgroundColor: "#1A2027",
    }),
}));

export default function ModalMateri({ closeDrawer, title }: any) {
    const { isOpen, setIsOpen } = useModalContext();
    const { handleCreate, activeMeetingId } = useMaterial()
    const { mutate, setMutate } = useMeeting()
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        getValues,
    } = useForm<Inputs>({
        defaultValues: {
            title: "",
        },
    });

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const formData = new FormData();

        formData.append("title", data.title);
        formData.append("type", String(data.type));
        formData.append("meeting_id", String(activeMeetingId));
        formData.append("file", data.file[0]);

        handleCreate(formData);

        setIsOpen(false);
        reset();
    };


    const typePertemuan = [
        {
            id: 1,
            name: "teori"
        },
        {
            id: 2,
            name: "tugas"
        }
    ]


    const handleClose = () => {
        // if (editData) {
        //   const currentValues = getValues();

        //   // cek apakah ada perubahan
        //   const hasChanges = Object.keys(currentValues).some((key) => {
        //     const k = key as keyof Inputs;

        //     if (k === "isActive") {
        //       return (currentValues[k] === "true") !== editData[k];
        //     }
        //     if (k === "enrollmentDate") {
        //       return currentValues[k] !== editData[k]?.split("T")[0];
        //     }
        //     return currentValues[k] !== editData[k as keyof Inputs];
        //   });

        //   if (hasChanges) {
        //     const confirmClose = window.confirm(
        //       "Apakah yakin ingin membatalkan perubahan ini?"
        //     );
        //     if (!confirmClose) return;
        //   }
        // }

        setIsOpen(false);
        reset();
    };
    return (
        <>
            {/* Backdrop */}
            <div
                className={`modal-backdrop ${isOpen ? "show" : ""}`}
                onClick={closeDrawer}
            >
                {/* Modal Box */}
                <div
                    className={`modal-center ${isOpen ? "show" : ""}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="modal-header">
                        <h1 className="modal-title">{title}</h1>

                        <button
                            className="modal-close-btn"
                            onClick={closeDrawer}
                            aria-label="Close modal"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="modal-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Item>
                                <div className="flex flex-col mb-3">
                                    <label htmlFor="title">Title</label>
                                    <input
                                        id="title"
                                        {...register("title", { required: "Nama wajib diisi" })}
                                        className="input w-full"
                                        placeholder="Title"
                                    />
                                    {errors.title && (
                                        <span className="text-red-500 text-sm">{errors.title.message}</span>
                                    )}
                                </div>
                                <div className="flex flex-col mb-3">
                                    <label htmlFor="type">Type</label>
                                    <select
                                        id="type"
                                        {...register("type", { required: "Kota wajib dipilih" })}
                                        className="input"
                                    >
                                        <option value="">-- Pilih Type --</option>
                                        {typePertemuan.map((c) => (
                                            <option key={c.id} value={c.id}>
                                                {c.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.type && (
                                        <span className="text-red-500 text-sm">{errors.type.message}</span>
                                    )}
                                </div>
                                <div className="flex flex-col mb-3">
                                    <label htmlFor="file">File</label>
                                    <input
                                        id="file"
                                        type="file"
                                        {...register("file", { required: "Nama wajib diisi" })}
                                        className="input w-full"
                                        placeholder="file"
                                    />
                                    {errors.file && (
                                        <span className="text-red-500 text-sm">{errors.file.message}</span>
                                    )}
                                </div>
                            </Item>
                            <div className="modal-actions mt-4 flex justify-end gap-3">
                                <Button onClick={handleClose} variant="outlined">
                                    Cancel
                                </Button>
                                <Button type="submit" variant="contained">
                                    Save
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
