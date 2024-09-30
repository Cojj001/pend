"use client"; // Ensure this component is a Client Component
import { useUser } from "@clerk/nextjs";
import DashboardPage from "./dashboard/page";
import { RedirectToSignIn } from "@clerk/nextjs";
import Landing from "@/components/Landing";
import Sidebar from "@/components/Sidebar";
import NavBar from "@/components/NavBar";
import "../styles/globals.css";

export default function HomePage() {
  const { isSignedIn } = useUser(); // Check if the user is signed in

  if (!isSignedIn) {
    return <Landing />;
  }

  return (
    <main className="container">
      
        <DashboardPage />
    </main>
  );
}
