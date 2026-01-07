"use client";

import React from "react";

const ModalContext = React.createContext<any>(null);

export const useModalContext = () => {
  return React.useContext(ModalContext);
};

    const swal =  require("sweetalert2");

const ModalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [editData, setEditData] = React.useState(null);
  const [title, setTitle] = React.useState("");

  const handleDelete = (id: string) => {

    swal({
      title: "Yakin ingin menghapus?",
      text: "Data yang dihapus tidak dapat dikembalikan!",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then((result: any) => {
      
      if (result) {
        swal("Berhasil!", `Data ${id} berhasil dihapus.`, "success");
      } else {
        swal("Dibatalkan", "Data tidak jadi dihapus.", "info");
      }
    });

  };

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        setIsOpen,
        editData,
        title,
        setTitle,
        setEditData,
        handleDelete
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;
