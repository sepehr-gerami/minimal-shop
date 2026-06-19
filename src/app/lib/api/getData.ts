import { Product } from "../../types/Product";
import fallbackProducts from "../../../../data/fallback-products.json";

export async function GetData(): Promise<Product[]> {
  try {
    const res = await fetch("https://fakestoreapi.com/products", {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.log("fakestoreapi returned non-OK status, using fallback");
      return fallbackProducts as Product[];
    }

    const contentType = res.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      console.log("fakestoreapi returned non-JSON content, using fallback");
      return fallbackProducts as Product[];
    }

    const data = await res.json();

    if (!Array.isArray(data) || data.length === 0) {
      console.log("fakestoreapi returned empty data, using fallback");
      return fallbackProducts as Product[];
    }

    return data;
  } catch (err) {
    console.log("Fetch failed, using fallback:", err);
    return fallbackProducts as Product[];
  }
}