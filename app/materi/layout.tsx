export const dynamic = "force-dynamic";


import { Header } from '@/components/header/header'
import DrawerContextProvider from '@/context/drawer-context'
import ModalContextProvider from '@/context/modal-context'
import { AnswerProvider } from '@/context/service/answer';
import { ClassStudentProvider } from '@/context/service/classStudent';
import { MaterialProvider } from '@/context/service/material';
import { MeetingProvider } from '@/context/service/meeting';
import { TeachingProvider } from '@/context/service/teaching';

export default function Layout({ children }: any) {
    return (
        <>
            <DrawerContextProvider>
                <ModalContextProvider>
                    <MeetingProvider>
                        <MaterialProvider>
                            <TeachingProvider>
                                <ClassStudentProvider>
                                    <AnswerProvider>
                                        <Header />
                                        {children}
                                    </AnswerProvider>
                                </ClassStudentProvider>
                            </TeachingProvider>
                        </MaterialProvider>
                    </MeetingProvider>
                </ModalContextProvider>
            </DrawerContextProvider>
        </>
    )
}

