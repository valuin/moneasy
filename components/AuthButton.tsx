import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/");
  };

  return user ? (
    <div className="flex items-center gap-4 text-white">
      Hey, {user.email}!
      <form action={signOut}>
        <button className="py-2 px-4 rounded-md no-underline bg-emerald-950 hover:bg-emerald-600 transition duration-150">
          Logout
        </button>
      </form>
    </div>
  ) : (
    <Link
      href="/auth/login"
      className="py-2 px-3 flex rounded-md no-underline bg-emerald-600 text-black hover:bg-emerald-200 hover:scale-105 shadow-xl hover:shadow-emerald-500/50 transition duration-200"
    >
      Login
    </Link>
  );
}
