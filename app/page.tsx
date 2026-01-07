"use client";

import { useRouter } from "next/navigation";
import React, { Suspense, useEffect } from "react";
import { useSession } from "next-auth/react";

const PageContent: React.FC = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/sign-in");
    } else {
      router.push("/dashboard/home");
    }
  }, [session, status, router]);

  return (
    <div className="h-screen flex items-center justify-center">
      <p className="animate-pulse text-blue-600">Memeriksa autentikasi...</p>
    </div>
  );
};

const Page = ({ params, searchParams }: any) => {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
      <PageContent />
    </Suspense>
  );
};

export default Page;