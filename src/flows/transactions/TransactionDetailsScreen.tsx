import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Check, CreditCard, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FinanceShell } from "@/shared/ui/FinanceShell";

export default function TransactionDetailsScreen() {
  const params = useParams({ strict: false });
  const id = String(params.id ?? "tx-8012");
  const processing = id === "tx-8008";

  return (
    <FinanceShell>
      <div className="mx-auto max-w-2xl">
        <Button asChild variant="ghost" className="mb-5 -ml-2"><Link to="/transactions"><ArrowLeft /> Transactions</Link></Button>
        <Card>
          <CardHeader className="items-center text-center">
            <span className="mb-2 flex size-14 items-center justify-center rounded-full bg-secondary"><CreditCard className="size-6" /></span>
            <CardDescription>{processing ? "External bank payout" : "Card payment"}</CardDescription>
            <CardTitle className="text-3xl">{processing ? "− $750.00" : "− $8.40"}</CardTitle>
            <Badge variant={processing ? "secondary" : "outline"}>{processing ? "Processing" : "Completed"}</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <Separator />
            <div className="grid grid-cols-2 gap-y-4 text-sm">
              <span className="text-muted-foreground">Transaction ID</span><span className="text-right font-mono">{id.toUpperCase()}</span>
              <span className="text-muted-foreground">Date</span><span className="text-right">September 4, 2026</span>
              <span className="text-muted-foreground">Status</span><span className="flex items-center justify-end gap-1.5"><Check className="size-4" />{processing ? "Processing" : "Completed"}</span>
              <span className="text-muted-foreground">Account</span><span className="text-right">Personal · •4821</span>
              <span className="text-muted-foreground">Fee</span><span className="text-right">$0.00</span>
            </div>
            <Button variant="outline" className="w-full" onClick={() => console.log("Mock transaction receipt download", { id })}><Download /> Download receipt</Button>
          </CardContent>
        </Card>
      </div>
    </FinanceShell>
  );
}
