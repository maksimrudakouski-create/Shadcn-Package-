import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Spinner } from "@/components/ui/spinner";
import HomeScreen from "@/flows/home/HomeScreen";

export default function SignInLoadingScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      navigate({ to: "/home" });
    }, 2500);

    return () => window.clearTimeout(timeoutId);
  }, [navigate]);

  return (
    <>
      <div aria-hidden="true">
        <HomeScreen />
      </div>
      <main
        className="fixed inset-0 z-50 flex items-center justify-center bg-background/90"
        aria-live="polite"
      >
        <Spinner className="size-16" />
      </main>
    </>
  );
}
