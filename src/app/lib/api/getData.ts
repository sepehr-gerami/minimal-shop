import { Product } from "../../types/Product";
export async function GetData(): Promise<Product[]> {
  const res = await fetch("https://fakestoreapi.com/products", {
    next: { revalidate: 60 },
  });

  const data = await res.json();

return data
}