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
    navigate({ to: "/auth/step-up" });
  }

  return (
    <AuthShell
      eyebrow="Account access"
      title="Welcome back"
      description="Sign in with the email address or phone number linked to your account."
      footer={
        <>
          New here?{" "}
          <Link to="/auth/sign-up" className="font-medium text-primary hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <form className="space-y-5" noValidate onSubmit={submit}>
        <div className="space-y-2">
          <Label htmlFor="identifier">Email address or phone number</Label>
          <Tooltip open={invalidField === "identifier"}>
            <TooltipTrigger asChild>
              <Input
                id="identifier"
                name="identifier"
                placeholder="alex@example.com"
                autoComplete="username"
                aria-invalid={invalidField === "identifier" || undefined}
                onChange={() => setInvalidField(null)}
              />
            </TooltipTrigger>
            <TooltipContent side="bottom" sideOffset={8}>
              This field is required.
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <Label htmlFor="password">Password</Label>
            <Link to="/auth/forgot-password" className="text-sm font-medium text-primary hover:underline">
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
              />
            </TooltipTrigger>
            <TooltipContent side="bottom" sideOffset={8}>
              This field is required.
            </TooltipContent>
          </Tooltip>
        </div>

        <Button type="submit" className="w-full">
          Sign in
          <ArrowRight />
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-xs text-muted-foreground">or</span>
        <Separator className="flex-1" />
      </div>

      <Button variant="outline" className="w-full" onClick={() => navigate({ to: "/auth/step-up" })}>
        <KeyRound />
        Use a secure sign-in method
      </Button>
    </AuthShell>
  );
}
