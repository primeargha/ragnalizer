import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle";
import { auth } from "@/lib/auth";
import { ProfileActions } from "./profile-actions";

export const metadata = {
  title: "Profile",
};

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) redirect("/login");

  const { user } = session;

  return (
    <div className="min-h-svh bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <Link href="/" className="landing-brand text-sm">
            Ragnalizer
          </Link>
          <ModeToggle className="border-border bg-transparent" />
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-6 py-16">
        <p className="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
          Profile
        </p>
        <h1 className="landing-title mt-3 text-4xl">{user.name}</h1>
        <p className="mt-3 text-muted-foreground">{user.email}</p>
        <div className="mt-10 rounded-3xl border border-border bg-card p-6">
          <p className="text-sm leading-relaxed text-muted-foreground">
            This is a placeholder profile. Reports, projects, and chat will live
            here later. For now you can sign out of every device or delete the
            account stored in the user table.
          </p>
          <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-muted-foreground">Email verified</dt>
              <dd className="mt-1 font-medium">
                {user.emailVerified ? "Yes" : "No"}
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">User id</dt>
              <dd className="mt-1 font-mono text-xs break-all">{user.id}</dd>
            </div>
          </dl>
          <ProfileActions />
        </div>
      </main>
    </div>
  );
}
