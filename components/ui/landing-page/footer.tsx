import { Mail, Phone } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import FooterLogo from '@/components/FooterLogo';

export default function Footer() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center items-center bg-emerald-800 w-screen p-4 md:p-8" id="contacts">
        <div className="flex flex-col text-white items-center md:items-start justify-center">
          <FooterLogo />
        </div>
        <div className="flex flex-col text-white items-start justify-center md:border-r-2 border-white w-full md:w-72">
          <p className="text-center md:text-start">Jl. RA Kartini Kav 8, Cilandak Barat,</p>
          <p className="text-center md:text-start">Jakarta Selatan, 12340</p>
        </div>
        <div className="flex flex-col text-white items-start justify-center md:border-r-2 space-y-2 border-white w-full md:w-72">
          <div className="flex flex-row items-center">
            <Mail className="mr-2" />
            support@moneasy.com
          </div>
          <div className="flex flex-row items-center ">
            <Phone className="mr-2" />
            +62 858 9177 7037
          </div>
        </div>
        <div className="flex flex-col text-white items-center md:items-start justify-center w-full">
          <p className="text-center md:text-start">Have questions? We're here to help!</p>
          <p className="text-center md:text-start">Contact us</p>
        </div>
      </div>
      <div className="w-full bg-emerald-800 h-14 flex flex-col justify-center">
        <p className="text-white text-center">© 2024 Moneasy. All rights reserved.</p>
      </div>
    </>
  );
}