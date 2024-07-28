import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import HeroSection from "@/components/ui/landing-page/hero-section";
import Services from "@/components/ui/landing-page/services";
import Head from "next/head";
import Footer from "@/components/ui/landing-page/footer";
import { redirect } from "next/navigation";
import NavbarContent from "@/components/ui/landing-page/navbar-content";

export default async function Index() {
  const isSupabaseConnected = await createClient();

  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect(`/dashboard/${user.id}`);
  }

  return (
    <>
      <Head>
        <link rel="preload" href="/WaveBg.png" as="image" />
      </Head>
      <div
        className="w-full w-max-content flex flex-col items-center bg-emerald-950 scroll-smooth"
        style={{
          backgroundImage: "url('/WaveBg.png')",
          backgroundSize: "100%",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
        }}
      >
        <NavbarContent />

        <div className="mt-16"> {/* Add top margin to account for fixed navbar */}
          <HeroSection />
          <Services />
          <Footer />
        </div>
      </div>
    </>
  );
}