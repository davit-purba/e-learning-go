"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import swal from "sweetalert2";
import { toast } from 'react-toastify';

const TeachingContext = createContext<any>(null);

export const useTeaching = () => {
    const context = useContext(TeachingContext);
    if (!context) {
        throw new Error("useTeaching must be used within a TeachingProvider");
    }
    return context;
};

export const TeachingProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [rowSelection, setRowSelection] = React.useState({});
    const { data: session } = useSession();
    const [teachings, setTeachings] = useState<[] | any>([]);
        const [teachingStudies, setTeachingStudies] = useState<[] | any>([]);
    const [classes, setClasses] = useState<[] | any>([]);
    const [subjects, setSubjects] = useState<[] | any>([]);

    const [mutate, setMutate] = useState<boolean>(false);
    const router = useRouter();
    const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
    const [classId, setClassId] = React.useState<number>();

    const handleCreate = async (payload: any) => {
        console.log("payload", payload)
        setIsLoading(true);
        try {
            const body = JSON.stringify(payload);
            const res = await fetch(`/api/service/teaching`, {
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

    const handleChangeTeaching = async () => {
        setMutate((prev) => !prev);
        setSelectedIds([]);
        setRowSelection({});
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
                const res = await fetch(`/api/service/teaching/${id}`, {
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
                const res = await fetch(`/api/service/teaching/${session.user.id}`, {
                    method: "GET",
                });

                if (!res.ok) throw new Error("Failed to fetch data");

                const response = await res.json();
                setTeachings(response.data);
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
                const res = await fetch(`/api/service/teaching`, {
                    method: "GET",
                });

                if (!res.ok) throw new Error("Failed to fetch data");

                const response = await res.json();
                setTeachingStudies(response.data);
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
                const res = await fetch(`/api/service/class`, {
                    method: "GET",
                });

                if (!res.ok) throw new Error("Failed to fetch data");

                const response = await res.json();
                setClasses(response.data);
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
                const res = await fetch(`/api/service/subject`, {
                    method: "GET",
                });

                if (!res.ok) throw new Error("Failed to fetch data");

                const response = await res.json();
                setSubjects(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [session, router, mutate]);

    return (
        <TeachingContext.Provider
            value={{
                isLoading,
                setIsLoading,
                handleCreate,
                // handleChangeTeaching,
                handleDelete,
                classes,
                subjects,
                teachings,
                teachingStudies,
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
        </TeachingContext.Provider>
    );
};
