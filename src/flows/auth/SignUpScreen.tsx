import { useState, type ComponentProps, type FormEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { AuthShell } from "@/shared/ui/AuthShell";
import { DatePicker } from "@/shared/ui/DatePicker";

const requiredFields = [
  "first-name",
  "last-name",
  "signup-email",
  "signup-phone",
  "birth-date",
  "signup-password",
  "address",
] as const;

type RequiredField = (typeof requiredFields)[number];

type RequiredInputProps = ComponentProps<typeof Input> & {
  field: RequiredField;
  invalidField: RequiredField | null;
  clearInvalidField: () => void;
};

function RequiredInput({ field, invalidField, clearInvalidField, ...props }: RequiredInputProps) {
  const invalid = invalidField === field;

  return (
    <Tooltip open={invalid}>
      <TooltipTrigger asChild>
        <Input
          {...props}
          name={field}
          aria-invalid={invalid || undefined}
          onChange={(event) => {
            props.onChange?.(event);
            if (invalid) clearInvalidField();
          }}
        />
      </TooltipTrigger>
      <TooltipContent side="bottom" sideOffset={8}>
        This field is required.
      </TooltipContent>
    </Tooltip>
  );
}

export default function SignUpScreen() {
  const navigate = useNavigate();
  const [invalidField, setInvalidField] = useState<RequiredField | null>(null);
  const [dateOfBirth, setDateOfBirth] = useState<Date>();

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const firstEmptyField = requiredFields.find((field) => {
      if (field === "birth-date") return !dateOfBirth;
      return !String(formData.get(field) ?? "").trim();
    });

    if (firstEmptyField) {
      setInvalidField(firstEmptyField);
      if (firstEmptyField !== "birth-date") {
        const fieldControl = event.currentTarget.elements.namedItem(firstEmptyField);
        if (fieldControl instanceof HTMLInputElement) fieldControl.focus();
      }
      return;
    }

    console.log("Mock sign-up submitted");
    navigate({ to: "/auth/verify-email" });
  }

  return (
    <AuthShell
      title="Create your account"
      description="Start with your details. You’ll confirm your email and phone in the next steps."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/auth/sign-in" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <form className="space-y-5" noValidate onSubmit={submit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="first-name">First name</Label>
            <RequiredInput
              field="first-name"
              invalidField={invalidField}
              clearInvalidField={() => setInvalidField(null)}
              id="first-name"
              placeholder="Alex"
              autoComplete="given-name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last-name">Last name</Label>
            <RequiredInput
              field="last-name"
              invalidField={invalidField}
              clearInvalidField={() => setInvalidField(null)}
              id="last-name"
              placeholder="Morgan"
              autoComplete="family-name"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="signup-email">Email address</Label>
          <RequiredInput
            field="signup-email"
            invalidField={invalidField}
            clearInvalidField={() => setInvalidField(null)}
            id="signup-email"
            type="email"
            placeholder="alex@example.com"
            autoComplete="email"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="signup-phone">Phone number</Label>
          <RequiredInput
            field="signup-phone"
            invalidField={invalidField}
            clearInvalidField={() => setInvalidField(null)}
            id="signup-phone"
            type="tel"
            placeholder="+1 555 012 3456"
            autoComplete="tel"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="birth-date">Date of birth</Label>
            <DatePicker
              id="birth-date"
              value={dateOfBirth}
              onValueChange={(date) => {
                setDateOfBirth(date);
                setInvalidField(null);
              }}
              invalid={invalidField === "birth-date"}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-password">Password</Label>
            <RequiredInput
              field="signup-password"
              invalidField={invalidField}
              clearInvalidField={() => setInvalidField(null)}
              id="signup-password"
              type="password"
              autoComplete="new-password"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Home address</Label>
          <RequiredInput
            field="address"
            invalidField={invalidField}
            clearInvalidField={() => setInvalidField(null)}
            id="address"
            placeholder="Street, city, postal code"
            autoComplete="street-address"
          />
        </div>

        <Button type="submit" className="w-full">
          Continue to email verification
          <ArrowRight />
        </Button>
      </form>
    </AuthShell>
  );
}
