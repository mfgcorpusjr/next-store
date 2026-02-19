"use client";

import { toast } from "sonner";
import { SignOutButton } from "@clerk/nextjs";

export default function SignOutLink() {
  const handleSignOut = () => {
    toast.info("Signed out");
  };

  return (
    <SignOutButton redirectUrl="/">
      <span className="w-full" onClick={handleSignOut}>
        Sign Out
      </span>
    </SignOutButton>
  );
}
