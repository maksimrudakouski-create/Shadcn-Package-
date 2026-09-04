import { Link } from "@tanstack/react-router";
import { ArrowDownLeft, ArrowRight, ArrowUpRight, Bell, CreditCard, Download, Eye, Plus } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FinanceShell } from "@/shared/ui/FinanceShell";

const activity = [
  { name: "Acme Coffee", detail: "Today · Card ending 4821", amount: "− $8.40", icon: CreditCard },
  { name: "Salary", detail: "Sep 2 · Incoming transfer", amount: "+ $3,250.00", icon: ArrowDownLeft },
  { name: "Avery Wilson", detail: "Sep 1 · Transfer", amount: "− $120.00", icon: ArrowUpRight },
];

export default function HomeScreen() {
  return (
    <FinanceShell>
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Thursday, September 4</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">Good evening, Maksim</h1>
        </div>
        <Avatar className="size-11">
          <AvatarFallback>MR</AvatarFallback>
        </Avatar>
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

        <div className="space-y-5">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Bell className="size-4" /> Notifications</CardTitle>
              <CardDescription>2 items need your attention</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your card</CardTitle>
              <CardDescription>Virtual debit · Active</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl border bg-muted/50 p-5">
                <div className="flex items-center justify-between">
                  <CreditCard className="size-6" />
                  <span className="text-xs font-semibold tracking-wider">NORTHSTAR</span>
                </div>
                <p className="mt-10 font-mono text-lg tracking-widest">••••  ••••  ••••  4821</p>
                <div className="mt-4 flex justify-between text-xs text-muted-foreground"><span>ALEX MORGAN</span><span>09/30</span></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </FinanceShell>
  );
}
