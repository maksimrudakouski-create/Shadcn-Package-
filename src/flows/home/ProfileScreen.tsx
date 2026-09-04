import { useRef, useState, type ChangeEvent } from "react";
import { Check, ChevronRight, CircleAlert, KeyRound, MapPin, Pencil, ShieldCheck, Smartphone, Trash2, X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogMedia, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { FinanceShell } from "@/shared/ui/FinanceShell";

const initialDetails = {
  email: "maksim.rudakouski@leverx.com",
  phone: "+1 555 012 3456",
  address: "21 Market Street, New York",
};

const detailFields = [
  { key: "email", label: "Email", type: "email", autoComplete: "email" },
  { key: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
  { key: "address", label: "Address", type: "text", autoComplete: "street-address" },
] as const;

export default function ProfileScreen() {
  const [deletionRequested, setDeletionRequested] = useState(false);
  const [details, setDetails] = useState(initialDetails);
  const [editingField, setEditingField] = useState<keyof typeof initialDetails | null>(null);
  const [draftValue, setDraftValue] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  function startEditing(field: keyof typeof initialDetails) {
    setEditingField(field);
    setDraftValue(details[field]);
  }

  function saveField(field: keyof typeof initialDetails) {
    console.log("Mock profile detail saved", { field, value: draftValue });
    setDetails({ ...details, [field]: draftValue });
    setEditingField(null);
  }

  function updateAvatar(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setAvatarUrl(URL.createObjectURL(file));
    console.log("Mock profile avatar selected", { name: file.name });
  }

  return (
    <FinanceShell>
      <div className="space-y-5">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Account and settings</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">Profile</h1>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <Card className="gap-0 py-0">
          <CardHeader className="pt-6">
            <CardTitle>Personal information</CardTitle>
            <CardDescription>Your verified account details</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-start gap-5 pt-6 pb-8 sm:flex-row sm:items-center">
            <div className="relative shrink-0">
              <Avatar className="size-16">
                {avatarUrl ? <AvatarImage src={avatarUrl} alt="Maksim Rudakouski" /> : null}
                <AvatarFallback className="text-lg">MR</AvatarFallback>
              </Avatar>
              <Input
                ref={avatarInputRef}
                type="file"
                accept="image/*"
                className="sr-only"
                aria-label="Choose profile photo"
                onChange={updateAvatar}
              />
              <Button
                variant="outline"
                size="icon-xs"
                className="absolute -right-1 -bottom-1 rounded-full bg-background shadow-sm"
                aria-label="Upload profile photo"
                onClick={() => avatarInputRef.current?.click()}
              >
                <Pencil />
              </Button>
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-semibold">Maksim Rudakouski</h2>
                <Badge variant="secondary"><Check /> Verified</Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">Customer since September 2026</p>
            </div>
          </CardContent>
          <CardContent className="space-y-4 pb-6">
            {detailFields.map((field, index) => {
              const editing = editingField === field.key;

              return (
                <div key={field.key}>
                  <div className="grid grid-cols-[80px_minmax(0,1fr)_auto] items-center gap-2">
                    <Label className="text-sm font-normal text-muted-foreground" htmlFor={`profile-${field.key}`}>
                      {field.label}
                    </Label>
                    {editing ? (
                    <Input
                      id={`profile-${field.key}`}
                      type={field.type}
                      autoComplete={field.autoComplete}
                      value={draftValue}
                      autoFocus
                      onChange={(event) => setDraftValue(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") saveField(field.key);
                        if (event.key === "Escape") setEditingField(null);
                      }}
                    />
                    ) : (
                      <p id={`profile-${field.key}`} className="truncate text-sm font-medium">{details[field.key]}</p>
                    )}
                    {editing ? (
                      <div className="flex items-center gap-1">
                        <Button size="icon-xs" aria-label={`Save ${field.label}`} onClick={() => saveField(field.key)}>
                          <Check />
                        </Button>
                        <Button variant="ghost" size="icon-xs" aria-label={`Cancel editing ${field.label}`} onClick={() => setEditingField(null)}>
                          <X />
                        </Button>
                      </div>
                    ) : (
                      <Button variant="ghost" size="sm" onClick={() => startEditing(field.key)}>
                        <Pencil />
                        Edit
                      </Button>
                    )}
                  </div>
                  {index < detailFields.length - 1 ? <Separator className="mt-4" /> : null}
                </div>
              );
            })}
          </CardContent>
          </Card>

          <Card>
          <CardHeader>
            <CardTitle>Account status</CardTitle>
            <CardDescription>Your setup is complete</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="ghost" className="h-auto w-full justify-start gap-3 px-3 py-3">
              <ShieldCheck className="size-5" />
              <span className="flex-1 text-left"><span className="block font-medium">Identity verification</span><span className="block text-xs text-muted-foreground">Verified</span></span>
              <ChevronRight />
            </Button>
            <Button variant="ghost" className="h-auto w-full justify-start gap-3 px-3 py-3">
              <KeyRound className="size-5" />
              <span className="flex-1 text-left"><span className="block font-medium">Security</span><span className="block text-xs text-muted-foreground">Two-step verification enabled</span></span>
              <ChevronRight />
            </Button>
            <Button variant="ghost" className="h-auto w-full justify-start gap-3 px-3 py-3">
              <MapPin className="size-5" />
              <span className="flex-1 text-left"><span className="block font-medium">Tax residency</span><span className="block text-xs text-muted-foreground">United States</span></span>
              <ChevronRight />
            </Button>
            <Button variant="ghost" className="h-auto w-full justify-start gap-3 px-3 py-3">
              <Smartphone className="size-5" />
              <span className="flex-1 text-left"><span className="block font-medium">Trusted devices</span><span className="block text-xs text-muted-foreground">2 active devices</span></span>
              <ChevronRight />
            </Button>
          </CardContent>
          </Card>
        </div>

        <Card className="gap-0 ring-destructive/20">
          <CardHeader><CardTitle>Delete account</CardTitle><CardDescription>Permanently delete your Northstar account and personal data.</CardDescription></CardHeader>
          <CardContent className="space-y-4">
            {deletionRequested ? (
              <Alert><Check /><AlertTitle>Account deletion requested</AlertTitle><AlertDescription>This is a prototype confirmation. In production, you would receive progress updates by push, email, and SMS.</AlertDescription></Alert>
            ) : (
              <>
                <p className="text-sm leading-6 text-muted-foreground">Deleting your account terminates all cards and disables financial actions. Withdraw any remaining balance before continuing. This action cannot be undone.</p>
                <AlertDialog>
                  <AlertDialogTrigger asChild><Button variant="destructive"><Trash2 /> Delete account</Button></AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader><AlertDialogMedia><CircleAlert /></AlertDialogMedia><AlertDialogTitle>Delete your account?</AlertDialogTitle><AlertDialogDescription>This permanently deletes your Northstar account and personal data. Your cards will be terminated and financial actions disabled. This action cannot be undone.</AlertDialogDescription></AlertDialogHeader>
                    <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction variant="destructive" onClick={() => { console.log("Mock account deletion requested"); setDeletionRequested(true); }}>Delete account</AlertDialogAction></AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </FinanceShell>
  );
}
