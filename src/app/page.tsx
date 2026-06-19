import { Suspense } from "react";
import Baner from "./components/Baner";
import ProductList from "./components/ProductList";
import TopHeader from "./components/TopHeader";
import Navbar from "./components/navbar";
import BottomCartBar from "./components/BottomCartBar";
import ProductSkeleton from "./components/ProductSkeleton";
export const dynamic = "force-dynamic";
export default function Home() {
  return (
    <>
      <TopHeader />
      <Navbar />
      <Baner />
      <Suspense fallback={<ProductSkeleton/>}>
        <ProductList />
      </Suspense>
      <BottomCartBar />
    </>
  );
}