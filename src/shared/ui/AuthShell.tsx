import type { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TooltipProvider } from "@/components/ui/tooltip";

type AuthShellProps = {
  eyebrow?: string;
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
};

export function AuthShell({ eyebrow, title, description, children, footer }: AuthShellProps) {
  return (
    <TooltipProvider>
      <main className="flex min-h-svh items-center justify-center bg-auth-surface bg-auth-canvas bg-size-[11rem_11rem,11rem_11rem,auto,auto] px-4 py-10">
        <div className="w-full max-w-md">
          <Card className="border-border/70 bg-card/85 shadow-xl shadow-primary/5 backdrop-blur">
            <CardHeader className="space-y-2">
              {eyebrow ? (
                <p className="text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                  {eyebrow}
                </p>
              ) : null}
              <CardTitle className="text-2xl tracking-tight">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>{children}</CardContent>
          </Card>

          {footer ? <div className="mt-5 text-center text-sm text-muted-foreground">{footer}</div> : null}
        </div>
      </main>
    </TooltipProvider>
  );
}
