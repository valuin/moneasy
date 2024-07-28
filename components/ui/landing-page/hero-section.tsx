import React from "react";
import { Button } from "@/components/ui/button";
import WaveShape from "./WaveShape";
import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="flex flex-col items-center mt-52">
      <h1 className="text-2xl md:text-4xl lg:text-6xl text-white text-center font-bold leading-snug">
        Making Businesses <br />
        As Easy As Talking To A Person
      </h1>
      <p className="text-white text-center mt-4">
        Unravel your business's true potential
      </p>
      <Link href="/auth/login" passHref>
        <Button className="mt-10 px-12 min-w-16 bg-emerald-600 text-black hover:bg-emerald-200 hover:scale-105 shadow-xl hover:shadow-emerald-500/50 transition duration-200">
          Login To Try Now
        </Button>
      </Link>
      <Image
        src="/DashboardMoney.png"
        alt="Dashboard"
        className="mt-12 px-8"
        width={720}
        height={356}
      />
    </div>
  );
}
