import { ClerkProvider } from "@clerk/nextjs";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import "../styles/globals.css"; // Import global styles
import TaskForm from "@/components/TaskForm";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          <main>
            {" "}
            {children}
            {/* <NavBar />
            <div className="flex-row">
              <Sidebar />
            </div> */}
          </main>
        </ClerkProvider>
      </body>
    </html>
  );
}
