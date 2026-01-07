export const dynamic = "force-dynamic";

import KelasSiswa from '@/blocks/dashboard/siswa/kelas/id'


interface PageProps {
    params: {
        id: string;
    };
}

export default function page({ params }: PageProps) {
    return (
        <div>
            <KelasSiswa params={{
                id: params.id,
            }} />
        </div>
    )
}
