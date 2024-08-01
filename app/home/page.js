"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div>
      <h1>หน้าแรก</h1>
      <p>test</p>
      <div>
        <button onClick={() => router.push("/products")}>สินค้า</button>
        <button onClick={() => router.push("/cart")}>ตะกร้าสินค้า</button>
        <button onClick={() => router.push("/profile")}>โปรไฟล์</button>
      </div>
    </div>
  );
}