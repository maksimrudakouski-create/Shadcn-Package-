import { Link } from "@tanstack/react-router";
import { ArrowDownLeft, ArrowRight, ArrowUpRight, CreditCard, Download, Eye, Plus, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FinanceShell } from "@/shared/ui/FinanceShell";

const activity = [
  { name: "Acme Coffee", detail: "Today · Card ending 4821", amount: "− $8.40", icon: CreditCard },
  { name: "Salary", detail: "Sep 2 · Incoming transfer", amount: "+ $3,250.00", icon: ArrowDownLeft },
  { name: "Avery Wilson", detail: "Sep 1 · Transfer", amount: "− $120.00", icon: ArrowUpRight },
];

const cards = [
  { id: "virtual-4821", name: "Everyday", type: "Virtual debit", last4: "4821", expiry: "09/30", icon: Smartphone, artwork: "/card-art/everyday-orbits.jpg" },
  { id: "physical-7358", name: "Travel", type: "Physical debit", last4: "7358", expiry: "04/31", icon: CreditCard, artwork: "/card-art/travel-horizon.jpg" },
  { id: "virtual-1094", name: "Subscriptions", type: "Virtual debit", last4: "1094", expiry: "11/29", icon: Smartphone, artwork: "/card-art/subscriptions-ribbons.jpg" },
];

export default function HomeScreen() {
  return (
    <FinanceShell>
      <div className="mb-8">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Thursday, September 4</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">Good evening, Maksim</h1>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.45fr_0.75fr]">
        <div className="space-y-5">
          <Card className="relative overflow-hidden border-0 bg-balance-card text-balance-card-foreground ring-0">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2 text-balance-card-foreground/70">
                Available balance
                <Eye className="size-4" />
              </CardDescription>
              <CardTitle className="text-4xl font-semibold tracking-tight sm:text-5xl">$12,480.52</CardTitle>
              <p className="text-sm text-balance-card-foreground/70">Personal account · •• 4821</p>
            </CardHeader>
            <CardContent className="mt-4 flex gap-2">
              <Button asChild variant="secondary" className="flex-1 sm:flex-none"><Link to="/transactions"><ArrowUpRight /> Send</Link></Button>
              <Button asChild variant="secondary" className="flex-1 sm:flex-none"><Link to="/transactions"><Plus /> Add money</Link></Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent activity</CardTitle>
              <CardDescription>Your latest account movements</CardDescription>
              <CardAction>
                <Button variant="ghost" size="sm">View all <ArrowRight /></Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activity.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.name}>
                      <div className="flex items-center gap-3">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary">
                          <Icon className="size-4" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-medium">{item.name}</p>
                          <p className="truncate text-xs text-muted-foreground">{item.detail}</p>
                        </div>
                        <p className="font-semibold tabular-nums">{item.amount}</p>
                      </div>
                      {index < activity.length - 1 ? <Separator className="mt-4" /> : null}
                    </div>
                  );
                })}
              </div>
              <Button variant="outline" className="mt-6 w-full" onClick={() => console.log("Mock statement PDF download") }>
                <Download />
                Download statement
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="flex">
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Your cards</CardTitle>
              <CardDescription>3 active cards</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-3">
              {cards.map((card) => {
                const Icon = card.icon;

                return (
                  <Link
                    key={card.id}
                    to={`/cards/${card.id}`}
                    className="relative flex flex-1 flex-col justify-between overflow-hidden rounded-xl border p-4 text-balance-card-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring"
                    aria-label={`Open ${card.name} card details`}
                  >
                    <img src={card.artwork} alt="" className="absolute inset-0 size-full object-cover" />
                    <div className="absolute inset-0 bg-card-art-overlay" />
                    <div className="relative flex items-center justify-between">
                      <div className="flex items-center gap-2"><Icon className="size-5" /><span className="font-semibold">{card.name}</span></div>
                      <span className="text-xs font-semibold tracking-wider">NORTHSTAR</span>
                    </div>
                    <p className="relative mt-6 font-mono text-base tracking-[0.15em]">••••  ••••  ••••  {card.last4}</p>
                    <div className="relative mt-3 flex justify-between text-xs text-balance-card-foreground/70"><span>{card.type}</span><span>{card.expiry}</span></div>
                  </Link>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </FinanceShell>
  );
}
