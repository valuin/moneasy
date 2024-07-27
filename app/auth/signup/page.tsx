import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "@/components/SubmitButton";
import BrandLogo from "@/components/BrandLogo";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect("/auth/signup?message=Could not authenticate user");
    }

    return redirect("/auth/login?message=Signup successful, please login");
  };

  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect(
        "/auth/login?message=Wrong email or password. Please try again."
      );
    }
    // get the user id from the token
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return redirect(
        "/auth/login?message=Wrong email or password. Please try again."
      );
    }

    return redirect(`/dashboard/${user.id}`);
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-emerald-600 flex flex-col justify-between p-2 relative">
        <Image
          src="/LoginIllustration2.png"
          alt="Moneasy Illustration"
          layout="fill"
          className="w-full h-full "
          objectFit="cover"
        />
      </div>

      {/* Right column - Signup Form */}
      <div className="w-1/2 flex items-center justify-center bg-white">
        <div className="flex flex-col items-center justify-center w-full max-w-md p-8 mb-12">
          <div className="flex items-center justify-center mb-8">
            <BrandLogo />
          </div>
          <h1 className="text-2xl font-bold mb-6">
            Hello, Welcome to Moneasy!
          </h1>
          <p className="text-gray-600 mb-2">
            Enter your email and password below to signup to your account
          </p>

          <form className="space-y-6 w-full" action={signIn}>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                type="text"
                name="name"
                placeholder="Enter name"
                required
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                type="email"
                name="email"
                placeholder="mi@example.com"
                required
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="phone"
              >
                Phone Number
              </label>
              <input
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                type="text"
                name="phone"
                placeholder="Enter phone number"
                required
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                type="password"
                name="password"
                placeholder="Enter password"
                required
              />
            </div>

            <SubmitButton
              formAction={signUp}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              Signup
            </SubmitButton>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-medium text-emerald-600 hover:text-emerald-500"
            >
              Log in
            </Link>
          </p>

          {searchParams?.message && (
            <p className="mt-4 p-4 text-red-800 font-semibold text-center bg-red-100 rounded">
              {searchParams.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
