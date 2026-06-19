// components/CardBasket.tsx
"use client";
import Image from "next/image";
import { useCartStore } from "../store/cartStore";
import { useAddressStore } from "../store/Addressstore";
import Rating from "./Rating";

const GST_RATE = 0;
const SGST_RATE = 0; 
const DISCOUNT_RATE = 0; 



export default function CardBasket() {
  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const address = useAddressStore((state) => state.address);
  
const totalCatValue = items.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0
);

const totalProducts = items.reduce(
  (sum, item) => sum + item.quantity,
  0
);

const gstAmount = totalCatValue * GST_RATE;
const sgstAmount = totalCatValue * SGST_RATE;
const discountAmount = totalCatValue * DISCOUNT_RATE;

const finalAmount =
  totalCatValue +
  gstAmount +
  sgstAmount -
  discountAmount;

  if (items.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        Your cart is empty
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-[1.4fr_1fr] gap-5 mt-5">
      {/* Left column */}
      <div className="flex flex-col gap-5">
        {/* Cart Details */}
        <div className="border border-gray-200 rounded-2xl p-4">
          <h2 className="text-lg font-bold mb-4 cursor-default text-black/75">Cart Details</h2>
          <div className="flex flex-col gap-4">
            {items.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="flex flex-col sm:flex-row items-start gap-4 sm:gap-8 relative"
              >
                <div className="relative">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={80}
                    height={80}
                    className="rounded-xl"
                  />

                  <span className="absolute text-sm cursor-default -bottom-2 -right-2 w-8 h-8 flex items-center justify-center rounded-full bg-[#D9D9D9] font-bold text-[#FE8A00]  shadow-md">
                    {item.quantity}
                  </span>
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-sm">{item.title}</h3>
                  <p className="text-xs text-gray-400">
                    100% Cotton
                  </p>
                  <p className="text-xs text-gray-400 mb-1">
                    Organic Cotton, Foir Trade quality
                  </p>
                  <Rating />
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span className="font-semibold text-sm text-black/75">
                    {item.price}$
                  </span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-600 cursor-pointer hover:text-red-700  hover:bg-gray-400 rounded-full p-2  transition-colors"
                  >
                    <i className="bi bi-trash3 text-sm" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Information */}
        <div className="border border-gray-200 rounded-2xl cursor-default p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Delivery Information</h2>
            <button className="text-xs cursor-pointer font-medium text-[#FE8A00] border border-[#FE8A00] rounded-full px-3 py-1 hover:bg-[#FE8A00]/10 transition-colors">
              Edit
            </button>
          </div>

          {address.fullName ? (
            <div className="text-sm text-gray-600 space-y-1">
              <p className="font-medium text-gray-900">{address.fullName}</p>
              <p>{address.addressLine1}</p>
              {address.addressLine2 && <p>{address.addressLine2}</p>}
              <p className="mt-2">
                {address.postalCode && `${address.postalCode}, `}
                {address.city}
              </p>
              <p>{address.country}</p>
            </div>
          ) : (
            <p className="text-sm text-gray-400">
              No delivery address set yet
            </p>
          )}
        </div>
      </div>

      {/* Right column - Order Summary */}
      <div className="border border-gray-200 cursor-default rounded-2xl p-5 h-fit">
        <h2 className="text-lg font-bold mb-4 text-black/75">Order Summary</h2>

        <div className="flex flex-col gap-3 text-sm">
          <div className="flex flex-col">
            <span className=" text-black/75 font-medium">Products added</span>
            <span className=" text-gray-500">{totalProducts}</span>
          </div>

          <div className="flex flex-col">
            <span className=" text-black/75 font-medium">GST</span>
            <span className="text-gray-500">{(GST_RATE * 100).toFixed(2)}%</span>
          </div>

          <div className="flex flex-col">
            <span className=" text-black/75 font-medium">S-GST</span>
            <span className="text-gray-500">{(SGST_RATE * 100).toFixed(2)}%</span>
          </div>

          <div className="flex flex-col">
            <span className=" text-black/75 font-medium">Total Cat Value (in $)</span>
            <span className="text-gray-500">{totalCatValue.toFixed(0)}$</span>
          </div>

          <div className="flex flex-col">
            <span className=" text-black/75 font-medium">Discount (in %)</span>
            <span className="text-gray-500">{(DISCOUNT_RATE * 100).toFixed(1)}%</span>
          </div>
        </div>

     
         <div className="bg-gray-100 -mx-5 px-5 py-3 mt-4 rounded-xl">
        <div className="flex items-start gap-2 mb-3 ">
          <i className="bi bi-truck text-gray-400 mt-0.5" />
          <div>
            <p className="text-sm font-medium">Delivery limit</p>
            <p className="text-xs text-gray-400">
              Free delivery within 50 km&apos;s
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <i className="bi bi-arrow-counterclockwise text-gray-400 mt-0.5" />
          <div>
            <p className="text-sm font-medium">Return Policy</p>
            <p className="text-xs text-gray-400">
              Within 14 days of product delivery
            </p>
          </div>
        </div>

          </div>

 <button className="group relative cursor-pointer overflow-hidden w-full bg-[#FE8A00] text-white py-3 rounded-xl mt-5 font-medium hover:bg-amber-500 transition-all duration-300 active:scale-[0.98]">
  <span className="relative z-10 flex items-center justify-center gap-2 px-2">
    <span>Checkout</span>
    <span className="bg-white/20 px-3 py-1 rounded-lg font-semibold">
      ${finalAmount.toFixed(2)}
    </span>
  </span>

  <span className="absolute inset-y-0 -left-20 w-16 bg-white/30 blur-md rotate-12 group-hover:left-[120%] transition-all duration-700"></span>
</button>
      </div>
    </div>
  );
}