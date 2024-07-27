import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import HeroSection from "@/components/ui/landing-page/hero-section";
import Services from "@/components/ui/landing-page/services";
import BrandLogo from "@/components/BrandLogo";
import Link from "next/link";

export default async function Index() {
  const canInitSupabaseClient = () => {
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <div
      className=" w-full w-max-content flex flex-col items-center  bg-emerald-950"
      style={{
        backgroundImage: "url('/WaveBg.png')",
        backgroundSize: '100%', // Zoom in
        backgroundPosition: 'center top', // Indent upwards
        backgroundRepeat: 'no-repeat',
      }}
    >
      <nav className="w-full flex justify-center h-16">
        <div className="w-full max-w-4xl flex justify-between items-center text-sm mt-8">
          <div className="flex items-center">
            <BrandLogo />
            <ul className="flex space-x-4 text-base font-semibold gradient-text ml-3">
              <li>
                <Link href="#home">Home</Link>
              </li>
              <li>
                <Link href="#services">Services</Link>
              </li>
              <li>
                <Link href="#contacts">Contacts</Link>
              </li>
            </ul>
          </div>
          {isSupabaseConnected && <AuthButton />}
        </div>
      </nav>
      <HeroSection />
      <Services />
    </div>
  );
}
