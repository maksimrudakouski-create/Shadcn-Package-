import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { AuthShell } from "@/shared/ui/AuthShell";

export default function PhoneVerificationScreen() {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("Mock phone verification submitted", { code });
    navigate({ to: "/auth/sign-in" });
  }

  return (
    <AuthShell
      eyebrow="Step 2 of 2"
      title="Verify your phone"
      description="Enter the six-digit code sent to +1 555 012 3456."
      footer={
        <Link to="/auth/verify-email" className="font-medium text-primary hover:underline">
          Back to email verification
        </Link>
      }
    >
      <form className="space-y-6" onSubmit={submit}>
        <div className="flex justify-center py-2 text-primary">
          <Smartphone className="size-10" />
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
          Verify phone number
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Need another code?{" "}
          <Button variant="link" type="button" className="h-auto p-0 font-medium" onClick={() => console.log("Mock phone code resend")}>
            Resend code
          </Button>
        </p>
      </form>
    </AuthShell>
  );
}
