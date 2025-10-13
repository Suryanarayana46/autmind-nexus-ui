import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  Bot,
  Upload,
  Settings,
  Brain,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
}

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: FileText, label: "Reports", path: "/reports" },
  { icon: Bot, label: "AI Assistant", path: "/ai-assistant" },
  { icon: Upload, label: "Documents", path: "/documents" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export const Sidebar = ({ collapsed, onCollapse }: SidebarProps) => {
  return (
    <aside
      className={cn(
        "bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col relative",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
        <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
          <Brain className="w-6 h-6 text-white" />
        </div>
        {!collapsed && (
          <span className="ml-3 font-bold text-lg text-sidebar-foreground">
            AutoMind
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 space-y-2 px-3">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center px-3 py-3 rounded-lg transition-all duration-200 group",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              )
            }
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && (
              <span className="ml-3 font-medium">{item.label}</span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Collapse Button */}
      <Button
        onClick={() => onCollapse(!collapsed)}
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-card border border-border shadow-md hover:bg-accent z-10"
      >
        <ChevronLeft
          className={cn(
            "w-4 h-4 transition-transform duration-300",
            collapsed && "rotate-180"
          )}
        />
      </Button>
    </aside>
  );
};
