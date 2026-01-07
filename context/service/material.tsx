"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import swal from "sweetalert2";
import { toast } from 'react-toastify';
import { useMeeting } from "./meeting";

const MaterialContext = createContext<any>(null);

export const useMaterial = () => {
    const context = useContext(MaterialContext);
    if (!context) {
        throw new Error("useMaterial must be used within a MaterialProvider");
    }
    return context;
};

export const MaterialProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [rowSelection, setRowSelection] = React.useState({});
    const { data: session } = useSession();
    const [materials, setMaterials] = useState<[] | any>([]);
    const [classes, setClasses] = useState<[] | any>([]);
    const [subjects, setSubjects] = useState<[] | any>([]);
    const [isOpenMeet, setIsOpenMeet] = React.useState(false);
    const [teachings, setTeachings] = useState<[] | any>([]);
    const [activeMeetingId, setActiveMeetingId] = useState<number | null>(null);
    const [fileTeori, setFileTeori] = useState()
    const [oneMateri, setOneMateri] = useState()
    const { mutate, setMutate } = useMeeting();
    const router = useRouter();
    const [selectedIds, setSelectedIds] = React.useState<string[]>([]);

    const searchParams = useSearchParams()
    const mid = searchParams.get("mid")

    const handleCreate = async (formData: FormData) => {
        setIsLoading(true);

        try {
            const res = await fetch("/api/service/material", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                toast.error("Gagal membuat data baru");
                return;
            }

            toast.success("Berhasil membuat data baru");
        } catch (error) {
            console.error(error);
        } finally {
            setMutate(!mutate);
            setIsLoading(false);
        }
    };

    const handleEditFile = async (formData: FormData) => {
        setIsLoading(true);

        try {
            const res = await fetch(`/api/service/material/${mid}/file`, {
                method: "PUT",
                body: formData,
            });

            if (!res.ok) {
                toast.error("Gagal Edit data");
                return;
            }

            toast.success("Berhasil edit data");
        } catch (error) {
            console.error(error);
        } finally {
            setMutate(!mutate);
            setIsLoading(false);
        }
    };


    const handleChangeMaterial = async () => {
        setMutate(!mutate);
        setSelectedIds([]);
        setRowSelection({});
    };

    const handleDeleteMateri = (id: number) => {
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
                const res = await fetch(`/api/service/material/${id}`, {
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
                setMutate(!mutate);
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
                const res = await fetch(`/api/service/material/${mid}/detail`, {
                    method: "GET",
                });

                if (!res.ok) throw new Error("Failed to fetch data");

                const response = await res.json();
                setOneMateri(response.data.data);
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
                const res = await fetch(`/api/service/material/view/${mid}`, {
                    method: "GET",
                });

                if (!res.ok) throw new Error("Failed to fetch data");
                const response = await res.json();
                setFileTeori(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [session, router, mutate, mid]);


    // useEffect(() => {
    //     if (!session?.accessToken) return;

    //     const fetchData = async () => {
    //         try {
    //             const res = await fetch(`/api/service/Material/${session.user.id}`, {
    //                 method: "GET",
    //             });

    //             if (!res.ok) throw new Error("Failed to fetch data");

    //             const response = await res.json();
    //             setMaterials(response.data);
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };

    //     fetchData();
    // }, [session, router, mutate]);
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
        <MaterialContext.Provider
            value={{
                isLoading,
                isOpenMeet,
                setIsOpenMeet,
                setIsLoading,
                handleCreate,
                // handleChangeMaterial,
                handleDeleteMateri,
                classes,
                subjects,
                fileTeori,
                oneMateri,
                setFileTeori,
                materials,
                teachings,
                selectedIds,
                rowSelection,
                activeMeetingId,
                setActiveMeetingId,
                setSelectedIds,
                setRowSelection,
                handleEditFile
                // EditFormSchema,
                // onSubmitEdit,
            }}
        >
            {children}
        </MaterialContext.Provider>
    );
};
