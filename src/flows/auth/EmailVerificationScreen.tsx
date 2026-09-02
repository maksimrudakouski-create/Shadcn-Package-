import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { AuthShell } from "@/shared/ui/AuthShell";

export default function EmailVerificationScreen() {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("Mock email verification submitted", { code });
    navigate({ to: "/auth/verify-phone" });
  }

  return (
    <AuthShell
      eyebrow="Step 1 of 2"
      title="Verify your email"
      description="We sent a six-digit code to alex@example.com."
      footer={
        <Link to="/auth/sign-up" className="font-medium text-primary hover:underline">
          Use a different email
        </Link>
      }
    >
      <form className="space-y-6" onSubmit={submit}>
        <div className="flex justify-center py-2 text-primary">
          <MailCheck className="size-10" />
        </div>

        <div className="space-y-3">
          <p className="text-center text-sm text-muted-foreground">Enter verification code</p>
          <InputOTP
            maxLength={6}
            value={code}
            onChange={setCode}
            containerClassName="justify-center"
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <Button type="submit" className="w-full" disabled={code.length !== 6}>
          Verify email
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Didn’t receive it?{" "}
          <Button variant="link" type="button" className="h-auto p-0 font-medium" onClick={() => console.log("Mock email code resend")}>
            Send a new code
          </Button>
        </p>
      </form>
    </AuthShell>
  );
}
