import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Sparkles, MessageSquare, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function AIAssistant() {
  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">AI Assistant</h1>
          <p className="text-muted-foreground mt-1">
            Powered by Google Vertex AI for intelligent automation
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="card-elevated">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Smart Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Get AI-powered predictions and recommendations
              </p>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-google-green/10 flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-google-green" />
              </div>
              <CardTitle>Chat Assistant</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Natural language queries for your data
              </p>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-google-yellow/10 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-google-yellow" />
              </div>
              <CardTitle>Automation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Automate workflows with AI agents
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>Ask AI Assistant</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea 
              placeholder="Type your question here... (e.g., 'Analyze Q4 sales trends' or 'Predict next quarter revenue')"
              className="min-h-[120px]"
            />
            <Button className="bg-gradient-primary">
              <Bot className="w-4 h-4 mr-2" />
              Generate Response
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
