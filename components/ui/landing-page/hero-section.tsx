import React from 'react';
import { Button } from '@/components/ui/button';
import WaveShape from './WaveShape';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <div className="flex flex-col items-center mt-60">
      <h1 className="text-6xl text-white text-center font-bold">
        Empower Your Decisions with <br />
        Insightful Analytics
      </h1>
      <p className="text-white text-center mt-10">Explore New Possibilities with Advanced Data Insights</p>
      <Button className="mt-10 min-w-16 bg-emerald-200 text-black hover:bg-emerald-600 shadow-xl">Try Now, It's Free</Button>
      <Image src="/DashboardMoney.png" alt="Dashboard" className='mt-12' width={720} height={356} />

    </div>
  );
}
