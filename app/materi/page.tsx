export const dynamic = "force-dynamic";


import React from 'react'
import MateriStudy from '@/blocks/materi';
import { MaterialProvider } from '@/context/service/material';
import { MeetingProvider } from '@/context/service/meeting';

interface PageProps {
  params: {
    id: string;
  };
}
export default function page({ params }: PageProps) {
  return (
    <div>
      <MeetingProvider>
        <MaterialProvider>
          <MateriStudy />
        </MaterialProvider>
      </MeetingProvider>
    </div>
  )
}
