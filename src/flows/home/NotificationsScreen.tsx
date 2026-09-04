import { ArrowDownLeft, Bell, Check, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { FinanceShell } from "@/shared/ui/FinanceShell";

const notifications = [
  { title: "Identity verified", body: "Your Northstar account is now active.", time: "Just now", icon: Check, unread: true },
  { title: "Payment received", body: "$3,250.00 was added to your personal account.", time: "2 days ago", icon: ArrowDownLeft, unread: true },
  { title: "Security checkup", body: "Review your trusted devices and sign-in methods.", time: "3 days ago", icon: ShieldCheck, unread: false },
];

export default function NotificationsScreen() {
  return (
    <FinanceShell>
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Stay up to date</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight">Notifications</h1>
          </div>
          <Badge variant="secondary">2 unread</Badge>
        </div>

        <Card className="gap-0 py-0">
          <CardContent className="px-0">
            {notifications.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex gap-4 border-b p-5 last:border-b-0 sm:p-6">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary"><Icon className="size-4" /></span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <p className="font-semibold">{item.title}</p>
                      <span className="shrink-0 text-xs text-muted-foreground">{item.time}</span>
                    </div>
                    <p className="mt-1 text-sm leading-5 text-muted-foreground">{item.body}</p>
                  </div>
                  {item.unread ? <span className="mt-2 size-2 shrink-0 rounded-full bg-primary" /> : null}
                </div>
              );
            })}
          </CardContent>
        </Card>

        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Bell className="size-4" /> You’re all caught up
        </div>
      </div>
    </FinanceShell>
  );
}
