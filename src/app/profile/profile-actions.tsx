"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export function ProfileActions() {
  const router = useRouter();
  const [pending, setPending] = useState<"sessions" | "delete" | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  async function signOutEverywhere() {
    setPending("sessions");
    const { error } = await authClient.revokeSessions();
    setPending(null);
    if (error) {
      toast.error(error.message ?? "Could not sign out of every session.");
      return;
    }
    router.push("/login");
    router.refresh();
  }

  async function deleteAccount() {
    setPending("delete");
    const { error } = await authClient.deleteUser({
      callbackURL: "/",
    });
    setPending(null);
    if (error) {
      toast.error(error.message ?? "Could not delete this account.");
      setConfirmDelete(false);
      return;
    }
    router.push("/");
    router.refresh();
  }

  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <Button
        type="button"
        variant="outline"
        disabled={pending !== null}
        onClick={signOutEverywhere}
      >
        {pending === "sessions" ? "Signing out…" : "Log out of all sessions"}
      </Button>
      {confirmDelete ? (
        <>
          <Button
            type="button"
            variant="destructive"
            disabled={pending !== null}
            onClick={deleteAccount}
          >
            {pending === "delete" ? "Deleting…" : "Confirm delete"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            disabled={pending !== null}
            onClick={() => setConfirmDelete(false)}
          >
            Cancel
          </Button>
        </>
      ) : (
        <Button
          type="button"
          variant="destructive"
          disabled={pending !== null}
          onClick={() => setConfirmDelete(true)}
        >
          Delete account
        </Button>
      )}
    </div>
  );
}
