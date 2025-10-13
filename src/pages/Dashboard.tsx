import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { KPICard } from "@/components/dashboard/KPICard";
import { AISummaryPanel } from "@/components/dashboard/AISummaryPanel";
import { DocumentUpload } from "@/components/dashboard/DocumentUpload";
import { ChartsSection } from "@/components/dashboard/ChartsSection";
import { TrendingUp, Users, Activity, DollarSign } from "lucide-react";

const Dashboard = () => {
  const [uploadedDoc, setUploadedDoc] = useState<string | null>(null);

  const kpiData = [
    {
      title: "Total Revenue",
      value: "$2.4M",
      change: "+12.5%",
      trend: "up" as const,
      icon: DollarSign,
      gradient: "gradient-primary",
    },
    {
      title: "Active Users",
      value: "8,492",
      change: "+8.2%",
      trend: "up" as const,
      icon: Users,
      gradient: "gradient-success",
    },
    {
      title: "Sales Growth",
      value: "24.8%",
      change: "+4.3%",
      trend: "up" as const,
      icon: TrendingUp,
      gradient: "gradient-warning",
    },
    {
      title: "System Health",
      value: "98.5%",
      change: "-0.2%",
      trend: "down" as const,
      icon: Activity,
      gradient: "gradient-danger",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's your enterprise analytics overview.
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          {kpiData.map((kpi, index) => (
            <KPICard key={index} {...kpi} />
          ))}
        </div>

        {/* AI Summary and Document Upload */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <AISummaryPanel />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <DocumentUpload onUpload={setUploadedDoc} uploadedDoc={uploadedDoc} />
          </div>
        </div>

        {/* Charts Section */}
        <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <ChartsSection />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
