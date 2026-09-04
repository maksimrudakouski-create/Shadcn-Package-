import { useEffect } from "react";
import { useNavigate, useParams } from "@tanstack/react-router";
import { Spinner } from "@/components/ui/spinner";
import CardsScreen from "@/flows/home/CardsScreen";
import HomeScreen from "@/flows/home/HomeScreen";
import ProfileScreen from "@/flows/home/ProfileScreen";
import TransactionsScreen from "@/flows/transactions/TransactionsScreen";

const destinations = {
  home: { component: HomeScreen, to: "/home" },
  activity: { component: TransactionsScreen, to: "/transactions" },
  cards: { component: CardsScreen, to: "/cards" },
  profile: { component: ProfileScreen, to: "/profile" },
} as const;

type Destination = keyof typeof destinations;

export default function NavigationLoadingScreen() {
  const navigate = useNavigate();
  const { destination } = useParams({ strict: false }) as { destination?: Destination };
  const currentDestination = destinations[destination ?? "activity"] ?? destinations.activity;
  const DestinationScreen = currentDestination.component;

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      navigate({ to: currentDestination.to });
    }, 2500);

    return () => window.clearTimeout(timeoutId);
  }, [currentDestination.to, navigate]);

  return (
    <>
      <div aria-hidden="true">
        <DestinationScreen />
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
