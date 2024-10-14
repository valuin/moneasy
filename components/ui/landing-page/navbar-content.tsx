'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";

export default function NavbarContent() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const maxScroll = 200; // Adjust this value to control when the transition completes

      const progress = Math.min(scrollPosition / maxScroll, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav 
        className={`
          w-full fixed z-50 transition-all duration-300 ease-in-out
          ${scrollProgress > 0 ? 'top-4' : 'top-0'}
        `}
      >
        <div 
          className={`
            mx-auto flex justify-between items-center text-sm p-3 
            transition-all duration-300 ease-in-out
            ${scrollProgress > 0 
              ? 'bg-emerald-950/30 backdrop-blur-md shadow-lg rounded-xl text-emerald-100' 
              : 'mt-4 text-emerald-500'
            }
          `}
          style={{
            maxWidth: `${100 - scrollProgress * 20}%`,
            borderRadius: `${scrollProgress * 9999}px`,
            padding: `${0.75 + scrollProgress * 0.25}rem ${1 + scrollProgress * 2}rem`,
          }}
        >
          <div className="flex items-center justify-between w-full px-12">
            <BrandLogo />
            <ul className="hidden md:flex space-x-4 text-base font-semibold  text-shadow-glow ml-12">
              <li className="relative group">
                <Link href="/#services" passHref>
                  <span className="hover:no-underline text-shadow-glow">
                    Services
                  </span>
                </Link>
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-emerald-500 to-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </li>
              <li className="relative group">
                <Link href="/#contacts" passHref>
                  <span className="hover:no-underline text-shadow-glow">
                    Contacts
                  </span>
                </Link>
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-emerald-500 to-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}