import DashboardPage from '@/components/Dashboard';
import NavBar from '@/components/NavBar';
import Sidebar from '@/components/Sidebar';
import React from 'react'

const page = () => {
  return (
    <main className="container">
      <NavBar />
      <div className="flex-row">
        <Sidebar />
        <DashboardPage />
      </div>
    </main>
  );
}

export default page
