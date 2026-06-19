import { Suspense } from "react";
import Baner from "./components/Baner";
import ProductList from "./components/ProductList";
import LoadingSkeleton from "./product/loading";
import TopHeader from "./components/TopHeader";
import Navbar from "./components/navbar";
import BottomCartBar from "./components/BottomCartBar";

export default function Home() {
  return (
    <>
      <TopHeader />
      <Navbar />
      <Baner />
      <Suspense fallback={<LoadingSkeleton />}>
        <ProductList />
      </Suspense>
      <BottomCartBar />
    </>
  );
}