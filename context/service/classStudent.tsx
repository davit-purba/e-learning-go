"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import swal from "sweetalert2";
import { toast } from 'react-toastify';

const ClassStudentContext = createContext<any>(null);

export const useClassStudent = () => {
    const context = useContext(ClassStudentContext);
    if (!context) {
        throw new Error("useClassStudent must be used within a ClassStudentProvider");
    }
    return context;
};

export const ClassStudentProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [rowSelection, setRowSelection] = React.useState({});
    const { data: session } = useSession();
    const [classStudents, setClassStudents] = useState();
    const [classStudent, setClassStudent] = useState();
    const [mutate, setMutate] = useState<boolean>(false);
    const router = useRouter();
    const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
    const [classId, setClassId] = React.useState<number>();
    const params = useSearchParams()
    const tid = params.get("tid")
    console.log("tid", tid)
        console.log("classStudent", classStudent)

    const handleCreate = async (payload: any) => {
        console.log("payload", payload)
        setIsLoading(true);
        try {
            const body = JSON.stringify(payload);
            const res = await fetch(`/api/service/classStudent`, {
                method: "POST",
                body,
            });
            if (!res.ok) return (
                toast.error("Gagal membuat data baru")
            );
            toast.success("Berhasil membuat data baru");
        } catch (error) {

        } finally {
            setMutate((prev) => !prev);
            setIsLoading(false);
        }
    };


    const handleDelete = (id: number) => {
        swal({
            title: "Yakin ingin menghapus?",
            text: "Data yang dihapus tidak dapat dikembalikan!",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, hapus",
            cancelButtonText: "Batal",
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
        }).then(async (result: any) => {
            if (!result) return;

            setIsLoading(true);

            try {
                const res = await fetch(`/api/service/classStudent/${id}`, {
                    method: "DELETE",
                });

                const response = await res.json();

                if (!res.ok) {
                    swal("Failed!", response.message || "Gagal menghapus data.", "error");
                    return;
                }

                swal("Successfully!", response.message || "Data berhasil dihapus.", "success");
            } catch (error) {
                swal("Failed!", "Data gagal dihapus.", "error");
            } finally {
                setMutate((prev) => !prev);
                setIsLoading(false);
            }
        });
    };


    useEffect(() => {
        if (!session?.accessToken) return;

        const fetchData = async () => {
            try {
                const res = await fetch(`/api/service/classStudent`, {
                    method: "GET",
                });

                if (!res.ok) throw new Error("Failed to fetch data");

                const response = await res.json();
                setClassStudents(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [session, router, mutate]);

    useEffect(() => {
        if (!session?.accessToken) return;

        const fetchData = async () => {
            try {
                const res = await fetch(`/api/service/classStudent/teaching/${tid}`, {
                    method: "GET",
                });

                if (!res.ok) throw new Error("Failed to fetch data");

                const response = await res.json();
                setClassStudent(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [session, router, mutate, tid]);


    return (
        <ClassStudentContext.Provider
            value={{
                isLoading,
                setIsLoading,
                handleCreate,
                // handleChangeClassStudent,
                handleDelete,
                classStudents,
                classStudent,
                classId,
                setClassId,
                selectedIds,
                rowSelection,
                setSelectedIds,
                setRowSelection,
                // EditFormSchema,
                // onSubmitEdit,
            }}
        >
            {children}
        </ClassStudentContext.Provider>
    );
};
