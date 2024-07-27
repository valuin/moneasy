import { Mail, Phone } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import FooterLogo from '@/components/FooterLogo';

export default function Footer() {
  return (
    <>
      <div className="grid grid-cols-4 justify-items-center items-center bg-emerald-800 w-full h-56">
        <div className="flex flex-col text-white items-center justify-center">
          <FooterLogo />
        </div>
        <div className="flex flex-col text-white items-start justify-center border-r-2 border-white w-72">
          <p className="text-start">Jl. RA Kartini Kav 8, Cilandak Barat,</p>
          <p className="text-start">Jakarta Selatan, 12340</p>
        </div>
        <div className="flex flex-col text-white items-start justify-center border-r-2 space-y-2 border-white w-72">
          <div className="flex flex-row items-center">
            <Mail className="mr-2" />
            support@moneasy.com
          </div>
          <div className="flex flex-row items-center ">
            <Phone className="mr-2" />
            +62 858 9177 7037
          </div>
        </div>
        <div className="flex flex-col text-white items-start justify-center bg">
          <p className="text-start">Have questions? We're here to help!</p>
          <p className="text-start">Contact us</p>
        </div>
      </div>
      <div className="w-full bg-emerald-800 h-14">
        <p className="text-white mb-20 text-center">© 2024 Moneasy. All rights reserved.</p>
      </div>
    </>
  );
}
