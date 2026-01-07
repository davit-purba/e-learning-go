"use client";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Modal from "./modal/modal-user";
import { Table } from "./table";

const UserLocalizationProvider = ({users}: any) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Modal />
      <Table users={users} />
    </LocalizationProvider>
  )

};

export default UserLocalizationProvider;