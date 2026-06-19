
export default function ProductSkeleton() {
  return (
 <div className="grid grid-cols-1  mt-35 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-xl  p-4 shadow-sm"
        >
          {/* Image */}
          <div className="h-48 w-full  rounded-lg bg-gray-200"></div>

          {/* Title */}
          <div className="mt-4 h-5 w-3/4 rounded bg-gray-300"></div>

           {/* Description */}
          <div className="mt-3 h-4 w-full rounded bg-gray-200"></div>
          <div className="mt-2 h-4 w-5/6 rounded bg-gray-200"></div>

          {/*Price*/}
          <div className="mt-4 h-6 w-1/3 rounded bg-gray-300"></div>

          {/* Button*/}
          <div className="mt-4 h-10 w-full rounded-lg bg-gray-300"></div>
        </div>
      ))}
    </div>
  );
}