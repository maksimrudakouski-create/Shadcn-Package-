import { Link, useNavigate } from "@tanstack/react-router";
import { Fingerprint, ShieldCheck, Smartphone } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AuthShell } from "@/shared/ui/AuthShell";

export default function StepUpScreen() {
  const navigate = useNavigate();

  return (
    <AuthShell
      eyebrow="Secure sign-in"
      title="Confirm it’s you"
      description="This sign-in needs an extra verification step to protect your account."
      footer={
        <Link to="/auth/sign-in" className="font-medium text-primary hover:underline">
          Use a different account
        </Link>
      }
    >
      <div className="space-y-5">
        <Alert>
          <ShieldCheck />
          <AlertTitle>Extra protection is active</AlertTitle>
          <AlertDescription>
            Choose a trusted method. The selected method is simulated in this design flow.
          </AlertDescription>
        </Alert>

        <div className="space-y-3">
          <Button className="h-auto w-full justify-start gap-3 px-4 py-4" onClick={() => navigate({ to: "/auth/sign-in" })}>
            <Fingerprint className="size-5" />
            <span className="text-left">
              <span className="block">Use Face ID or Touch ID</span>
              <span className="block text-xs font-normal text-primary-foreground/80">Fastest on this device</span>
            </span>
          </Button>

          <Button variant="outline" className="h-auto w-full justify-start gap-3 px-4 py-4" onClick={() => navigate({ to: "/auth/verify-phone" })}>
            <Smartphone className="size-5" />
            <span className="text-left">
              <span className="block">Use a text message code</span>
              <span className="block text-xs font-normal text-muted-foreground">Send a new code to your phone</span>
            </span>
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <Separator className="flex-1" />
          <span className="text-xs text-muted-foreground">Need help?</span>
          <Separator className="flex-1" />
        </div>

        <Link to="/auth/forgot-password" className="block text-center text-sm font-medium text-primary hover:underline">
          I can’t use these methods
        </Link>
      </div>
    </AuthShell>
  );
}
