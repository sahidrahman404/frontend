import Link from "next/link";
import { User } from "@/auth/authServices";

export function Home({ user }: { user: User["data"] | undefined }) {
  return (
    <div className="flex flex-col min-h-dvh">
      <main className="flex-1">
        <section className="w-full pt-12 md:pt-24 lg:pt-32">
          <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
            <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
              <div className="space-y-4">
                <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                  Auth and Dashboard Demo
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  This demo showcases a complete authentication system with
                  various strategies. Every auth strategy works, including email
                  verification. For Google authentication, please contact me so
                  I can add your email to the test users. Facebook
                  authentication is not available at the moment as I cannot
                  access the Facebook Developer dashboard to obtain the required
                  client and secret credentials, but the code to implement it is
                  still available.
                </p>
                <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                  <Link
                    href={user ? "/dashboard" : "/signin"}
                    className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    {user ? "Dashboard" : "Sign In"}
                  </Link>
                  <Link
                    href="/signup"
                    className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
