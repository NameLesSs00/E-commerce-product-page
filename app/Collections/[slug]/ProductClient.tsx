"use client";

type Product = {
  slug: string;
  company: string;
  title: string;
  description: string;
  price: number | string;
  discount?: number;
};

export default function ProductClient({ product }: { product: Product }) {
  // Ensure price is a valid number
  const price =
    typeof product.price === "number" ? product.price : Number(product.price);

  // Ensure discount is a valid number
  const discountedPrice = product.discount
    ? (price - price * (product.discount / 100)).toFixed(2)
    : null;

  return (
    <>
      {/* Image Placeholder */}
      <section className="w-full h-[250px] bg-gray-400 flex items-center justify-center text-white text-xl">
        placeholder imgs
      </section>

      {/* Product Info */}
      <section className="p-4">
        <p className="font-semibold text-gray-500 text-sm">{product.company}</p>
        <h1 className="text-3xl font-bold mt-2 mb-2">{product.title}</h1>
        <p className="text-gray-500 mb-4">{product.description}</p>

        {/* Price Section */}
        <div className="mt-4  ">
          {product.discount ? (
            <div className="flex flex-row gap-4">
              <p className="text-2xl font-bold ">${discountedPrice}</p>
              <div className="text-sm font-semibold text-white bg-black rounded-lg px-2 py-1">
                {product.discount}%
              </div>
              <div className="ml-auto flex text-gray-500 line-through ">
                ${price.toFixed(2)}
              </div>
            </div>
          ) : (
            <p className="text-2xl font-bold">${price.toFixed(2)}</p>
          )}
        </div>
      </section>

      {/* Action buttons go here */}
      <section className=" mb-4">

        <div className=" flex bg-gray-200 rounded-lg justify-around w-[80vw] py-4 mx-auto">
          <button>-</button>
          <p>3</p>
          <button>+</button>
        </div>

        <button className="mt-4 mx-auto bg-orange-500 font-bold py-4 px-4 rounded-lg w-[80vw] text-center flex items-center justify-center gap-3 ">
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6 text-black"
          >
            {/* SVG paths go here */}
            <path d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z" />
          </svg>
          Add to Cart
        </button>
      </section>
    </>
  );
}
