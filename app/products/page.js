// app/products/page.js
"use client";

import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/api/auth/products");
        if (!response.ok) throw new Error("ไม่สามารถดึงข้อมูลสินค้าได้");
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) return <p>กำลังโหลด...</p>;
  if (error) return <p>ข้อผิดพลาด: {error}</p>;

  return (
    <div>
      <h1>สินค้า</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>ราคา: ${product.price.toFixed(2)}</p>
            <img src={`/images/${product.imageUrl}`} alt={product.name} width={200} />
          </li>
        ))}
      </ul>
    </div>
  );
}
