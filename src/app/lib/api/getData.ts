

export type Product = {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
};

export async function GetData(): Promise<Product[]> {
  try {
    const res = await fetch("https://fakestoreapi.com/products", {
      next: {
        revalidate: 60,
      },
    });

    if (!res.ok) {
      console.error("API response not ok:", res.status);
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error("GetData error:", error);
    return [];
  }
}

