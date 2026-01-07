"use client";

import { X } from "lucide-react";
import { useModalContext } from "@/context/modal-context";
import { useForm, SubmitHandler } from "react-hook-form";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useMaterial } from "@/context/service/material";
import { useTeaching } from "@/context/service/teaching";
type Inputs = {
    subject_id: number;
    class_id: number;
    code: string,
    tahun: string,
    schedule: string;
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

export default function ModalMataPelajaran({ closeDrawer, title }: any) {
    const { isOpen, setIsOpen } = useModalContext();
    const { handleCreate, subjects, classId } = useTeaching()
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        getValues,
    } = useForm<Inputs>({
        defaultValues: {
            subject_id: 0,
            class_id: 0,
            code: "",
            tahun: "",
            schedule: ""
        },
    });

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        // if(editData) {
        //   handleEdit()
        // }
        const payload = {
            ...data,
            class_id: classId
        }
        handleCreate(payload)
        setIsOpen(false);
        reset();
    };

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
                    className={`modal-center w-[90%] sm:w-[50%] md:w-[35%] ${isOpen ? "show" : ""}`}
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
                                    <label htmlFor="subject_id">Study</label>
                                    <select
                                        id="subject_id"
                                        {...register("subject_id", { required: "Study wajib dipilih" })}
                                        className="input"
                                    >
                                        <option value="">-- Pilih Study --</option>
                                        {subjects.map((c: any) => (
                                            <option key={c.id} value={c.id}>
                                                {c.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.subject_id && (
                                        <span className="text-red-500 text-sm">{errors.subject_id.message}</span>
                                    )}
                                </div>
                                <div className="flex flex-col mb-3">
                                    <label htmlFor="code">Code</label>
                                    <input
                                        id="code"
                                        {...register("code", { required: "Code wajib diisi" })}
                                        className="input w-full"
                                        placeholder="Code"
                                    />
                                    {errors.code && (
                                        <span className="text-red-500 text-sm">{errors.code.message}</span>
                                    )}
                                </div>
                                <div className="flex flex-col mb-3">
                                    <label htmlFor="tahun">Tahun</label>
                                    <input
                                        id="tahun"
                                        {...register("tahun", { required: "Tahun wajib diisi" })}
                                        className="input w-full"
                                        placeholder="Tahun"
                                    />
                                    {errors.tahun && (
                                        <span className="text-red-500 text-sm">{errors.tahun.message}</span>
                                    )}
                                </div>
                                <div className="flex flex-col mb-3">
                                    <label htmlFor="schedule">Jadwal</label>
                                    <input
                                        id="schedule"
                                        {...register("schedule", { required: "Jadwal wajib diisi" })}
                                        className="input w-full"
                                        placeholder="Jadwal"
                                    />
                                    {errors.schedule && (
                                        <span className="text-red-500 text-sm">{errors.schedule.message}</span>
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
            </div >
        </>
    );
}
