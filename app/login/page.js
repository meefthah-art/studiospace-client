import { Suspense } from "react";
import LoginForm from "@/components/LoginForm";
import PageSpinner from "@/components/PageSpinner";

export const metadata = { title: "Login" };

export default function LoginPage() {
  return <Suspense fallback={<PageSpinner />}><LoginForm /></Suspense>;
}
