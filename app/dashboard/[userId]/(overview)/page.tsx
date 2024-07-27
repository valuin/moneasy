import AIEvaluation from '@/components/ui/dashboard/ai-evaluation';
import OverviewContainer from '@/components/ui/dashboard/overview-container';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function Page() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <>
      <div className="flex gap-4 items-center ml-8">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M31 1H1V31H31V1Z" fill="white" />
          <path d="M6.1748 1.05005V30.9501" stroke="#B0BEC5" strokeWidth="0.498275" strokeMiterlimit="10" />
          <path d="M11.0874 1.05005V30.9501" stroke="#B0BEC5" strokeWidth="0.498275" strokeMiterlimit="10" />
          <path d="M16 1.05005V30.9501" stroke="#B0BEC5" strokeWidth="0.498275" strokeMiterlimit="10" />
          <path d="M20.9121 1.05005V30.9501" stroke="#B0BEC5" strokeWidth="0.498275" strokeMiterlimit="10" />
          <path d="M25.8247 1.05005V30.9501" stroke="#B0BEC5" strokeWidth="0.498275" strokeMiterlimit="10" />
          <path d="M30.9501 6.16504H1.0376" stroke="#B0BEC5" strokeWidth="0.5" strokeMiterlimit="10" />
          <path d="M30.9525 11.0825H1.04004" stroke="#B0BEC5" strokeWidth="0.5" strokeMiterlimit="10" />
          <path d="M30.9575 16H1.04248" stroke="#B0BEC5" strokeWidth="0.5" strokeMiterlimit="10" />
          <path d="M30.9599 20.9175H1.04736" stroke="#B0BEC5" strokeWidth="0.5" strokeMiterlimit="10" />
          <path d="M30.9623 25.835H1.0498" stroke="#B0BEC5" strokeWidth="0.5" strokeMiterlimit="10" />
          <path d="M1.27488 30.7451L1.25488 29.2051L7.98488 17.0751L13.9099 22.5526L29.8549 1.27759H30.7274L30.7624 2.56759L14.1124 24.7826L8.35738 19.4626L2.11238 30.7526L1.27488 30.7451Z" fill="#E53935" />
          <path d="M30.5025 1.4975V30.5H1.4975V1.4975H30.5025ZM31 1H1V31H31V1Z" fill="#B0BEC5" />
        </svg>
        <h1 className="text-white text-3xl font-semibold">Hi, {user?.email}! Here's Your Sales Data</h1>
      </div>
      <OverviewContainer />
    </>
  );
}
