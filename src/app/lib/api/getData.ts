import { Product } from "../../types/Product";

export async function GetData(): Promise<Product[]> {
  try {
    const res = await fetch("https://fakestoreapi.com/products", {
      next: { revalidate: 60 },
    });

    if (!res.ok) return [];

    const contentType = res.headers.get("content-type");
    if (!contentType?.includes("application/json")) return [];

    return await res.json();
  } catch (err) {
    console.log("Fetch failed:", err);
    return [];
  }
}