"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from 'react-toastify';
import { useMeeting } from "./meeting";

const AnswerContext = createContext<any>(null);

export const useAnswer = () => {
    const context = useContext(AnswerContext);
    if (!context) {
        throw new Error("useAnswer must be used within a AnswerProvider");
    }
    return context;
};

export const AnswerProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [rowSelection, setRowSelection] = React.useState({});
    const { data: session } = useSession();
    const [answers, setAnswers] = useState<[] | any>([]);
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
            const res = await fetch("/api/service/answer", {
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

    const handleChangeAnswer = async () => {
        setMutate(!mutate);
        setSelectedIds([]);
        setRowSelection({});
    };

    useEffect(() => {
        if (!session?.accessToken) return;

        const fetchData = async () => {
            try {
                const res = await fetch(`/api/service/answer/${mid}/detail`, {
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
                const res = await fetch(`/api/service/answer/view/${mid}`, {
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



    return (
        <AnswerContext.Provider
            value={{
                isLoading,
                isOpenMeet,
                setIsOpenMeet,
                setIsLoading,
                handleCreate,
                // handleChangeAnswer,
                classes,
                subjects,
                fileTeori,
                oneMateri,
                setFileTeori,
                answers,
                teachings,
                selectedIds,
                rowSelection,
                activeMeetingId,
                setActiveMeetingId,
                setSelectedIds,
                setRowSelection,
                // EditFormSchema,
                // onSubmitEdit,
            }}
        >
            {children}
        </AnswerContext.Provider>
    );
};
