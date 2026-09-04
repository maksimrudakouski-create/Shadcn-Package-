import { useState } from "react";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Check, CircleAlert, CreditCard, Eye, EyeOff, LockKeyhole, RotateCcw, Smartphone, Snowflake, Trash2, Truck, WalletCards } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogMedia, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Toaster } from "@/components/ui/sonner";
import { Switch } from "@/components/ui/switch";
import { FinanceShell } from "@/shared/ui/FinanceShell";
import { toast } from "sonner";

const cardProfiles = {
  "virtual-4821": { name: "Everyday", type: "Virtual", artwork: "/card-art/everyday-orbits.jpg", icon: Smartphone },
  "physical-7358": { name: "Travel", type: "Physical", artwork: "/card-art/travel-horizon.jpg", icon: CreditCard },
  "virtual-1094": { name: "Subscriptions", type: "Virtual", artwork: "/card-art/subscriptions-ribbons.jpg", icon: Smartphone },
} as const;

export default function CardDetailsScreen() {
  const params = useParams({ strict: false });
  const id = String(params.id ?? "virtual-4821");
  const isPhysical = id.startsWith("physical");
  const last4 = id.split("-").at(-1) ?? "4821";
  const cardProfile = cardProfiles[id as keyof typeof cardProfiles] ?? {
    name: isPhysical ? "Physical" : "Virtual",
    type: isPhysical ? "Physical" : "Virtual",
    artwork: isPhysical ? "/card-art/travel-horizon.jpg" : "/card-art/everyday-orbits.jpg",
    icon: isPhysical ? CreditCard : Smartphone,
  };
  const CardIcon = cardProfile.icon;
  const [frozen, setFrozen] = useState(id === "virtual-1094");
  const [active, setActive] = useState(!isPhysical);
  const [activationOpen, setActivationOpen] = useState(false);
  const [secureOpen, setSecureOpen] = useState(false);
  const [showNumbers, setShowNumbers] = useState(false);
  const [activationCode, setActivationCode] = useState("");
  const [monthlyLimit, setMonthlyLimit] = useState([2500]);
  const [appliedMonthlyLimit, setAppliedMonthlyLimit] = useState(2500);
  const [replacementOrdered, setReplacementOrdered] = useState(false);
  const [terminated, setTerminated] = useState(false);

  function activate() {
    console.log("Mock physical card activation", { last4: activationCode });
    setActive(true);
    setActivationOpen(false);
  }

  function confirmControlChange(control: string, enabled: boolean) {
    console.log("Mock card control updated", { control, enabled });
    toast.success("Changes applied", {
      description: `${control} ${enabled ? "enabled" : "disabled"}.`,
    });
  }

  function applyMonthlyLimit() {
    console.log("Mock monthly limit updated", { monthlyLimit: monthlyLimit[0] });
    setAppliedMonthlyLimit(monthlyLimit[0]);
    toast.success("Changes applied", {
      description: `Monthly limit set to $${monthlyLimit[0].toLocaleString()}.`,
    });
  }

  return (
    <FinanceShell>
      <div>
        <Button asChild variant="ghost" className="mb-5 -ml-2"><Link to="/cards"><ArrowLeft /> All cards</Link></Button>
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-5">
            <div className="relative overflow-hidden rounded-2xl p-6 text-balance-card-foreground shadow-xl sm:p-8">
              <img src={cardProfile.artwork} alt="" className="absolute inset-0 size-full object-cover" />
              <div className="absolute inset-0 bg-card-art-overlay" />
              <div className="relative flex items-center justify-between"><CardIcon className="size-7" /><span className="text-sm font-semibold tracking-widest">NORTHSTAR</span></div>
              <p className="relative mt-20 font-mono text-xl tracking-[0.18em]">{showNumbers ? `5412  8410  3267  ${last4}` : `••••  ••••  ••••  ${last4}`}</p>
              <div className="relative mt-6 flex items-end justify-between">
                <div><p className="text-xs text-balance-card-foreground/60">CARD HOLDER</p><p className="mt-1 font-medium">MAKSIM RUDAKOUSKI</p></div>
                <div className="text-right"><p className="text-xs text-balance-card-foreground/60">EXPIRES</p><p className="mt-1 font-medium">{showNumbers ? "09/30 · 724" : "••/•• · •••"}</p></div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between gap-3">
                  <div><CardTitle>{cardProfile.name} card</CardTitle><CardDescription>{cardProfile.type} · •{last4}</CardDescription></div>
                  <Badge variant={terminated ? "destructive" : frozen ? "outline" : "secondary"}>{terminated ? "Terminated" : frozen ? "Frozen" : active ? "Active" : "Activation required"}</Badge>
                </div>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-2">
                {!active && !terminated ? <Button className="col-span-2" onClick={() => setActivationOpen(true)}><LockKeyhole /> Activate card</Button> : null}
                <Button variant="outline" disabled={terminated} onClick={() => setSecureOpen(true)}><Eye /> View details</Button>
                <Button variant="outline" disabled={terminated} onClick={() => setFrozen((value) => !value)}><Snowflake /> {frozen ? "Unfreeze" : "Freeze"}</Button>
              </CardContent>
            </Card>

            {isPhysical && !active && !terminated ? (
              <Card>
                <CardHeader><CardTitle className="flex items-center gap-2"><Truck className="size-4" /> Delivery</CardTitle><CardDescription>Estimated arrival September 8</CardDescription></CardHeader>
                <CardContent className="space-y-3">
                  <Progress value={68} className="h-1.5" />
                  <div className="flex justify-between text-xs text-muted-foreground"><span>Shipped</span><span>In transit</span><span>Delivered</span></div>
                </CardContent>
              </Card>
            ) : null}
          </div>

          <div className="space-y-5">
            <Card>
              <CardHeader><CardTitle>Spending controls</CardTitle><CardDescription>Set limits and choose where this card can be used.</CardDescription></CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="mb-3 flex items-center justify-between"><Label>Monthly limit</Label><span className="text-sm font-semibold tabular-nums">${monthlyLimit[0].toLocaleString()}</span></div>
                  <Slider min={100} max={10000} step={100} value={monthlyLimit} onValueChange={setMonthlyLimit} />
                  <div className="mt-2 flex justify-between text-xs text-muted-foreground"><span>$100</span><span>$10,000</span></div>
                  <Button variant="secondary" className="mt-3 w-full" disabled={monthlyLimit[0] === appliedMonthlyLimit} onClick={applyMonthlyLimit}>Apply Monthly Limit</Button>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4"><div><p className="font-medium">Online purchases</p><p className="text-sm text-muted-foreground">Use this card on websites and apps</p></div><Switch defaultChecked onCheckedChange={(checked) => confirmControlChange("Online purchases", checked)} /></div>
                  <div className="flex items-center justify-between gap-4"><div><p className="font-medium">ATM withdrawals</p><p className="text-sm text-muted-foreground">Cash access at supported ATMs</p></div><Switch defaultChecked={isPhysical} onCheckedChange={(checked) => confirmControlChange("ATM withdrawals", checked)} /></div>
                  <div className="flex items-center justify-between gap-4"><div><p className="font-medium">International payments</p><p className="text-sm text-muted-foreground">Payments outside your home country</p></div><Switch onCheckedChange={(checked) => confirmControlChange("International payments", checked)} /></div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Card lifecycle</CardTitle><CardDescription>Replace this card or permanently stop it from being used.</CardDescription></CardHeader>
              <CardContent className="space-y-3">
                {replacementOrdered ? <Alert><RotateCcw /><AlertTitle>Replacement ordered</AlertTitle><AlertDescription>Your current card stays active until the replacement is activated.</AlertDescription></Alert> : null}
                {terminated ? <Alert variant="destructive"><CircleAlert /><AlertTitle>Card terminated</AlertTitle><AlertDescription>This card is inactive and can no longer be used for transactions.</AlertDescription></Alert> : null}
                <div className="grid gap-2 sm:grid-cols-2">
                  <Button variant="outline" disabled={replacementOrdered || terminated} onClick={() => { console.log("Mock card reissue requested"); setReplacementOrdered(true); }}><RotateCcw /> Replace card</Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild><Button variant="destructive" disabled={terminated}><Trash2 /> Terminate card</Button></AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader><AlertDialogMedia><CircleAlert /></AlertDialogMedia><AlertDialogTitle>Terminate this card?</AlertDialogTitle><AlertDialogDescription>This action is permanent. The card will become inactive and future payments will be declined.</AlertDialogDescription></AlertDialogHeader>
                      <AlertDialogFooter><AlertDialogCancel>Keep card</AlertDialogCancel><AlertDialogAction variant="destructive" onClick={() => { console.log("Mock card terminated"); setTerminated(true); }}>Terminate card</AlertDialogAction></AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><WalletCards className="size-4" /> Mobile wallets</CardTitle><CardDescription>Add this card for faster contactless payments.</CardDescription></CardHeader>
              <CardContent className="grid gap-2 sm:grid-cols-2">
                <Button variant="outline" onClick={() => console.log("Mock Apple Pay provisioning")}>Add to Apple Pay</Button>
                <Button variant="outline" onClick={() => console.log("Mock Google Pay provisioning")}>Add to Google Pay</Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3"><Smartphone className="size-5" /><div><p className="font-medium">Transaction alerts</p><p className="text-sm text-muted-foreground">Push notification for every purchase</p></div></div>
                <Switch defaultChecked onCheckedChange={(checked) => confirmControlChange("Transaction alerts", checked)} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Toaster position="bottom-right" />

      <Dialog open={activationOpen} onOpenChange={setActivationOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Activate physical card</DialogTitle><DialogDescription>Enter the last four digits printed on your card to confirm it arrived safely.</DialogDescription></DialogHeader>
          <div className="space-y-2 py-2"><Label htmlFor="activation-code">Last 4 digits</Label><Input id="activation-code" inputMode="numeric" maxLength={4} placeholder="0000" value={activationCode} onChange={(event) => setActivationCode(event.target.value.replace(/\D/g, ""))} /></div>
          <DialogFooter><Button variant="outline" onClick={() => setActivationOpen(false)}>Cancel</Button><Button disabled={activationCode.length !== 4} onClick={activate}>Activate card</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={secureOpen} onOpenChange={(open) => { setSecureOpen(open); if (!open) setShowNumbers(false); }}>
        <DialogContent>
          <DialogHeader><DialogTitle>Secure card details</DialogTitle><DialogDescription>In production, sensitive card data is retrieved through a PCI-certified SDK using a short-lived token.</DialogDescription></DialogHeader>
          <Alert><LockKeyhole /><AlertTitle>Private information</AlertTitle><AlertDescription>Make sure nobody else can see your screen before revealing these details.</AlertDescription></Alert>
          <Button onClick={() => setShowNumbers((value) => !value)}>{showNumbers ? <EyeOff /> : <Eye />}{showNumbers ? "Hide card details" : "Reveal card details"}</Button>
          {showNumbers ? <div className="rounded-xl bg-muted p-4 font-mono"><p>5412 8410 3267 {last4}</p><div className="mt-2 flex justify-between"><span>09/30</span><span>CVV 724</span></div></div> : null}
          {showNumbers ? <div className="flex items-center gap-2 text-xs text-muted-foreground"><Check className="size-4" /> Mock data automatically hides when this dialog closes.</div> : null}
        </DialogContent>
      </Dialog>
    </FinanceShell>
  );
}
