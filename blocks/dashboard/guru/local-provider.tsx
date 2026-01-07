"use client";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Modal from "./modal/modal-guru";
import { Table } from "../guru/table";

const GuruLocalizationProvider = ({teachings}: any) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Modal />
      <Table teachings={teachings} />
    </LocalizationProvider>
  )

};

export default GuruLocalizationProvider;