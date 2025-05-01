"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import menu from "@/public/icon-menu.svg";
import cart from "@/public/icon-cart.svg";
import avatar from "@/public/image-avatar.png";
import logo from "@/public/logo.svg";
import { useAppContext } from "@/app/components/AppContext";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";

function MyNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const { cartItems, toggleCartVisibility } = useAppContext(); // Access cart visibility toggle
  let totalItems = 0;
  for (let i = 0; i < cartItems.length; i++) {
    totalItems += cartItems[i].quantity; // Calculate total items in cart
  }

  const handleLinkClick = () => {
    setIsOpen(false); // Close the menu when a link is clicked
  };

  return (
    <div className="flex items-center justify-between p-4 mx-auto sm:w-[90vw] sm:border-b-1 sm:border-black">
      {/* Menu Icon for smaller screens */}

      <div className="sm:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button className="mr-4" onClick={() => setIsOpen(true)}>
              <Image
                src={menu}
                alt="Menu"
                className="cursor-pointer"
                width={20}
                height={20}
                priority
              />
            </button>
          </SheetTrigger>

          {/* Navigation Menu */}
          <SheetContent side="left" className="w-64 pt-6 pl-4 pr-6">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <nav className="flex flex-col gap-4 text-lg font-medium">
              <Link
                href="/Collections"
                className={pathname === "/Collections" ? "text-orange-500" : ""}
                onClick={handleLinkClick}
              >
                Collections
              </Link>
              <Link
                href="/Men"
                className={pathname === "/Men" ? "text-orange-500" : ""}
                onClick={handleLinkClick}
              >
                Men
              </Link>
              <Link
                href="/Women"
                className={pathname === "/Women" ? "text-orange-500" : ""}
                onClick={handleLinkClick}
              >
                Women
              </Link>
              <Link
                href="/About"
                className={pathname === "/About" ? "text-orange-500" : ""}
                onClick={handleLinkClick}
              >
                About
              </Link>
              <Link
                href="/Contact"
                className={pathname === "/Contact" ? "text-orange-500" : ""}
                onClick={handleLinkClick}
              >
                Contact
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Logo */}
      <div className="mr-auto">
        <Image src={logo} alt="Logo" width={120} height={40} priority />
      </div>
      <div className="hidden sm:flex w-[90%] mx-auto justify-between items-center">
        {/* Links for larger screens */}
        <div className="flex justify-around ml-8 ">
          <div className=" ">
            <Link
              href="/Collections"
              className={`${
                pathname === "/Collections" ? "text-orange-500 " : ""
              } ml-5 hover:border-b-2  hover:border-orange-500`}
            >
              Collections
            </Link>
          </div>
          <div>
            <Link
              href="/Men"
              className={`${
                pathname === "/Men" ? "text-orange-500" : ""
              } hover:border-b-2 ml-5 hover:border-orange-500`}
            >
              Men
            </Link>
          </div>
          <div>
            <Link
              href="/Women"
              className={`${
                pathname === "/Women" ? "text-orange-500" : ""
              } hover:border-b-2  ml-5 hover:border-orange-500`}
            >
              Women
            </Link>
          </div>
          <div>
            <Link
              href="/About"
              className={`${
                pathname === "/About" ? "text-orange-500" : ""
              } hover:border-b-2 ml-5 hover:border-orange-500`}
            >
              About
            </Link>
          </div>
          <div>
            <Link
              href="/Contact"
              className={`${
                pathname === "/Contact" ? "text-orange-500" : ""
              } hover:border-b-2 ml-5 hover:border-orange-500`}
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Cart and Avatar */}
        <div className="flex items-center gap-4">
          {/* Cart Icon */}
          <button
            className="relative cursor-pointer"
            onClick={toggleCartVisibility} // Toggle cart visibility
          >
            {totalItems > 0 && (
              <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </div>
            )}
            <Image src={cart} alt="Cart" width={30} height={30} priority />
          </button>

          {/* Avatar */}
          <div className="w-10 h-10 border-2 border-transparent hover:border-orange-500 rounded-full transition-colors duration-200">
            <Image
              src={avatar}
              alt="Avatar"
              width={40}
              height={40}
              className="rounded-full"
              priority
            />
          </div>
        </div>
      </div>

      {/* Cart Icon */}
      <button
        className="relative cursor-pointer sm:hidden"
        onClick={toggleCartVisibility} // Toggle cart visibility
      >
        {totalItems > 0 && (
          <div className="sm:hidden absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {totalItems}
          </div>
        )}
        <Image
          src={cart}
          className="sm:hidden"
          alt="Cart"
          width={24}
          height={24}
          priority
        />
      </button>

      {/* Avatar */}
      <div className="w-10 h-10 ml-3 sm:hidden">
        <Image
          src={avatar}
          alt="Avatar"
          width={40}
          height={40}
          className="rounded-full"
          priority
        />
      </div>
    </div>
  );
}

export default MyNav;
