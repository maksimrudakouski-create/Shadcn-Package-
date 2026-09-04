// src/flows/routes.tsx
//
// DESIGNER-OWNED. The declarative route tree: structure and navigation only.
// There is deliberately no `loader` or `guard` field — there's nowhere to put
// logic, which is what keeps this folder safe to own.
//
// /app/router.tsx consumes this tree generically and builds the real router
// from it. Adding a screen = drop a component in src/flows/<name>/ and add an
// entry here. You never touch /app.
//
// Param syntax is `:id` (readable). The bridge in /app translates it to
// TanStack's `$id` — don't write `$id` here.

import type { ComponentType } from "react";
import EmailVerificationScreen from "./auth/EmailVerificationScreen";
import ForgotPasswordScreen from "./auth/ForgotPasswordScreen";
import PhoneVerificationScreen from "./auth/PhoneVerificationScreen";
import SignInScreen from "./auth/SignInScreen";
import SignInLoadingScreen from "./auth/SignInLoadingScreen";
import NavigationLoadingScreen from "./loading/NavigationLoadingScreen";
import SignUpScreen from "./auth/SignUpScreen";
import StepUpScreen from "./auth/StepUpScreen";
import CardsScreen from "./home/CardsScreen";
import CardDetailsScreen from "./home/CardDetailsScreen";
import HomeScreen from "./home/HomeScreen";
import NotificationsScreen from "./home/NotificationsScreen";
import ProfileScreen from "./home/ProfileScreen";
import KycIntroScreen from "./onboarding/KycIntroScreen";
import KycStatusScreen from "./onboarding/KycStatusScreen";
import TransactionDetailsScreen from "./transactions/TransactionDetailsScreen";
import TransactionsScreen from "./transactions/TransactionsScreen";

export type FlowRoute = {
  /** "/" | "loans" | ":id". Nested under the parent's path. */
  path: string;
  /** The screen. Omit on a node that exists purely to group children. */
  component?: ComponentType;
  children?: FlowRoute[];
  /**
   * Design annotation ONLY — grouping/labels for the DevBar and the Flow Map.
   * NOT enforcement: `meta.role: "admin"` restricts nothing.
   * Real role guards are dev's, in /app.
   */
  meta?: {
    role?: string;
    flow?: string;
    label?: string;
    /** Sample values so detail routes are clickable, e.g. { id: "1001" }. */
    sampleParams?: Record<string, string>;
  };
};

export const routes: FlowRoute[] = [
  {
    path: "/",
    component: SignUpScreen,
    meta: { role: "guest", flow: "Account access", label: "Start registration" },
  },
  {
    path: "auth",
    children: [
      {
        path: "sign-up",
        component: SignUpScreen,
        meta: { role: "guest", flow: "Account access", label: "Create account" },
      },
      {
        path: "verify-email",
        component: EmailVerificationScreen,
        meta: { role: "guest", flow: "Account access", label: "Verify email" },
      },
      {
        path: "verify-phone",
        component: PhoneVerificationScreen,
        meta: { role: "guest", flow: "Account access", label: "Verify phone" },
      },
      {
        path: "sign-in",
        component: SignInScreen,
        meta: { role: "guest", flow: "Account access", label: "Sign in" },
      },
      {
        path: "loading",
        component: SignInLoadingScreen,
        meta: { role: "guest", flow: "Account access", label: "Preparing home" },
      },
      {
        path: "forgot-password",
        component: ForgotPasswordScreen,
        meta: { role: "guest", flow: "Account access", label: "Reset password" },
      },
      {
        path: "step-up",
        component: StepUpScreen,
        meta: { role: "guest", flow: "Account access", label: "Secure sign-in" },
      },
    ],
  },
  {
    path: "onboarding",
    children: [
      {
        path: "kyc",
        component: KycIntroScreen,
        meta: { role: "user", flow: "Onboarding and KYC", label: "Prepare identity check" },
        children: [
          {
            path: ":status",
            component: KycStatusScreen,
            meta: {
              role: "user",
              flow: "Onboarding and KYC",
              label: "KYC status",
              sampleParams: { status: "pending" },
            },
          },
        ],
      },
    ],
  },
  {
    path: "loading",
    children: [
      {
        path: ":destination",
        component: NavigationLoadingScreen,
        meta: {
          role: "user",
          flow: "Profile and dashboard",
          label: "Preparing destination",
          sampleParams: { destination: "activity" },
        },
      },
    ],
  },
  {
    path: "home",
    component: HomeScreen,
    meta: { role: "user", flow: "Profile and dashboard", label: "Home dashboard" },
  },
  {
    path: "notifications",
    component: NotificationsScreen,
    meta: { role: "user", flow: "Profile and dashboard", label: "Notification center" },
  },
  {
    path: "cards",
    component: CardsScreen,
    meta: { role: "user", flow: "Profile and dashboard", label: "Cards" },
    children: [
      {
        path: ":id",
        component: CardDetailsScreen,
        meta: {
          role: "user",
          flow: "Card issuing and management",
          label: "Manage card",
          sampleParams: { id: "physical-7358" },
        },
      },
    ],
  },
  {
    path: "profile",
    component: ProfileScreen,
    meta: { role: "user", flow: "Profile and dashboard", label: "User profile" },
  },
  {
    path: "transactions",
    component: TransactionsScreen,
    meta: { role: "user", flow: "Transactions", label: "Transactions" },
    children: [
      {
        path: ":id",
        component: TransactionDetailsScreen,
        meta: { role: "user", flow: "Transactions", label: "Transaction details", sampleParams: { id: "tx-8012" } },
      },
    ],
  },
];
