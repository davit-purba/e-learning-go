export const dynamic = "force-dynamic";

import GuruTable from '@/blocks/dashboard/guru';
import { TeachingProvider } from '@/context/service/teaching';
export default async function Page() {
  return (
    <div>
      <TeachingProvider>
        <GuruTable />
      </TeachingProvider>
    </div>
  );
}
