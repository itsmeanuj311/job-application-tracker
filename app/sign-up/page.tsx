"use client";

import { Briefcase } from "lucide-react";
import Link from "next/link";
import { SignupForm } from "@/components/signup-form";
import { signUp } from "@/lib/auth/auth-client";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setLoading(false);

    try {
      const result = await signUp.email ({
        name,
        email,
        password
      })
      if(result.error) {
        setError(result.error.message ?? "Failed to signup");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          href="/sign-up"
          className="flex items-center gap-2 self-center font-medium"
        >
          <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Briefcase className="size-4" />
          </div>
          Job Tracker
        </Link>
        <SignupForm
          onSubmit={handleSubmit}
          error={error}
          loading={loading}
          name={name}
          onNameChange={(value: string) => setName(value)}
          email={email}
          onEmailChange={(value: string) => setEmail(value)}
          password={password}
          onPasswordChange={(value: string) => setPassword(value)}
        />
      </div>
    </div>
  );
}
