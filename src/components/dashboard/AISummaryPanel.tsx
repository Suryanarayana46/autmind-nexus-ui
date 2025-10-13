import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";

export const AISummaryPanel = () => {
  const insights = [
    {
      type: "success",
      icon: CheckCircle,
      title: "Revenue forecast looking strong",
      description: "AI predicts 15% growth in Q4 based on current trends",
    },
    {
      type: "warning",
      icon: AlertCircle,
      title: "Employee satisfaction dip detected",
      description: "HR metrics show 8% decrease, recommend immediate action",
    },
    {
      type: "info",
      icon: TrendingUp,
      title: "Sales velocity increasing",
      description: "Average deal closure time reduced by 3.2 days",
    },
  ];

  return (
    <Card className="h-full border-border/50 shadow-md">
      <CardHeader className="border-b border-border/50 bg-gradient-to-r from-primary/5 to-transparent">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span>AI Insights</span>
          </CardTitle>
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
            Powered by Vertex AI
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="p-4 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors group"
          >
            <div className="flex items-start space-x-3">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  insight.type === "success"
                    ? "bg-success/10 text-success"
                    : insight.type === "warning"
                    ? "bg-warning/10 text-warning"
                    : "bg-primary/10 text-primary"
                }`}
              >
                <insight.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {insight.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {insight.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
