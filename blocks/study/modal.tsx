"use client";

import { X } from "lucide-react";
import { useModalContext } from "@/context/modal-context";
import { useForm, SubmitHandler } from "react-hook-form";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useClassStudent } from "@/context/service/classStudent";

type Inputs = {
  code: string;
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
export default function ModalMateri({ teaching_id, closeDrawer, title }: any) {
  const { isOpen, setIsOpen } = useModalContext();
  const { handleCreate } = useClassStudent()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    defaultValues: {
      code: "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("Data dikirim:", data);
    const payload = {
      teaching_id: teaching_id,
      ...data
    }
    handleCreate(payload)
    closeDrawer();
    reset();
  };

  const handleClose = () => {
    setIsOpen(false);
    reset();
  };

  return (
    <>
      <div
        className={`modal-backdrop ${isOpen ? "show" : ""}`}
        onClick={closeDrawer}
      >
        <div
          className={`modal-center w-[90%] sm:w-[50%] md:w-[35%] ${isOpen ? "show" : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            <h1 className="modal-title">{title}</h1>
            <button className="modal-close-btn" onClick={closeDrawer}>
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Item>


                <div className="flex flex-col mb-3 text-left">
                  <label htmlFor="password" className="font-semibold mb-1 text-sm">Code</label>
                  <input
                    id="code"
                    type="password"
                    {...register("code", { required: "Code wajib diisi" })}
                    className="input w-full border p-2 rounded-md"
                    placeholder="Masukkan Password"
                  />
                  {errors.code && (
                    <span className="text-red-500 text-sm">{errors.code.message}</span>
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