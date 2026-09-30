import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle";
import { auth } from "@/lib/auth";
import { LoginForm } from "./login-form";

export const metadata = {
  title: "Sign in",
};

export default async function LoginPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session) redirect("/profile");

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <aside className="auth-panel relative hidden overflow-hidden text-white lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="auth-panel-noise absolute inset-0" aria-hidden />
        <div className="relative">
          <Link href="/" className="landing-brand text-lg">
            Ragnalizer
          </Link>
          <p className="mt-2 font-mono text-xs tracking-[0.18em] uppercase opacity-70">
            AI code analyzer
          </p>
        </div>
        <div className="relative max-w-md">
          <h1 className="landing-title text-5xl leading-tight">
            Sign in with the grain of your account.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            Google, GitHub, or a one-time code sent to your email. New addresses
            are stored in the user table on first sign-in.
          </p>
        </div>
      </aside>

      <main className="flex flex-col bg-background px-6 py-6 sm:px-10">
        <div className="flex items-center justify-between">
          <Link href="/" className="landing-brand text-sm lg:invisible">
            Ragnalizer
          </Link>
          <ModeToggle className="border-border bg-transparent" />
        </div>
        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-12">
          <p className="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
            Welcome
          </p>
          <h2 className="landing-title mt-3 text-4xl">Sign in</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Use a provider, or enter your email and we will send a 6-digit code.
          </p>
          <div className="mt-8">
            <LoginForm
              googleEnabled={Boolean(
                process.env.GOOGLE_CLIENT_ID &&
                  process.env.GOOGLE_CLIENT_SECRET,
              )}
              githubEnabled={Boolean(
                process.env.GITHUB_CLIENT_ID &&
                  process.env.GITHUB_CLIENT_SECRET,
              )}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
