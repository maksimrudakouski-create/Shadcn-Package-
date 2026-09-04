import { useNavigate, useParams } from "@tanstack/react-router";
import { ArrowRight, Check, Clock3, RefreshCw, ShieldAlert } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const statusContent = {
  pending: {
    icon: Clock3,
    badge: "In review",
    title: "We’re checking your details",
    description: "Your verification has been submitted. Most checks finish within a few minutes.",
  },
  rejected: {
    icon: ShieldAlert,
    badge: "Action required",
    title: "We couldn’t verify your identity",
    description: "The document photo was unclear. Try again in good lighting and make sure every corner is visible.",
  },
  approved: {
    icon: Check,
    badge: "Verified",
    title: "Your account is ready",
    description: "Identity verified. Your Northstar account has been activated and is ready to use.",
  },
} as const;

export default function KycStatusScreen() {
  const params = useParams({ strict: false });
  const navigate = useNavigate();
  const routeStatus = String(params.status ?? "pending");
  const status: keyof typeof statusContent =
    routeStatus === "rejected" || routeStatus === "approved" ? routeStatus : "pending";
  const content = statusContent[status];
  const Icon = content.icon;

  return (
    <main className="flex min-h-svh items-center justify-center bg-background px-4 py-12">
      <Card className="w-full max-w-[450px] gap-0 py-0 shadow-lg">
        <CardHeader className="items-center gap-4 px-6 pt-9 pb-1 text-center sm:px-10">
          {status !== "pending" ? (
            <>
              <span className="flex size-16 items-center justify-center justify-self-center rounded-full bg-secondary text-secondary-foreground">
                <Icon className="size-7" />
              </span>
              <Badge variant={status === "rejected" ? "destructive" : "secondary"}>{content.badge}</Badge>
            </>
          ) : null}
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold tracking-tight">{content.title}</CardTitle>
            <CardDescription className="mx-auto max-w-md leading-6">{content.description}</CardDescription>
          </div>
        </CardHeader>

        <CardContent className="px-6 pb-7 sm:px-10">
          {status === "pending" ? (
            <div className="space-y-6">
              <Alert>
                <Clock3 />
                <AlertTitle>No action needed</AlertTitle>
                <AlertDescription>You can close this page. We’ll notify you when the check is complete.</AlertDescription>
              </Alert>
            </div>
          ) : null}

          {status === "rejected" ? (
            <div className="space-y-5">
              <Alert variant="destructive">
                <ShieldAlert />
                <AlertTitle>Document photo needs attention</AlertTitle>
                <AlertDescription>Avoid glare, blur, cropped edges, and expired documents.</AlertDescription>
              </Alert>
              <Button className="w-full" onClick={() => navigate({ to: "/onboarding/kyc" })}>
                <RefreshCw />
                Retry verification
              </Button>
            </div>
          ) : null}

          {status === "approved" ? (
            <Button size="lg" className="w-full font-semibold" onClick={() => navigate({ to: "/home" })}>
              Go to my account
              <ArrowRight />
            </Button>
          ) : null}
        </CardContent>
      </Card>
    </main>
  );
}
