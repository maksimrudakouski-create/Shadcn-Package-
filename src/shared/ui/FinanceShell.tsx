import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { ArrowLeftRight, ArrowRight, Bell, CircleUserRound, CreditCard, House, Landmark, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 8);

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  return (
    <div className="min-h-svh bg-background bg-app-canvas bg-[length:20px_20px] pb-24 lg:pb-8">
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 border-b bg-background/90 backdrop-blur transition-[background-color,box-shadow,border-color] duration-200 ease-out",
          isScrolled && "border-border/80 bg-background/95 shadow-sm",
        )}
      >
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

          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open notifications">
                  <Bell />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-[360px] gap-4 p-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Bell className="size-4" />
                    <h2 className="font-semibold">Notifications</h2>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">2 items need your attention</p>
                </div>
                <div className="rounded-xl bg-secondary p-4">
                  <Badge className="mb-2" variant="outline">Account</Badge>
                  <p className="font-semibold">Identity verified</p>
                  <p className="mt-1 text-sm leading-5 text-muted-foreground">Your account is active and ready to use.</p>
                </div>
                <div className="rounded-xl border p-4">
                  <Badge className="mb-2" variant="outline">Security</Badge>
                  <p className="font-semibold">Review your security settings</p>
                  <p className="mt-1 text-sm leading-5 text-muted-foreground">Add a trusted device for faster sign-ins.</p>
                </div>
                <Button asChild variant="ghost" className="w-full">
                  <Link to="/notifications">Open notification center <ArrowRight /></Link>
                </Button>
              </PopoverContent>
            </Popover>
            <HoverCard openDelay={100} closeDelay={180}>
              <HoverCardTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  aria-label="Open profile menu"
                >
                  <Avatar className="size-9">
                    <AvatarImage src="/avatars/maksim-rudakouski.png" alt="Maksim Rudakouski" />
                  </Avatar>
                </Button>
              </HoverCardTrigger>
              <HoverCardContent
                align="end"
                className="w-36 p-1"
              >
                <Button asChild variant="ghost" size="sm" className="w-full justify-start">
                  <Link to="/loading/profile"><CircleUserRound /> Profile</Link>
                </Button>
                <Button asChild variant="ghost" size="sm" className="w-full justify-start text-destructive hover:text-destructive">
                  <Link to="/auth/sign-in"><LogOut /> Logout</Link>
                </Button>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pt-24 pb-8 sm:px-6 sm:pb-10 lg:pb-28">{children}</main>

      <footer className="border-t bg-muted/95 backdrop-blur lg:fixed lg:inset-x-0 lg:bottom-0 lg:z-30">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-6 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="font-semibold text-foreground">Northstar</p>
            <p className="mt-1 text-muted-foreground">Banking that stays out of your way.</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-muted-foreground">
            <a href="#security" className="transition-colors hover:text-foreground">Security</a>
            <a href="#help" className="transition-colors hover:text-foreground">Help center</a>
            <a href="#privacy" className="transition-colors hover:text-foreground">Privacy</a>
            <span>© 2026 Northstar</span>
          </div>
        </div>
      </footer>

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
