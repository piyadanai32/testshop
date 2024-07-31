import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const data = await req.json();
    const { name, email, password } = data;

    if (!name || !email || !password) {
      return new Response(JSON.stringify({ error: "ข้อมูลที่จำเป็นขาดหายไป" }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return new Response(JSON.stringify({
      msg: "User created successfully",
      data: user,
    }), { status: 201 });
  } catch (err) {
    console.error("เกิดข้อผิดพลาดระหว่างการสร้างผู้ใช้:", err);
    return new Response(JSON.stringify({ error: "ข้อผิดพลาดภายในเซิร์ฟเวอร์" }), { status: 500 });
  }
}
