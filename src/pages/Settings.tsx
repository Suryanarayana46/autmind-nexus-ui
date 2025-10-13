import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings as SettingsIcon, User, Bell, Shield, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export default function Settings() {
  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your account and application preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="card-elevated">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-google-blue/10 flex items-center justify-center mb-4">
                <User className="w-6 h-6 text-google-blue" />
              </div>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" placeholder="john@company.com" />
              </div>
              <Button className="w-full bg-gradient-primary">Save Changes</Button>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-google-green/10 flex items-center justify-center mb-4">
                <Bell className="w-6 h-6 text-google-green" />
              </div>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Configure your notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Email Notifications</Label>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <Label>AI Insights Alerts</Label>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <Label>Weekly Reports</Label>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-google-yellow/10 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-google-yellow" />
              </div>
              <CardTitle>Security</CardTitle>
              <CardDescription>Manage security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Two-Factor Auth</Label>
                <Switch />
              </div>
              <Separator />
              <Button variant="outline" className="w-full">
                Change Password
              </Button>
              <Button variant="outline" className="w-full">
                View Login History
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="card-elevated">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-google-red/10 flex items-center justify-center">
                <Database className="w-6 h-6 text-google-red" />
              </div>
              <div>
                <CardTitle>Cloud Integration</CardTitle>
                <CardDescription>Manage Google Cloud service connections</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">BigQuery</p>
                <p className="text-sm text-muted-foreground">Connected</p>
              </div>
              <div className="w-2 h-2 rounded-full bg-google-green animate-pulse" />
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Vertex AI</p>
                <p className="text-sm text-muted-foreground">Connected</p>
              </div>
              <div className="w-2 h-2 rounded-full bg-google-green animate-pulse" />
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Document AI</p>
                <p className="text-sm text-muted-foreground">Connected</p>
              </div>
              <div className="w-2 h-2 rounded-full bg-google-green animate-pulse" />
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
