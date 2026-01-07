export const dynamic = "force-dynamic";


import StudyKelas from '@/blocks/dashboard/guru/kelas/id/study'
import { MaterialProvider } from '@/context/service/material';
import { MeetingProvider } from '@/context/service/meeting';

interface PageProps {
  params: {
    id: string;
    teaching_id: string;
  };
}

export default function page({ params }: PageProps) {
  return (
    <div>
      <MeetingProvider>
        <MaterialProvider>
          <StudyKelas params={{
            id: params.id,
            teaching_id: params.teaching_id
          }} />
        </MaterialProvider>
      </MeetingProvider>
    </div>
  )
}
