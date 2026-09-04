import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type AuthShellProps = {
  eyebrow?: string;
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
  backTo?: string;
  compactContentGap?: boolean;
};

export function AuthShell({
  eyebrow,
  title,
  description,
  children,
  footer,
  backTo,
  compactContentGap = false,
}: AuthShellProps) {
  return (
    <TooltipProvider>
      <main className="flex min-h-svh items-center justify-center bg-background px-4 py-10">
        <div className="w-full max-w-[450px]">
          <Card
            className={cn(
              "gap-6 border-border/70 bg-card py-8 shadow-xl shadow-primary/5 [--card-spacing:2rem]",
              eyebrow && !compactContentGap && "gap-7",
              compactContentGap && "gap-4",
            )}
          >
            <CardHeader
              className={cn(
                "gap-2 space-y-0",
                eyebrow && "gap-3",
              )}
            >
              {eyebrow ? (
                <p className="text-[11px] leading-[13px] font-bold tracking-[0.08em] text-muted-foreground uppercase">
                  {eyebrow}
                </p>
              ) : null}
              <div
                className={cn(
                  "flex flex-col",
                  eyebrow ? "gap-2" : "gap-3",
                )}
              >
                <div className="flex items-center gap-2">
                  {backTo ? (
                    <Button asChild variant="ghost" size="icon-xs" className="-ml-1 size-5">
                      <Link to={backTo} aria-label="Back">
                        <ArrowLeft className="size-4" />
                      </Link>
                    </Button>
                  ) : null}
                  <CardTitle className="text-2xl leading-[29px] font-bold tracking-tight">
                    {title}
                  </CardTitle>
                </div>
                <CardDescription className="text-sm leading-5">
                  {description}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>{children}</CardContent>
          </Card>

          {footer ? (
            <div className="mt-6 text-center text-[13px] leading-4 font-medium text-muted-foreground">
              {footer}
            </div>
          ) : null}
        </div>
      </main>
    </TooltipProvider>
  );
}
