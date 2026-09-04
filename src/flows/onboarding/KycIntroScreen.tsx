import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, Camera, FileCheck2, LockKeyhole, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const checklist = [
  { icon: FileCheck2, title: "Government-issued ID", detail: "Passport, national ID, or driving licence" },
  { icon: Camera, title: "A quick selfie", detail: "Make sure you’re in a well-lit space" },
  { icon: LockKeyhole, title: "About 3 minutes", detail: "Your information is encrypted and protected" },
];

export default function KycIntroScreen() {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-svh items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-[450px]">
        <Card className="gap-0 py-0 shadow-xl shadow-primary/5">
          <CardHeader className="items-center gap-3 px-6 py-8 text-center sm:px-10 sm:py-10">
            <span className="flex size-14 items-center justify-center justify-self-center rounded-2xl bg-primary text-primary-foreground">
              <ShieldCheck className="size-7" />
            </span>
            <div className="space-y-2">
              <CardTitle className="text-2xl font-bold tracking-tight sm:text-3xl">Verify your identity</CardTitle>
              <CardDescription className="mx-auto max-w-lg text-sm leading-6 sm:text-base">
                One final security check helps us protect your account and unlock all Northstar features.
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="border-t px-6 py-7 sm:px-10">
            <div className="space-y-5">
              {checklist.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex gap-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="mt-0.5 text-sm leading-5 text-muted-foreground">{item.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Button
              size="lg"
              className="mt-8 w-full rounded-[10px] font-semibold"
              onClick={() => {
                console.log("Mock KYC provider opened");
                navigate({ to: "/onboarding/kyc/pending" });
              }}
            >
              Start verification
              <ArrowRight />
            </Button>
            <p className="mt-4 text-center text-xs leading-5 text-muted-foreground">
              The production experience will continue securely with our identity verification partner.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
