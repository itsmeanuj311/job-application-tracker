"use client";

import { useRouter } from "next/navigation";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { signOut } from "@/lib/auth/auth-client";

export default function SignOut() {
    const router = useRouter();
  return (
    <DropdownMenuItem onClick={async () => {
        await signOut();
        router.push("/sign-in");
        }}>
      Log Out
    </DropdownMenuItem>
  );
}
