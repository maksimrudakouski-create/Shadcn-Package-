import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CreditCard, Plus, Smartphone, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FinanceShell } from "@/shared/ui/FinanceShell";

type CardKind = "virtual" | "physical";

const cardArtworks = [
  "/card-art/everyday-orbits.jpg",
  "/card-art/travel-horizon.jpg",
  "/card-art/subscriptions-ribbons.jpg",
] as const;

const initialCards = [
  { id: "virtual-4821", name: "Everyday", type: "Virtual", last4: "4821", status: "Active", icon: Smartphone, artwork: cardArtworks[0] },
  { id: "physical-7358", name: "Travel", type: "Physical", last4: "7358", status: "Activate", icon: CreditCard, artwork: cardArtworks[1] },
  { id: "virtual-1094", name: "Subscriptions", type: "Virtual", last4: "1094", status: "Frozen", icon: Smartphone, artwork: cardArtworks[2] },
];

export default function CardsScreen() {
  const [open, setOpen] = useState(false);
  const [kind, setKind] = useState<CardKind>("virtual");
  const [cards, setCards] = useState(initialCards);

  function issueCard() {
    const last4 = kind === "virtual" ? "6207" : "8842";
    setCards((current) => [
      ...current,
      {
        id: `${kind}-${last4}`,
        name: kind === "virtual" ? "New virtual card" : "New physical card",
        type: kind === "virtual" ? "Virtual" : "Physical",
        last4,
        status: kind === "virtual" ? "Active" : "Ordered",
        icon: kind === "virtual" ? Smartphone : CreditCard,
        artwork: cardArtworks[current.length % cardArtworks.length],
      },
    ]);
    console.log("Mock card issued", { kind });
    setOpen(false);
  }

  return (
    <FinanceShell>
      <div>
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Manage your spending</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight">Your cards</h1>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button><Plus /> New card</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Issue a new card</DialogTitle>
                <DialogDescription>Choose a card type. You can issue more cards whenever you need them.</DialogDescription>
              </DialogHeader>
              <RadioGroup value={kind} onValueChange={(value) => setKind(value as CardKind)} className="py-2">
                <Label htmlFor="virtual-card" className="flex cursor-pointer items-start gap-3 rounded-xl border p-4 has-[[data-checked]]:border-primary">
                  <RadioGroupItem id="virtual-card" value="virtual" className="mt-0.5" />
                  <Smartphone className="size-5" />
                  <span><span className="block font-semibold">Virtual card</span><span className="mt-1 block text-sm font-normal text-muted-foreground">Ready instantly for online purchases and wallets.</span></span>
                </Label>
                <Label htmlFor="physical-card" className="flex cursor-pointer items-start gap-3 rounded-xl border p-4 has-[[data-checked]]:border-primary">
                  <RadioGroupItem id="physical-card" value="physical" className="mt-0.5" />
                  <Truck className="size-5" />
                  <span><span className="block font-semibold">Physical card</span><span className="mt-1 block text-sm font-normal text-muted-foreground">Delivered to your verified home address.</span></span>
                </Label>
              </RadioGroup>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={issueCard}>Issue {kind} card</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Card key={card.id} className="gap-0 py-0 transition-shadow hover:shadow-md">
                <CardContent className="p-0">
                  <Link
                    to={`/cards/${card.id}`}
                    className="relative block overflow-hidden rounded-t-xl p-5 text-balance-card-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring"
                    aria-label={`Open ${card.name} card details`}
                  >
                    <img src={card.artwork} alt="" className="absolute inset-0 size-full object-cover" />
                    <div className="absolute inset-0 bg-card-art-overlay" />
                    <div className="relative flex items-center justify-between"><Icon className="size-5" /><span className="text-xs font-semibold tracking-widest">NORTHSTAR</span></div>
                    <p className="relative mt-12 font-mono text-lg tracking-[0.16em]">••••  ••••  ••••  {card.last4}</p>
                  </Link>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div><p className="font-semibold">{card.name}</p><p className="mt-0.5 text-sm text-muted-foreground">{card.type} · •{card.last4}</p></div>
                      <Badge variant={card.status === "Frozen" ? "outline" : "secondary"}>{card.status}</Badge>
                    </div>
                    <Button asChild variant="ghost" className="mt-5 w-full justify-start px-0"><Link to={`/cards/${card.id}`}>Manage card <ArrowRight /></Link></Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-6 rounded-xl border bg-card p-4 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Need another card?</span> Issue virtual cards instantly or order physical cards for delivery.
        </div>
      </div>
    </FinanceShell>
  );
}
