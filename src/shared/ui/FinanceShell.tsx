import type { ReactNode } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { ArrowLeftRight, Bell, CircleUserRound, CreditCard, House, Landmark, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FinanceShellProps = {
  children: ReactNode;
};

const navItems = [
  { label: "Home", to: "/home", loadingTo: "/loading/home", icon: House },
  { label: "Activity", to: "/transactions", loadingTo: "/loading/activity", icon: ArrowLeftRight },
  { label: "Cards", to: "/cards", loadingTo: "/loading/cards", icon: CreditCard },
  { label: "Profile", to: "/profile", loadingTo: "/loading/profile", icon: CircleUserRound },
];

export function FinanceShell({ children }: FinanceShellProps) {
  const { pathname } = useLocation();

  return (
    <div className="min-h-svh bg-background pb-24 lg:pb-8">
      <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link to="/loading/home" className="group flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground motion-safe:group-hover:animate-[northstar-logo-float_2.8s_ease-in-out_infinite]">
              <Landmark className="size-4" />
            </span>
            Northstar
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
            {navItems.map((item) => {
              const active = pathname === item.to;
              const Icon = item.icon;
              return (
                <Button key={item.to} asChild variant={active ? "secondary" : "ghost"}>
                  <Link to={item.loadingTo ?? item.to}>
                    <Icon />
                    {item.label}
                  </Link>
                </Button>
              );
            })}
          </nav>

          <div className="flex items-center gap-1">
            <Button asChild variant="ghost" size="icon" aria-label="Open notifications">
              <Link to="/notifications">
                <Bell />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="icon" aria-label="Log out">
              <Link to="/auth/sign-in">
                <LogOut />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">{children}</main>

      <nav
        className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur lg:hidden"
        aria-label="Main navigation"
      >
        <div className="mx-auto grid max-w-lg grid-cols-4">
          {navItems.map((item) => {
            const active = pathname === item.to;
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.loadingTo ?? item.to}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-lg px-1 py-1.5 text-[11px] font-medium text-muted-foreground",
                  active && "bg-secondary text-foreground",
                )}
              >
                <Icon className="size-5" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
