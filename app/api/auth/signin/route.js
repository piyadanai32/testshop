import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const data = await req.json();
    const { email, password } = data;

    if (!email || !password) {
      return new Response(JSON.stringify({ error: "ข้อมูลที่จำเป็นขาดหายไป" }), { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user && await bcrypt.compare(password, user.password)) {
      return new Response(JSON.stringify({
        msg: "เข้าสู่ระบบสำเร็จ",
        data: user,
      }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ error: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" }), { status: 400 });
    }
  } catch (err) {
    console.error("เกิดข้อผิดพลาดระหว่างการเข้าสู่ระบบ:", err);
    return new Response(JSON.stringify({ error: "ข้อผิดพลาดภายในเซิร์ฟเวอร์" }), { status: 500 });
  }
}
