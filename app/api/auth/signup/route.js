import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    // ตรวจสอบว่าข้อมูลที่ได้รับเป็น JSON
    const data = await req.json();

    const { name, email, password } = data;

    // ตรวจสอบข้อมูลที่ได้รับ
    if (!name || !email || !password) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    // ตรวจสอบว่าผู้ใช้มีอยู่แล้วหรือไม่
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "User already exists" }), { status: 400 });
    }

    // แฮชรหัสผ่าน
    const hashedPass = hashSync(password, 10);

    // สร้างผู้ใช้ใหม่
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPass,
      },
    });

    return new Response(JSON.stringify({
      msg: "User created!",
      data: newUser,
    }), { status: 201 });
  } catch (err) {
    console.error("Error creating user:", err); // เพิ่มการบันทึกข้อผิดพลาด
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
