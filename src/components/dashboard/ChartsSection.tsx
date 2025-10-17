import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, BarChart3, PieChart as PieChartIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BusinessMetrics } from "@/hooks/useBusinessMetrics";

const COLORS = ['#6366F1', '#10B981', '#F59E0B', '#EF4444'];

interface ChartsSectionProps {
  metrics: BusinessMetrics | null | undefined;
}

export const ChartsSection = ({ metrics }: ChartsSectionProps) => {
  const lineData = metrics?.extracted_data?.monthlyData || [
    { name: "Jan", revenue: 400000, expenses: 240000 },
    { name: "Feb", revenue: 300000, expenses: 220000 },
    { name: "Mar", revenue: 450000, expenses: 280000 },
    { name: "Apr", revenue: 380000, expenses: 260000 },
    { name: "May", revenue: 520000, expenses: 300000 },
    { name: "Jun", revenue: 480000, expenses: 290000 },
  ];

  const barData = metrics?.extracted_data?.departmentData || [
    { name: "Sales", value: 85 },
    { name: "Marketing", value: 72 },
    { name: "Engineering", value: 95 },
    { name: "Support", value: 88 },
  ];

  const pieData = metrics?.extracted_data?.productData || [
    { name: "Product A", value: 35 },
    { name: "Product B", value: 25 },
    { name: "Product C", value: 20 },
    { name: "Product D", value: 20 },
  ];
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Analytics Overview</h2>
        <p className="text-muted-foreground">Data powered by BigQuery</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <Card className="border-border/50 shadow-md">
          <CardHeader className="border-b border-border/50">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span>Revenue Trends</span>
              </CardTitle>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                BigQuery
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.5rem",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(217 89% 61%)"
                  strokeWidth={3}
                  dot={{ fill: "hsl(217 89% 61%)", r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke="hsl(4 82% 57%)"
                  strokeWidth={3}
                  dot={{ fill: "hsl(4 82% 57%)", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bar Chart */}
        <Card className="border-border/50 shadow-md">
          <CardHeader className="border-b border-border/50">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-accent" />
                <span>Department Performance</span>
              </CardTitle>
              <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30">
                BigQuery
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="category" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.5rem",
                  }}
                />
                <Bar dataKey="value" fill="hsl(135 57% 42%)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Pie Chart */}
      <Card className="border-border/50 shadow-md">
        <CardHeader className="border-b border-border/50">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <PieChartIcon className="w-5 h-5 text-warning" />
              <span>Product Distribution</span>
            </CardTitle>
            <Badge variant="outline" className="bg-warning/10 text-warning border-warning/30">
              BigQuery
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.5rem",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
