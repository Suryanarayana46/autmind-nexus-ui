import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { BarChart3, TrendingUp, PieChart as PieChartIcon } from "lucide-react";

const lineData = [
  { month: "Jan", revenue: 45000, expenses: 32000 },
  { month: "Feb", revenue: 52000, expenses: 35000 },
  { month: "Mar", revenue: 48000, expenses: 33000 },
  { month: "Apr", revenue: 61000, expenses: 38000 },
  { month: "May", revenue: 55000, expenses: 36000 },
  { month: "Jun", revenue: 67000, expenses: 40000 },
];

const barData = [
  { category: "Sales", value: 4500 },
  { category: "Marketing", value: 3200 },
  { category: "HR", value: 2800 },
  { category: "Operations", value: 3900 },
  { category: "IT", value: 2400 },
];

const pieData = [
  { name: "Product A", value: 35 },
  { name: "Product B", value: 25 },
  { name: "Product C", value: 20 },
  { name: "Product D", value: 20 },
];

const COLORS = ["hsl(217 89% 61%)", "hsl(135 57% 42%)", "hsl(43 97% 51%)", "hsl(4 82% 57%)"];

export const ChartsSection = () => {
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
