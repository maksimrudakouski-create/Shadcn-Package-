import { useState, type FormEvent } from "react";
import { ArrowRight, CircleCheck } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { AuthShell } from "@/shared/ui/AuthShell";

export default function ForgotPasswordScreen() {
  const [sent, setSent] = useState(false);
  const [invalid, setInvalid] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const identifier = String(new FormData(event.currentTarget).get("reset-identifier") ?? "").trim();

    if (!identifier) {
      setInvalid(true);
      const fieldControl = event.currentTarget.elements.namedItem("reset-identifier");
      if (fieldControl instanceof HTMLInputElement) fieldControl.focus();
      return;
    }

    console.log("Mock password reset requested");
    setSent(true);
  }

  return (
    <AuthShell
      title="Reset your password"
      description="We’ll send a password reset link or SMS code, depending on your account settings."
      backTo="/auth/sign-in"
    >
      <form className="flex flex-col gap-6" noValidate onSubmit={submit}>
        {sent ? (
          <Alert>
            <CircleCheck />
            <AlertTitle>Check your inbox</AlertTitle>
            <AlertDescription>
              A reset instruction has been prepared for alex@example.com in this prototype.
            </AlertDescription>
          </Alert>
        ) : null}

        <div className="flex flex-col gap-1.5">
          <Label
            className="text-[13px] leading-4 font-semibold"
            htmlFor="reset-identifier"
          >
            Email address or phone number
          </Label>
          <Tooltip open={invalid}>
            <TooltipTrigger asChild>
              <Input
                id="reset-identifier"
                name="reset-identifier"
                placeholder="alex@example.com"
                autoComplete="username"
                aria-invalid={invalid || undefined}
                onChange={() => setInvalid(false)}
                className="h-10 px-3.5"
              />
            </TooltipTrigger>
            <TooltipContent side="bottom" sideOffset={8}>
              This field is required.
            </TooltipContent>
          </Tooltip>
        </div>

        <Button type="submit" className="h-11 w-full rounded-[10px] font-semibold">
          Send reset instructions
          <ArrowRight />
        </Button>
      </form>
    </AuthShell>
  );
}
