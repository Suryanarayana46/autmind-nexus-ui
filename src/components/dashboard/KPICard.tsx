import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: LucideIcon;
  gradient: string;
}

export const KPICard = ({
  title,
  value,
  change,
  trend,
  icon: Icon,
  gradient,
}: KPICardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 overflow-hidden relative">
      <div className={cn("absolute inset-0 opacity-5 bg-" + gradient)} />
      <CardContent className="p-6 relative">
        <div className="flex items-start justify-between mb-4">
          <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center bg-" + gradient)}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="flex items-center space-x-1">
            {trend === "up" ? (
              <TrendingUp className="w-4 h-4 text-success" />
            ) : (
              <TrendingDown className="w-4 h-4 text-destructive" />
            )}
            <span
              className={cn(
                "text-sm font-semibold",
                trend === "up" ? "text-success" : "text-destructive"
              )}
            >
              {change}
            </span>
          </div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
};
