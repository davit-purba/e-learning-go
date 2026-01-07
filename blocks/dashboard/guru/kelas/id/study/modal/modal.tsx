"use client";

import { X } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useMeeting } from "@/context/service/meeting";
const id_guru = 201;
type Inputs = {
    title: string;
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

export default function ModalPertemuan({ closeDrawer, title }: any) {
    const { isOpenMeet, setIsOpenMeet, handleCreate, handleDelete } = useMeeting();

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
    // if(editData) {
    //   handleEdit()
    // }
    handleCreate(data)
    setIsOpenMeet(false);
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

        setIsOpenMeet(false);
        reset();
    };
    return (
        <>
            {/* Backdrop */}
            <div
                className={`modal-backdrop ${isOpenMeet ? "show" : ""}`}
                onClick={closeDrawer}
            >
                {/* Modal Box */}
                <div
                    className={`modal-center w-[90%] sm:w-[50%] md:w-[35%] ${isOpenMeet ? "show" : ""}`}
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
                                        {...register("title", { required: "Title wajib diisi" })}
                                        className="input w-full"
                                        placeholder="Title"
                                    />
                                    {errors.title && (
                                        <span className="text-red-500 text-sm">{errors.title.message}</span>
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
