import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, TrendingUp, BarChart3, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Reports() {
  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Reports</h1>
            <p className="text-muted-foreground mt-1">
              Generate and view business intelligence reports
            </p>
          </div>
          <Button className="bg-gradient-primary">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="card-elevated">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-google-blue/10 flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-google-blue" />
              </div>
              <CardTitle>Sales Reports</CardTitle>
              <CardDescription>
                Comprehensive sales analytics and forecasting
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">View Details</Button>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-google-green/10 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-google-green" />
              </div>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>
                KPI tracking and performance analytics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">View Details</Button>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-google-yellow/10 flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-google-yellow" />
              </div>
              <CardTitle>Custom Reports</CardTitle>
              <CardDescription>
                Build and schedule custom analytics reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">View Details</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
