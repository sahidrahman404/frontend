"use client";
import { Button } from "@/components/ui/button";
import { resendEmailVerification } from "@/auth/authServices";
import { useState } from "react";

export function EmailVerification() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [disabledUntil, setDisabledUntil] = useState<null | number>(null);
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background mx-auto">
      <div className="max-w-md w-full space-y-6 p-6 rounded-lg shadow-lg bg-card">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Verify Your Email</h1>
          <p className="text-muted-foreground">
            We&apos;ve sent a verification email to your inbox. Please check
            your email and follow the instructions to confirm your account.
          </p>
        </div>
        <Button
          type="button"
          className="w-full"
          disabled={isButtonDisabled}
          onClick={async () => {
            setIsButtonDisabled(true);
            await resendEmailVerification();
            setDisabledUntil(new Date().getTime() + 15 * 60 * 1000);

            setTimeout(
              () => {
                setIsButtonDisabled(false);
              },
              15 * 60 * 1000,
            );
          }}
        >
          Resend Verification Email
        </Button>
        {isButtonDisabled ? (
          <p>
            Please wait until{" "}
            {new Date(disabledUntil as number).toLocaleString()}
          </p>
        ) : null}
      </div>
    </div>
  );
}
