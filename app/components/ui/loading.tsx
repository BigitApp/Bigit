import { Loader2 } from "lucide-react";
import { Cog } from "lucide-react";
import { CreditCard } from "lucide-react";

export function Loading() {
  return (
    <div className="flex items-center justify-center">
      <Loader2 className="animate-spin" />
      <span className="ml-2">Loading...</span>
    </div>
  );
}

export function Minting() {
  return (
    <div className="flex items-center justify-center">
      <Cog className="animate-spin text-green-800" />
      <span className="ml-2 text-green-800 font-bold">Mint...</span>
    </div>
  );
}

export function Buying() {
  return (
    <div className="flex items-center justify-center">
      <CreditCard className="animate-spin text-green-800" />
      <span className="ml-2 text-green-800 font-bold">Buy...</span>
    </div>
  );
}

export function LoadingPage() {
  return (
    <div className="w-full h-screen max-h-full flex items-center justify-center text-sm text-muted-foreground">
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Loading...
    </div>
  );
}
