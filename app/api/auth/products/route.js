import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// POST request to add a new product
export async function POST(request) {
  try {
    const { name, description, price, imageUrl } = await request.json();
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price,
        imageUrl,
      },
    });
    return new Response(JSON.stringify(newProduct), { status: 201 });
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการสร้างสินค้า:", error);
    return new Response(JSON.stringify({ error: "ข้อผิดพลาดภายในเซิร์ฟเวอร์" }), { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

// GET request to fetch all products
export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการดึงข้อมูลสินค้า:", error);
    return new Response(JSON.stringify({ error: "ข้อผิดพลาดภายในเซิร์ฟเวอร์" }), { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
