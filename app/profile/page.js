"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  return (
    status === "authenticated" &&
    session.user && (
      <div>
        <h1>ProfileUser</h1>
        <p>ชื่อผู้ใช้งาน {session.user.name}</p>
        <p>Email: {session.user.email}</p>
        <button onClick={() => signOut({ callbackUrl: "/" })}>ออกจากระบบ</button>
      </div>
    )
  );
}
