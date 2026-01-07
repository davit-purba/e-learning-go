'use client'

import React from 'react'
import UserLocalizationProvider from './local-provider'
import { useUser } from '@/context/service/user';

export default function UserTable() {
  const { users } = useUser();
  return (
    <div>
      <UserLocalizationProvider users={ users }/>
    </div>
  )
}
