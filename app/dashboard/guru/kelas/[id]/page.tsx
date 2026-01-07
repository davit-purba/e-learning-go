export const dynamic = "force-dynamic";


import KelasByGuru from '@/blocks/dashboard/guru/kelas/index'
import { MaterialProvider } from '@/context/service/material';
import { MeetingProvider } from '@/context/service/meeting';
import { TeachingProvider } from '@/context/service/teaching';

export default function page({ params }: { params: { id: string; materi: string } }) {
  return (
    <div>
      <TeachingProvider>
        <MeetingProvider>
          <MaterialProvider>
            <KelasByGuru params={params} />
          </MaterialProvider>
        </MeetingProvider>
      </TeachingProvider>
    </div>
  )
}
