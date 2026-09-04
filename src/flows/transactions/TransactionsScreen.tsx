import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { format } from "date-fns";
import { ArrowDownLeft, ArrowRight, ArrowUpRight, Building2, CalendarDays, CreditCard, Plus, Search, Send, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { FinanceShell } from "@/shared/ui/FinanceShell";

type TransactionType = "card" | "transfer" | "funding";
type ActionMode = "topup" | "send" | null;

const transactions = [
  { id: "tx-8012", name: "Acme Coffee", detail: "Today, 18:42 · Card •4821", amount: "− $8.40", type: "card" as TransactionType, status: "Completed", icon: CreditCard },
  { id: "tx-8011", name: "Avery Wilson", detail: "Today, 14:16 · Northstar user", amount: "− $120.00", type: "transfer" as TransactionType, status: "Completed", icon: ArrowUpRight },
  { id: "tx-8010", name: "Salary", detail: "Sep 2, 09:03 · Bank transfer", amount: "+ $3,250.00", type: "funding" as TransactionType, status: "Completed", icon: ArrowDownLeft },
  { id: "tx-8009", name: "Atlas Airlines", detail: "Sep 1, 20:31 · Card •7358", amount: "− $486.20", type: "card" as TransactionType, status: "Completed", icon: CreditCard },
  { id: "tx-8008", name: "International payout", detail: "Aug 30, 11:48 · External bank", amount: "− $750.00", type: "transfer" as TransactionType, status: "Processing", icon: Building2 },
];

export default function TransactionsScreen() {
  const [type, setType] = useState<TransactionType | "all">("all");
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<ActionMode>(null);
  const [destination, setDestination] = useState("internal");
  const [submitted, setSubmitted] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();

  const visible = useMemo(
    () => transactions.filter((item) => (type === "all" || item.type === type) && item.name.toLowerCase().includes(query.toLowerCase())),
    [query, type],
  );

  function completeMockAction() {
    console.log("Mock transaction submitted", { mode, destination });
    setSubmitted(true);
  }

  function closeAction() {
    setMode(null);
    setSubmitted(false);
  }

  return (
    <FinanceShell>
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div><p className="text-sm font-medium text-muted-foreground">Money movement</p><h1 className="mt-1 text-3xl font-bold tracking-tight">Transactions</h1></div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setMode("topup")}><Plus /> Add money</Button>
            <Button onClick={() => setMode("send")}><Send /> Send money</Button>
          </div>
        </div>

        <Card className="border-0 bg-balance-card text-balance-card-foreground ring-0">
          <CardHeader><CardDescription className="text-balance-card-foreground/70">Available balance</CardDescription><CardTitle className="text-3xl font-semibold">$12,480.52</CardTitle></CardHeader>
          <CardContent className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-balance-card-foreground/70"><span>GBP account available</span><span>UK Faster Payments supported</span><span>Internal transfers are instant</span></CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>All activity</CardTitle><CardDescription>Search and filter your account transactions.</CardDescription></CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto]">
              <div className="relative"><Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search transactions" className="pl-9" /></div>
              <Select value={type} onValueChange={(value) => setType(value as TransactionType | "all")}>
                <SelectTrigger className="w-full sm:w-[170px]"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="all">All types</SelectItem><SelectItem value="card">Card payments</SelectItem><SelectItem value="transfer">Transfers</SelectItem><SelectItem value="funding">Money in</SelectItem></SelectContent>
              </Select>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-between font-normal sm:w-[180px]">
                    {selectedDate ? format(selectedDate, "MMM d, yyyy") : "Select date"}
                    <CalendarDays />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} />
                </PopoverContent>
              </Popover>
            </div>

            <div className="mt-6">
              {visible.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={item.id}>
                    <Link to={`/transactions/${item.id}`} className="group flex items-center gap-3 rounded-lg py-3 outline-none hover:bg-muted/60 focus-visible:ring-2 focus-visible:ring-ring">
                      <span className="ml-2 flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary"><Icon className="size-4" /></span>
                      <div className="min-w-0 flex-1"><p className="truncate font-medium">{item.name}</p><p className="truncate text-xs text-muted-foreground">{item.detail}</p></div>
                      <div className="text-right"><p className="font-semibold tabular-nums">{item.amount}</p><Badge variant="outline" className="mt-1">{item.status}</Badge></div>
                      <ArrowRight className="mr-2 size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                    </Link>
                    {index < visible.length - 1 ? <Separator /> : null}
                  </div>
                );
              })}
              {visible.length === 0 ? <div className="py-12 text-center text-sm text-muted-foreground">No transactions match your filters.</div> : null}
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={mode !== null} onOpenChange={(open) => { if (!open) closeAction(); }}>
        <DialogContent>
          {submitted ? (
            <>
              <DialogHeader><DialogTitle>{mode === "topup" ? "Top up initiated" : "Transfer submitted"}</DialogTitle><DialogDescription>{mode === "topup" ? "Your balance will update when the bank transfer arrives." : destination === "internal" ? "The recipient received the money instantly and fee-free." : "We’ll notify you when the bank payout completes or fails."}</DialogDescription></DialogHeader>
              <div className="flex justify-center py-2">
                <img src="/illustrations/transfer-confirmation.png" alt="" className="size-40 object-contain" />
              </div>
              <DialogFooter><Button onClick={closeAction}>Done</Button></DialogFooter>
            </>
          ) : (
            <>
              <DialogHeader><DialogTitle>{mode === "topup" ? "Add money" : "Send money"}</DialogTitle><DialogDescription>{mode === "topup" ? "Create a bank transfer using your Northstar account details." : "Choose another Northstar user or an external bank account."}</DialogDescription></DialogHeader>
              {mode === "send" ? (
                <RadioGroup value={destination} onValueChange={setDestination} className="py-1">
                  <Label htmlFor="internal-transfer" className="flex items-start gap-3 rounded-xl border p-4"><RadioGroupItem id="internal-transfer" value="internal" className="mt-0.5" /><UserRound className="size-5" /><span><span className="block font-semibold">Northstar user</span><span className="block text-sm font-normal text-muted-foreground">Instant and fee-free</span></span></Label>
                  <Label htmlFor="bank-transfer" className="flex items-start gap-3 rounded-xl border p-4"><RadioGroupItem id="bank-transfer" value="bank" className="mt-0.5" /><Building2 className="size-5" /><span><span className="block font-semibold">External bank account</span><span className="block text-sm font-normal text-muted-foreground">Domestic or international payout</span></span></Label>
                </RadioGroup>
              ) : (
                <Card className="bg-muted/50"><CardContent className="space-y-3 font-mono text-sm"><div className="flex justify-between gap-4"><span className="text-muted-foreground">Account name</span><span>Maksim Rudakouski</span></div><div className="flex justify-between gap-4"><span className="text-muted-foreground">Sort code</span><span>04-29-18</span></div><div className="flex justify-between gap-4"><span className="text-muted-foreground">Account number</span><span>83729461</span></div></CardContent></Card>
              )}
              {mode === "send" ? (
                <div className="space-y-3">
                  <div className="space-y-2"><Label htmlFor="recipient">{destination === "internal" ? "Recipient username or email" : "Recipient name"}</Label><Input id="recipient" placeholder={destination === "internal" ? "@avery" : "Account holder"} /></div>
                  {destination === "bank" ? (
                    <>
                      <div className="space-y-2"><Label htmlFor="destination-country">Destination country</Label><Select defaultValue="gb"><SelectTrigger id="destination-country" className="w-full"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="gb">United Kingdom</SelectItem><SelectItem value="us">United States</SelectItem><SelectItem value="de">Germany</SelectItem><SelectItem value="fr">France</SelectItem></SelectContent></Select></div>
                      <div className="grid grid-cols-[1fr_110px] gap-3"><div className="space-y-2"><Label htmlFor="iban">IBAN or account number</Label><Input id="iban" placeholder="GB00 0000 0000 0000 00" /></div><div className="space-y-2"><Label htmlFor="swift">SWIFT/BIC</Label><Input id="swift" placeholder="AAAA11" /></div></div>
                    </>
                  ) : null}
                  <div className="space-y-2"><Label htmlFor="amount">Amount</Label><Input id="amount" type="number" placeholder="0.00" /></div>
                </div>
              ) : null}
              <DialogFooter><Button variant="outline" onClick={closeAction}>Cancel</Button><Button onClick={completeMockAction}>{mode === "topup" ? "I’ve made the transfer" : "Review and send"}</Button></DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </FinanceShell>
  );
}
