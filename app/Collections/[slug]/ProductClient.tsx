"use client";
import plus from "@/public/icon-plus.svg";
import minus from "@/public/icon-minus.svg";
import { useAppContext } from "@/app/components/AppContext";
import Image from "next/image";
import CartCard from "@/app/Collections/components/CartCard";
import { collections } from "@/app/lib/collections";
import ImageSlider from "@/app/Collections/components/ImageSlider";
import ImagePc from "@/app/Collections/components/ImagePc";

type Product = {
  slug: string;
  company: string;
  title: string;
  description: string;
  price: number | string;
  discount?: number;
};

export default function ProductClient({ product }: { product: Product }) {
  const itemsImgs = collections[0].images;
  const itemsnails = collections[0].thumbnails;
  const price =
    typeof product.price === "number" ? product.price : Number(product.price);

  const discountedPrice = product.discount
    ? (price - price * (product.discount / 100)).toFixed(2)
    : null;

  const myContext = useAppContext();
  const { cartItems, setCartItems, findItem, isCartVisible } = myContext;

  const itemInCart = cartItems.find((item) => item.slug === product.slug);
  const quantity = itemInCart ? itemInCart.quantity : 0;

  const updateQuantity = (newQuantity: number) => {
    if (newQuantity < 1) {
      const updatedCartItems = cartItems.filter(
        (item) => item.slug !== product.slug
      );
      setCartItems(updatedCartItems);
    } else {
      const updatedCartItems = cartItems.map((item) =>
        item.slug === product.slug ? { ...item, quantity: newQuantity } : item
      );

      if (!itemInCart && newQuantity > 0) {
        updatedCartItems.push({
          slug: product.slug,
          quantity: newQuantity,
          price: price,
          findItem: () => findItem(product.slug),
        });
      }

      setCartItems(updatedCartItems);
    }
  };

  return (
    <div className="sm:p-10 sm:mx-5  ">
      {/* Show CartCard */}
      {isCartVisible && <CartCard />}
      {/* Show CartCard */}

      <section className="sm:flex sm:gap-20 sm:mt-12">
        {/* Left: Image Section (Small screens only) */}
        <div className="w-full h-[230px] sm:hidden flex items-center justify-center">
          <ImageSlider images={itemsImgs} />
        </div>

        {/* Left: Image Section (Medium and up) */}
        <div className="hidden sm:flex sm:h-auto sm:w-1/2 items-center justify-center">
          <ImagePc images={itemsImgs} thumbnails={itemsnails} />
        </div>

        {/* Right: Product Info + Actions */}
        <div className="sm:w-2/3 my-auto p-2">
          {/* Product Info */}
          <div>
            <p className="font-semibold text-gray-500 text-sm mt-2">
              {product.company}
            </p>
            <h1 className="text-2xl font-bold mt-2 mb-2 sm:mb-5">
              {product.title}
            </h1>
            <p className="text-gray-500 mb-4 sm:text-lg">
              {product.description}
            </p>

            {/* Price Section */}
            <div className="mt-4">
              {product.discount ? (
                <div className="flex flex-row gap-4 items-center">
                  <p className="text-2xl font-bold  ">${discountedPrice}</p>
                  <div className="text-sm font-semibold text-white bg-black rounded-lg px-2 py-1">
                    {product.discount}%
                  </div>
                  <div className="ml-auto flex text-gray-500 line-through sm:hidden ">
                    ${price.toFixed(2)}
                  </div>
                </div>
              ) : (
                <p className="text-2xl font-bold">${price.toFixed(2)}</p>
              )}
            </div>
            <div className="ml-auto text-gray-500 line-through mt-2 hidden sm:block ">
              ${price.toFixed(2)}
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:gap-4">
            {/* Quantity selector */}
            <div className="flex bg-gray-200 rounded-lg justify-around py-4 sm:w-1/3">
              <button onClick={() => updateQuantity(quantity - 1)}>
                <Image
                  src={minus}
                  alt="minus icon"
                  className="cursor-pointer"
                  width={20}
                  height={20}
                />
              </button>
              <p className="font-bold">{quantity}</p>
              <button onClick={() => updateQuantity(quantity + 1)}>
                <Image
                  src={plus}
                  alt="plus icon"
                  className="cursor-pointer"
                  width={20}
                  height={20}
                />
              </button>
            </div>

            {/* Add to Cart button */}
            <button
              onClick={() => updateQuantity(quantity + 1)}
              className="mt-4 sm:mt-0 bg-orange-500 font-bold py-4 px-4 rounded-lg w-full sm:w-2/3 text-center flex items-center justify-center gap-3 shadow-[0px_4px_10px_rgba(249,115,22,0.5)] transition duration-300 transform hover:scale-105 hover:bg-orange-600 active:scale-95 cursor-pointer"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-black">
                <path d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z" />
              </svg>
              Add to Cart
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
