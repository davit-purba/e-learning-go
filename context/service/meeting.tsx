"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import swal from "sweetalert2";
import { toast } from 'react-toastify';

const MeetingContext = createContext<any>(null);

export const useMeeting = () => {
    const context = useContext(MeetingContext);
    if (!context) {
        throw new Error("useMeeting must be used within a MeetingProvider");
    }
    return context;
};

export const MeetingProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {

    const params = useParams();

    const [isLoading, setIsLoading] = React.useState(false);
    const [rowSelection, setRowSelection] = React.useState({});
    const { data: session } = useSession();
    const [meetings, setMeetings] = useState<[] | any>([]);
    const [classes, setClasses] = useState<[] | any>([]);
    const [subjects, setSubjects] = useState<[] | any>([]);
    const [isOpenMeet, setIsOpenMeet] = React.useState(false);
    const [teachings, setTeachings] = useState<[] | any>([]);
    const [teachingId, setTeachingId] = useState<number>(Number(params?.teaching_id));

    const [mutate, setMutate] = useState<boolean>(false);
    const router = useRouter();
    const [selectedIds, setSelectedIds] = React.useState<string[]>([]);

    const handleCreate = async (data: any) => {
        setIsLoading(true);
        try {
            const payload = {
                ...data,
                teaching_id: teachingId
            }
            const body = JSON.stringify(payload);
            const res = await fetch(`/api/service/meeting`, {
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

    const handleChangeMeeting = async () => {
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
                const res = await fetch(`/api/service/meeting/${id}`, {
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
                const res = await fetch(`/api/service/teaching/r/${teachingId}`, {
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

    // useEffect(() => {
    //     if (!session?.accessToken) return;

    //     const fetchData = async () => {
    //         try {
    //             const res = await fetch(`/api/service/meeting/${session.user.id}`, {
    //                 method: "GET",
    //             });

    //             if (!res.ok) throw new Error("Failed to fetch data");

    //             const response = await res.json();
    //             setMeetings(response.data);
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };

    //     fetchData();
    // }, [session, router, mutate]);

    return (
        <MeetingContext.Provider
            value={{
                isLoading,
                isOpenMeet,
                setIsOpenMeet,
                setIsLoading,
                handleCreate,
                mutate, 
                setMutate,
                // handleChangeMeeting,
                handleDelete,
                classes,
                subjects,
                meetings,
                teachings,
                teachingId, 
                setTeachingId,
                selectedIds,
                rowSelection,
                setSelectedIds,
                setRowSelection,
                // EditFormSchema,
                // onSubmitEdit,
            }}
        >
            {children}
        </MeetingContext.Provider>
    );
};
