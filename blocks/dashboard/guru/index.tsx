'use client'

import React from 'react'
import GuruLocalizationProvider from './local-provider';
import { useTeaching } from '@/context/service/teaching';

export default function GuruTable() {
  const { teachings } = useTeaching();
  return (
    <div>
      <GuruLocalizationProvider teachings={ teachings }/>
    </div>
  )
}
