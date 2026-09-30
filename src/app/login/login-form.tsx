"use client";

import { useRouter } from "next/navigation";
import { type SubmitEvent, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";

type LoginFormProps = {
  googleEnabled: boolean;
  githubEnabled: boolean;
};

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-4">
      <title>Google</title>
      <path
        fill="#EA4335"
        d="M12 10.2v3.9h5.5c-.2 1.3-1.6 3.8-5.5 3.8-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.8 2.9 14.6 2 12 2 6.5 2 2 6.5 2 12s4.5 10 10 10c5.8 0 9.6-4 9.6-9.7 0-.7-.1-1.2-.2-1.7H12z"
      />
      <path
        fill="#34A853"
        d="M2 12c0 1.8.5 3.5 1.4 5l3.3-2.6C6.3 13.6 6 12.8 6 12s.3-1.6.7-2.4L3.4 7A10 10 0 0 0 2 12z"
      />
      <path
        fill="#FBBC05"
        d="M12 22c2.6 0 4.8-.9 6.4-2.3l-3.1-2.4c-.8.6-1.9 1.1-3.3 1.1-2.5 0-4.6-1.7-5.4-4l-3.3 2.6A10 10 0 0 0 12 22z"
      />
      <path
        fill="#4285F4"
        d="M21.6 12.3c0-.7-.1-1.2-.2-1.7H12v3.9h5.5c-.3 1.4-1.1 2.5-2.2 3.3l3.1 2.4c1.8-1.7 3.2-4.2 3.2-7.9z"
      />
    </svg>
  );
}

function GithubMark() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-4">
      <title>GitHub</title>
      <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.5-1.2-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1.7 1.8 2.8 1.3.1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6a4.7 4.7 0 0 1 1.2-3.2 4.3 4.3 0 0 1 .1-3.2s1-.3 3.3 1.2a11.3 11.3 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2a4.3 4.3 0 0 1 .1 3.2 4.7 4.7 0 0 1 1.2 3.2c0 4.7-2.8 5.7-5.5 6 .4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5z" />
    </svg>
  );
}

export function LoginForm({ googleEnabled, githubEnabled }: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [pending, setPending] = useState<
    "google" | "github" | "send" | "verify" | null
  >(null);

  async function signInWith(provider: "google" | "github") {
    setPending(provider);
    const { error } = await authClient.signIn.social({
      provider,
      callbackURL: "/profile",
    });
    if (error) {
      toast.error(error.message ?? "Could not start that sign-in.");
      setPending(null);
    }
  }

  async function sendCode(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending("send");
    const { error } = await authClient.emailOtp.sendVerificationOtp({
      email,
      type: "sign-in",
    });
    setPending(null);
    if (error) {
      toast.error(error.message ?? "Could not send the code.");
      return;
    }
    setCodeSent(true);
    toast.success("Sign-in code sent.");
  }

  async function verifyCode(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending("verify");
    const name = email.split("@")[0] || "User";
    const { error } = await authClient.signIn.emailOtp({
      email,
      otp,
      name,
    });
    setPending(null);
    if (error) {
      toast.error(error.message ?? "That code was not accepted.");
      return;
    }
    router.push("/profile");
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-3">
        <Button
          type="button"
          variant="outline"
          className="h-11 w-full justify-center"
          disabled={!googleEnabled || pending !== null}
          onClick={() => signInWith("google")}
        >
          <GoogleMark />
          {googleEnabled ? "Continue with Google" : "Google is not configured"}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="h-11 w-full justify-center"
          disabled={!githubEnabled || pending !== null}
          onClick={() => signInWith("github")}
        >
          <GithubMark />
          {githubEnabled ? "Continue with GitHub" : "GitHub is not configured"}
        </Button>
      </div>

      <div className="flex items-center gap-3 text-xs tracking-[0.16em] text-muted-foreground uppercase">
        <span className="h-px flex-1 bg-border" />
        or email code
        <span className="h-px flex-1 bg-border" />
      </div>

      <form className="space-y-4" onSubmit={codeSent ? verifyCode : sendCode}>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@studio.com"
            value={email}
            disabled={codeSent || pending !== null}
            onChange={(event) => setEmail(event.target.value)}
            className="h-11"
          />
        </div>
        {codeSent ? (
          <div className="space-y-2">
            <Label htmlFor="otp">Code</Label>
            <Input
              id="otp"
              inputMode="numeric"
              autoComplete="one-time-code"
              required
              minLength={6}
              maxLength={6}
              placeholder="6-digit code"
              value={otp}
              disabled={pending !== null}
              onChange={(event) => setOtp(event.target.value)}
              className="h-11 tracking-[0.3em]"
            />
          </div>
        ) : null}
        <Button
          type="submit"
          className="h-11 w-full"
          disabled={pending !== null}
        >
          {pending === "send" || pending === "verify"
            ? "Working…"
            : codeSent
              ? "Sign in"
              : "Send code"}
        </Button>
        {codeSent ? (
          <button
            type="button"
            className="text-sm text-muted-foreground underline-offset-4 hover:underline"
            onClick={() => {
              setCodeSent(false);
              setOtp("");
            }}
          >
            Use a different email
          </button>
        ) : null}
      </form>
    </div>
  );
}
