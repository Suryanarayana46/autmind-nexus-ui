import { ReactNode, useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { FloatingChatbot } from "@/components/dashboard/FloatingChatbot";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar collapsed={sidebarCollapsed} onCollapse={setSidebarCollapsed} />
      
      <div className="flex-1 flex flex-col">
        <Header />
        
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>

      <FloatingChatbot />
    </div>
  );
};
