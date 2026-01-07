"use client";

import React, { useEffect } from "react";
import { Button, Modal } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useModalContext } from "@/context/modal-context";
import { X } from "lucide-react";
import { useUser } from "@/context/service/user";
export const userGroup = [
  "siswa",
  "guru",
  "admin"
];
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

type Inputs = {
  name: string;
  username: string;
  password: string;
  role: string;
  isActive: number;
};

export default function FormModal({ closeDrawer }: any) {
  const { isOpen, setIsOpen, editData, setEditData, title } = useModalContext();
  const { handleCreate } = useUser()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    defaultValues: {
      name: "",
      username: "",
      password: "",
      role: "",
      isActive: 1,
    },
  });

  useEffect(() => {
    if (editData) {
      reset({
        ...editData,
        isActive: editData.isActive ? 1 : 0,
        enrollmentDate: editData.enrollmentDate?.split("T")[0] || "",
      });
    } else {
      reset({
        name: "",
        username: "",
        password: "",
        role: "",
        isActive: 1,
      });
    }
  }, [editData, reset]);

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
              {/* Kiri */}
              <Item>
                <div className="flex flex-col mb-3">
                  <label htmlFor="name">Nama</label>
                  <input
                    id="name"
                    {...register("name", { required: "Nama wajib diisi" })}
                    className="input"
                    placeholder="Nama"
                  />
                  {errors.name && (
                    <span className="text-red-500 text-sm">{errors.name.message}</span>
                  )}
                </div>
                <div className="flex flex-col mb-3">
                  <label htmlFor="name">Username</label>
                  <input
                    id="username"
                    {...register("username", { required: "Username wajib diisi" })}
                    className="input"
                    placeholder="Username"
                  />
                  {errors.username && (
                    <span className="text-red-500 text-sm">{errors.username.message}</span>
                  )}
                </div>

                <div className="flex flex-col mb-3">
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    {...register("password", {
                      required: editData ? false : "Password wajib diisi",
                    })} className="input"
                    placeholder="Password"
                  />
                  {errors.password && (
                    <span className="text-red-500 text-sm">{errors.password.message}</span>
                  )}
                </div>

                <div className="flex flex-col mb-3">
                  <label htmlFor="isActive">Status Akun</label>
                  <select id="isActive" {...register("isActive")} className="input">
                    <option value={1}>Aktif</option>
                    <option value={0}>Tidak Aktif</option>
                  </select>
                </div>

                <div className="flex flex-col mb-3">
                  <label htmlFor="role">User group</label>
                  <select
                    id="role"
                    {...register("role", { required: "User group wajib dipilih" })}
                    className="input"
                  >
                    <option value="">-- Pilih User Group --</option>
                    {userGroup.map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                  </select>
                  {errors.role && (
                    <span className="text-red-500 text-sm">{errors.role?.message}</span>
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
