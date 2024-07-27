import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import HeroSection from "@/components/ui/landing-page/hero-section";
import Services from "@/components/ui/landing-page/services";
import Head from "next/head";
import BrandLogo from "@/components/BrandLogo";
import Link from "next/link";
import Footer from "@/components/ui/landing-page/footer";
import { redirect } from "next/navigation";

export default async function Index() {
  const isSupabaseConnected = await createClient();

  // const supabase = createClient();

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // if (user) {
  //   redirect(`/dashboard/${user.id}`);
  // }

  return (
    <>
      <Head>
        <link rel="preload" href="/WaveBg.png" as="image" />
      </Head>
      <div
        className=" w-full w-max-content flex flex-col items-center  bg-emerald-950 scroll-smooth"
        style={{
          backgroundImage: "url('/WaveBg.png')",
          backgroundSize: "100%", // Zoom in
          backgroundPosition: "center top", // Indent upwards
          backgroundRepeat: "no-repeat",
        }}
      >
        <nav className="w-full flex justify-center h-16 scroll-smooth">
          <div className="w-full max-w-4xl flex justify-between items-center text-sm mt-8 scroll-smooth">
            <div className="flex items-center scroll-smooth">
              <BrandLogo />
              <ul className="flex space-x-4 text-base font-semibold gradient-text ml-12 scroll-smooth">
                <li className="relative group">
                  <Link href="/#services" passHref>
                    <span className="hover:no-underline gradient-text">Services</span>
                  </Link>
                  <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-emerald-500 to-emerald-950 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </li>
                <li className="relative group">
                  <Link href="/#contacts" passHref>
                    <span className="hover:no-underline gradient-text">Contacts</span>
                  </Link>
                  <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-emerald-500 to-emerald-950 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </li>
              </ul>
            </div>
            {isSupabaseConnected && <AuthButton />}
          </div>
        </nav>
        <HeroSection />
        <Services />
        <Footer />
      </div>
    </>
  );
}
