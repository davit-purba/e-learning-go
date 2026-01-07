export const dynamic = "force-dynamic";


import { Header } from '@/components/header/header'
import DrawerContextProvider from '@/context/drawer-context'
import ModalContextProvider from '@/context/modal-context'
import { ClassStudentProvider } from '@/context/service/classStudent';
import { TeachingProvider } from '@/context/service/teaching';

export default function Layout({ children }: any) {
    return (
        <>
            <DrawerContextProvider>
                <ModalContextProvider>
                    <TeachingProvider>
                        <ClassStudentProvider>
                            <Header />
                            {children}
                        </ClassStudentProvider>
                    </TeachingProvider>
                </ModalContextProvider>
            </DrawerContextProvider>
        </>
    )
}

