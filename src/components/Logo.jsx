"use client";

import Link from "next/link";
import logo from "@/assets/mc_logo-01_1879a4d6-eb9c-4fec-bd57-4961a0c344a6.avif";

export default function Logo({height}) {
  return (
    <div>
      <Link href="/" className="font-bold text-xl md:text-2xl">
        <img
          src={logo}
          alt="logo"
          className={`h-${height} object-contain`}
        />
      </Link>
    </div>
  );
}
