import { useState, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { AuthShell } from "@/shared/ui/AuthShell";

export default function PhoneVerificationScreen() {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("Mock phone verification submitted", { code });
    navigate({ to: "/onboarding/kyc" });
  }

  return (
    <AuthShell
      eyebrow="Step 2 of 2"
      title="Verify your phone"
      description="Enter the six-digit code sent to +1 555 012 3456."
      backTo="/auth/verify-email"
    >
      <form className="flex flex-col gap-7" onSubmit={submit}>
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col items-center gap-2 text-foreground">
            <Smartphone className="size-8" />
            <p className="text-center text-[13px] leading-4 font-medium text-muted-foreground">
              Enter verification code
            </p>
          </div>
          <InputOTP
            maxLength={6}
            value={code}
            onChange={setCode}
            containerClassName="justify-center"
          >
            <InputOTPGroup className="gap-1.5 rounded-none">
              <InputOTPSlot className="size-10 rounded-md border" index={0} />
              <InputOTPSlot className="size-10 rounded-md border" index={1} />
              <InputOTPSlot className="size-10 rounded-md border" index={2} />
              <InputOTPSlot className="size-10 rounded-md border" index={3} />
              <InputOTPSlot className="size-10 rounded-md border" index={4} />
              <InputOTPSlot className="size-10 rounded-md border" index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <div className="flex flex-col items-center gap-4">
          <Button
            type="submit"
            size="lg"
            className="w-full rounded-[10px] font-semibold"
            disabled={code.length !== 6}
          >
            Verify phone number
            <ArrowRight />
          </Button>

          <p className="text-center text-[13px] leading-4 font-medium text-muted-foreground">
            Need another code?{" "}
            <Button
              variant="link"
              type="button"
              className="h-auto border-0 p-0 leading-4 font-medium text-foreground"
              onClick={() => console.log("Mock phone code resend")}
            >
              Resend code
            </Button>
          </p>
        </div>
      </form>
    </AuthShell>
  );
}
