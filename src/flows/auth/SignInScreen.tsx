import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { AuthShell } from "@/shared/ui/AuthShell";

const requiredFields = ["identifier", "password"] as const;
type RequiredField = (typeof requiredFields)[number];

export default function SignInScreen() {
  const navigate = useNavigate();
  const [invalidField, setInvalidField] = useState<RequiredField | null>(null);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const firstEmptyField = requiredFields.find((field) => !String(formData.get(field) ?? "").trim());

    if (firstEmptyField) {
      setInvalidField(firstEmptyField);
      const fieldControl = event.currentTarget.elements.namedItem(firstEmptyField);
      if (fieldControl instanceof HTMLInputElement) fieldControl.focus();
      return;
    }

    console.log("Mock sign-in submitted");
    navigate({ to: "/auth/loading" });
  }

  return (
    <AuthShell
      title="Welcome back"
      description="Sign in with the email address or phone number linked to your account."
      footer={
        <>
          New here?{" "}
          <Link to="/auth/sign-up" className="font-medium text-foreground hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <form className="flex flex-col gap-6" noValidate onSubmit={submit}>
        <div className="flex flex-col gap-1.5">
          <Label className="text-[13px] leading-4 font-semibold" htmlFor="identifier">
            Email address or phone number
          </Label>
          <Tooltip open={invalidField === "identifier"}>
            <TooltipTrigger asChild>
              <Input
                id="identifier"
                name="identifier"
                placeholder="alex@example.com"
                autoComplete="username"
                aria-invalid={invalidField === "identifier" || undefined}
                onChange={() => setInvalidField(null)}
                className="h-10 px-3.5"
              />
            </TooltipTrigger>
            <TooltipContent side="bottom" sideOffset={8}>
              This field is required.
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between gap-3">
            <Label className="text-[13px] leading-4 font-semibold" htmlFor="password">
              Password
            </Label>
            <Link
              to="/auth/forgot-password"
              className="text-[13px] leading-4 font-medium text-foreground hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <Tooltip open={invalidField === "password"}>
            <TooltipTrigger asChild>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                aria-invalid={invalidField === "password" || undefined}
                onChange={() => setInvalidField(null)}
                className="h-10 px-3.5"
              />
            </TooltipTrigger>
            <TooltipContent side="bottom" sideOffset={8}>
              This field is required.
            </TooltipContent>
          </Tooltip>
        </div>

        <Button type="submit" size="lg" className="w-full rounded-[10px] font-semibold">
          Sign in
          <ArrowRight />
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-[13px] leading-4 font-medium text-muted-foreground">or</span>
        <Separator className="flex-1" />
      </div>

      <Button
        variant="outline"
        size="lg"
        className="w-full rounded-[10px] font-semibold"
        onClick={() => navigate({ to: "/auth/step-up" })}
      >
        <KeyRound />
        Use a secure sign-in method
      </Button>
    </AuthShell>
  );
}
