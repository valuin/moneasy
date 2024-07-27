import DeployButton from '../components/DeployButton';
import AuthButton from '../components/AuthButton';
import { createClient } from '@/utils/supabase/server';
import HeroSection from '@/components/landing-page/hero-section';
import Image from 'next/image';

export default async function Index() {
  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
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
      className="flex-1 w-full flex flex-col items-center"
      style={{
        backgroundImage: "url('/hero-pic.png')",
        backgroundSize: '100%', // Zoom in
        backgroundPosition: 'center top', // Indent upwards
        backgroundRepeat: 'no-repeat',
      }}
    >
      <nav className="w-full flex justify-center h-16">
        {/* <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <DeployButton />
          {isSupabaseConnected && <AuthButton />}
        </div> */}
      </nav>
      <HeroSection />
      {/* <div className="flex-1 flex flex-col w-full items-center bg-emerald-500 ">
        
      </div> */}
    </div>
  );
}
