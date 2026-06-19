
export type Product = {
  id: number;
  title: string;
  image: string;
  price: number;
  description:string;
  category:string;
    rating: {
    rate: number;
    count: number;
  };
};

export async function GetData(): Promise<Product[]> {
  const res = await fetch("https://fakestoreapi.com/products", {
    next: { revalidate: 60 },
  });

  const data = await res.json();

return data
}