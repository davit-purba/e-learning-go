"use client";

import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useModalContext } from "@/context/modal-context";
import { X } from "lucide-react";
import { useTeaching } from "@/context/service/teaching";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  boxShadow: "none",
  color: (theme.vars ?? theme).palette.text.secondary,
}));

type Inputs = {
  id: number;
  class_id: number;
  subject_id: number;
  schedule: string;
  tahun: string,
  code: string
};

export default function FormModal({ closeDrawer }: any) {
  const { isOpen, setIsOpen, editData, setEditData, title } = useModalContext();
  const { classes, subjects, handleCreate } = useTeaching()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<Inputs>({
    defaultValues: {
      id: 0,
      class_id: 0,
      subject_id: 0,
      schedule: "",
      tahun: "",
      code: ""
    },
  });

  useEffect(() => {
    if (editData) {
      reset({
        ...editData,
        isActive: editData.isActive ? "true" : "false",
        joinDate: editData.joinDate?.split("T")[0] || "",
      });
    } else {
      reset({
        id: 0,
        class_id: 0,
        subject_id: 0,
        schedule: "",
        tahun: "",
        code: ""
      });
    }
  }, [editData, reset]);

  const handleClose = () => {
    // if (editData) {
    //   const currentValues = getValues();

    //   const hasChanges = Object.keys(currentValues).some((key) => {
    //     const k = key as keyof Inputs;

    //     if (k === "isActive") {
    //       return (currentValues[k] === "true") !== editData[k];
    //     }
    //     if (k === "joinDate") {
    //       return currentValues[k] !== editData[k]?.split("T")[0];
    //     }
    //     return currentValues[k] !== editData[k];
    //   });

    //   if (hasChanges) {
    //     const confirmClose = window.confirm(
    //       "Apakah yakin ingin membatalkan perubahan ini?"
    //     );
    //     if (!confirmClose) return;
    //   }
    // }

    setEditData(null);
    setIsOpen(false);
    reset();
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (editData) {
      // handleEdit()
    }
    handleCreate(data)
    setIsOpen(false);
    reset();
  };


  return (
    <>
      {/* Backdrop */}
      <div
        className={`modal-backdrop ${isOpen ? "show" : ""}`}
        onClick={handleClose}
      >
        {/* Modal */}
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
                  <label>Kelas</label>
                  <select
                    {...register("class_id", {
                      required: "Kelas wajib dipilih",
                    })}
                    className="input"
                  >
                    <option value="">-- Pilih Kelas --</option>
                    {classes.map((c: any) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  {errors.class_id && (
                    <span className="text-red-500 text-sm">{errors.class_id.message}</span>
                  )}
                </div>
                <div className="flex flex-col mb-3">
                  <label>Subject</label>
                  <select
                    {...register("subject_id", {
                      required: "Provinsi wajib dipilih",
                    })}
                    className="input"
                  >
                    <option value="">-- Pilih Subject --</option>
                    {subjects.map((p: any) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                  {errors.subject_id && (
                    <span className="text-red-500 text-sm">{errors.subject_id.message}</span>
                  )}
                </div>
                <div className="flex flex-col mb-3">
                  <label htmlFor="schedule">Schedule</label>
                  <input
                    id="schedule"
                    {...register("schedule", { required: "Schedule wajib diisi" })}
                    className="input"
                    placeholder="Schedule"
                  />
                  {errors.schedule && (
                    <span className="text-red-500 text-sm">{errors.schedule.message}</span>
                  )}
                </div>
                 <div className="flex flex-col mb-3">
                  <label htmlFor="code">Code</label>
                  <input
                    id="code"
                    {...register("code", { required: "Code wajib diisi" })}
                    className="input"
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
                    className="input"
                    placeholder="Tahun"
                  />
                  {errors.tahun && (
                    <span className="text-red-500 text-sm">{errors.tahun.message}</span>
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
