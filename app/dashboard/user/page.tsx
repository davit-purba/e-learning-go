// app/dashboard/users/page.tsx
export const dynamic = "force-dynamic";

import UserTable from '@/blocks/dashboard/user';
import { UserProvider } from '@/context/service/user';
export default async function Page() {
  return (
    <div>
      <UserProvider>
        <UserTable />
      </UserProvider>
    </div>
  );
}
