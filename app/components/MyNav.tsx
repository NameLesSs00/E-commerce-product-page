"use client";

import Image from "next/image";
import { usePathname } from "next/navigation"; // Use usePathname for current route
import Link from "next/link";
import { useState } from "react"; // Import useState for managing menu state
import menu from "@/public/icon-menu.svg";
import cart from "@/public/icon-cart.svg";
import avatar from "@/public/image-avatar.png";
import logo from "@/public/logo.svg";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";

function MyNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false); 

  const handleLinkClick = () => {
    setIsOpen(false); // Close the menu when a link is clicked
  };

  return (
    <div className="flex items-center w-[90vw] p-4 mx-auto sm:hidden">
      {/* Menu Icon with Sheet */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}> {/* Control sheet state */}
        <SheetTrigger asChild>
          <button className="mr-4" onClick={() => setIsOpen(true)}>
            <Image src={menu} alt="Menu" width={24} height={24} priority />
          </button>
        </SheetTrigger>

        {/* Navigation Menu */}
        <SheetContent side="left" className="w-64">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <nav className="flex flex-col gap-4 mt-8 ml-4 text-lg font-medium">
            {/* Links with active state */}
            <Link href="/Collections" className={pathname === "/Collections" ? "text-orange-500" : ""} onClick={handleLinkClick}>
              Collections
            </Link>
            <Link href="/Men" className={pathname === "/Men" ? "text-orange-500" : ""} onClick={handleLinkClick}>
              Men
            </Link>
            <Link href="/Women" className={pathname === "/Women" ? "text-orange-500" : ""} onClick={handleLinkClick}>
              Women
            </Link>
            <Link href="/About" className={pathname === "/About" ? "text-orange-500" : ""} onClick={handleLinkClick}>
              About
            </Link>
            <Link href="/Contact" className={pathname === "/Contact" ? "text-orange-500" : ""} onClick={handleLinkClick}>
              Contact
            </Link>
          </nav>
        </SheetContent>
      </Sheet>

      {/* Logo */}
      <div className="mr-auto">
        <Image src={logo} alt="Logo" width={120} height={40} priority />
      </div>

      {/* Cart Icon */}
      <button className="mr-4">
        <Image src={cart} alt="Cart" width={24} height={24} priority />
      </button>

      {/* Avatar */}
      <div className="w-10 h-10">
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
