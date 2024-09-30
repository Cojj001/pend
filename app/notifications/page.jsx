import NavBar from "@/components/NavBar";
import Notifications from "@/components/Notifications";
import Sidebar from "@/components/Sidebar";
import React from "react";

const page = () => {
  return (
    <main className="container">
      <NavBar />
      <div className="flex-row">
        <Sidebar />
        <Notifications />
      </div>
    </main>
  );
};

export default page;
