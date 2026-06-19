import { GetData } from "../lib/api/getData";
import ScrollToTop from "./ScrollToTop";
import WishlistButton from "./WishlistButton";
import Rating from "./Rating";
import ProductCard from "./ProductCard";
import BottomCartBar from "./BottomCartBar";
 

const ProductList = async () => {
  const products = await GetData();

  return (
    <div className="min-h-screen p-3 sm:p-4 md:p-6">
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="relative group border border-gray-200 mt-5 cursor-pointer rounded-xl w-full bg-white p-3 sm:p-4 shadow transition hover:shadow-md"
          >
            <div className="flex flex-row-reverse mb-2">
              <WishlistButton product={product} />
            </div>

            <ProductCard product={product} />

            <div className="flex flex-row justify-between items-center gap-2">
              <h2 className="mt-3 sm:mt-4 text-sm sm:text-md font-semibold text-gray-800 line-clamp-2">
                {product.title}
              </h2>

              <p className="shrink-0 font-semibold text-center text-sm sm:text-base m-1 sm:m-3 bg-gray-200 rounded-2xl px-2 py-1">
                ${product.price}
              </p>
            </div>

            <div className="flex flex-col justify-center gap-2">
              <span className="text-xs sm:text-sm text-gray-600/70">
                Organic Cotton, Fair Trade quality
              </span>

              <BottomCartBar />

            </div>

            <Rating initialValue={product.rating?.rate ?? 0} />
            <p className="text-xs opacity-60">({product.rating?.count ?? 0})</p>
          </div>
        ))}
      </div>

      <ScrollToTop />
    </div>
  );
};

export default ProductList;