"use client";

import { useAppContext } from "@/app/components/AppContext";
import productIcon from "@/public/image-product-1-thumbnail.jpg"
import grabge from "@/public/icon-delete.svg";


import Image from "next/image";

function CartCard() {
  const { cartItems, setCartItems } = useAppContext();

  // Function to remove an item from the cart
  const removeItem = (slug: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.slug !== slug));
  };

  // Function to handle checkout
  const handleCheckout = () => {
    alert("Your items are on the way!");
    setCartItems([]); // Empty the cart
  };

  return (
    <div
  className="absolute sm:right-7 sm:top-12 sm:mt-2 sm:w-max w-[90vw] right-3 top-19 z-10 bg-white rounded-lg"
  style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}
>

      <section>
        <p className="w-full border-b-1 p-5">Cart</p>
      </section>
      <section className="flex flex-col justify-center p-5">
        {cartItems.length > 0 ? (
          <>
            {cartItems.map((item) => (
              <div
                key={item.slug}
                className="flex items-center mb-2"
              >
                {/* Item Icon */}
                <Image
                  src = {productIcon} 
                  alt={item.slug}
                  width={50}
                  height={50}
                  className="rounded mr-3"
                />

                {/* Item Details */}
                <div className="flex flex-col">
                  <p className="font-medium">Fall Limited Edition Sneakers</p>
                  <p className="text-sm text-gray-500">
                    ${(125).toFixed(2)} x {item.quantity} {" "}
                    <span className="font-bold text-black">
                      ${(125 * item.quantity).toFixed(2)}
                    </span>
                  </p>
                </div>

                {/* Remove Icon */}
                <button
                className="ml-auto"
                  onClick={() => removeItem(item.slug)}
                >
                  <Image
                    src={grabge}
                    alt="Remove item"
                    width={20}
                    height={20}
                  />
                </button>
              </div>
            ))}

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              className="mt-4 bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
            >
              Checkout
            </button>
          </>
        ) : (
          <p className="text-center text-gray-500 my-11 sm:mx-18">Your cart is empty</p>
        )}
      </section>
    </div>
  );
}

export default CartCard;