"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleHome = () => {
  router.push("/home");
  };
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  return (
    status === "authenticated" && session.user && (
      <div>
        <p>Welcome, {session.user.name}</p>
        <p>Email: {session.user.email}</p>
        <button onClick={handleHome}>home</button>
        <button onClick={() => signOut({ callbackUrl: "/" })}>ออกจากระบบ</button>

      </div>
    )
  );
}
