import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import SideNavLinks from '@/components/ui/nav/side-nav-links';
import { createClient } from '@/utils/supabase/server';
import { LogOutIcon } from 'lucide-react';
import { redirect } from 'next/navigation';
import BrandLogo from '@/components/BrandLogo';

export default async function SideNav() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const signOut = async () => {
    'use server';

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect('/auth/login');
  };

  return (
    <>
      <div>
        <BrandLogo />
      </div>
      <div className="flex flex-col justify-between w-3/4">
        <div className="flex flex-col gap-4 mb-20">
          <Card>
            <div className="flex gap-2 items-center p-4">
              <Avatar>
                <AvatarFallback>
                  {user.email ? user.email[0] : ''}
                </AvatarFallback>
              </Avatar>
              {user?.email}
            </div>
          </Card>
          <SideNavLinks id={user.id} />
        </div>
        <form action={signOut}>
          <Button
            className="flex w-full gap-2 items-center text-red-500 justify-start hover:bg-zinc-50 hover:text-red-500"
            variant="ghost"
          >
            <LogOutIcon />
            Log Out
          </Button>
        </form>
      </div>
    </>
  );
}
