

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

  try {
    const res = await fetch('https://fakestoreapi.com/products', {
      cache: 'no-store', 
    });
    if (!res.ok) throw new Error('Failed to fetch');
    return res.json();
  } catch (error) {
    console.error(error);
    return []
  }
}
