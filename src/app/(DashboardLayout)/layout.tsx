"use client";
import DashboardNav from "@/components/page/dashboard/DashboardNav";
import DashHeader from "@/components/page/dashboard/DashHeader";
import AdminLayout from "@/utils/layouts/AdminLayout";
import { useEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const localstrOpen = localStorage.getItem("isOpenNav");
  const [isSidebarOpen, setIsSidebarOpen] = useState(localstrOpen === "true");

  // Effect to initialize sidebar state from local storage
  useEffect(() => {
    // If no value exists in local storage, set it to true by default
    if (localstrOpen === null) {
      localStorage.setItem("isOpenNav", "true");
      setIsSidebarOpen(true); // Default state
    } else {
      // Set the sidebar state based on local storage value
      setIsSidebarOpen(localstrOpen === "true"); // Convert string to boolean
    }
  }, [localstrOpen]); // Run once on component mount

  // Function to toggle sidebar open state and update local storage

  return (
    <AdminLayout>
      <div
        
        className="flex min-h-screen bg-gray-100"
      >
        <DashboardNav isOpen={isSidebarOpen} />
        <div className="flex flex-col flex-1 overflow-hidden">
          <DashHeader
            setIsSidebarOpen={setIsSidebarOpen}
            isSidebarOpen={isSidebarOpen}
          />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-4">
            {children}
          </main>
        </div>
      </div>
    </AdminLayout>
  );
}
