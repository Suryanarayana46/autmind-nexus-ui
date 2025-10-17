import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Sparkles, MessageSquare, Zap, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import { useBusinessMetrics } from "@/hooks/useBusinessMetrics";

type Message = { role: "user" | "assistant"; content: string };

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { data: metrics } = useBusinessMetrics();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const streamChat = async (userMessage: string) => {
    try {
      setIsLoading(true);
      
      const newUserMessage: Message = { role: "user", content: userMessage };
      setMessages(prev => [...prev, newUserMessage]);

      // Add context about uploaded document if available
      let contextualMessage = userMessage;
      if (metrics?.extracted_data) {
        const context = `\n\n[Context: User has uploaded a document. Current metrics: Revenue: $${(metrics.total_revenue / 1000000).toFixed(1)}M, Users: ${metrics.active_users.toLocaleString()}, Sales Growth: ${metrics.sales_growth}%, System Health: ${metrics.system_health}%]`;
        contextualMessage = userMessage + context;
      }

      const { data: session } = await supabase.auth.getSession();
      if (!session.session) {
        throw new Error('Not authenticated');
      }

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.session.access_token}`,
        },
        body: JSON.stringify({
          messages: [...messages, newUserMessage].map(m => ({
            role: m.role,
            content: m.role === 'user' && m === newUserMessage ? contextualMessage : m.content
          }))
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || 'Failed to get response');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let accumulatedContent = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') continue;

              try {
                const parsed = JSON.parse(data);
                const content = parsed.choices?.[0]?.delta?.content;
                
                if (content) {
                  accumulatedContent += content;
                  setMessages(prev => {
                    const newMessages = [...prev];
                    const lastMessage = newMessages[newMessages.length - 1];
                    
                    if (lastMessage?.role === 'assistant') {
                      newMessages[newMessages.length - 1] = {
                        role: 'assistant',
                        content: accumulatedContent
                      };
                    } else {
                      newMessages.push({
                        role: 'assistant',
                        content: accumulatedContent
                      });
                    }
                    
                    return newMessages;
                  });
                }
              } catch (e) {
                console.error('Error parsing SSE data:', e);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    streamChat(input);
    setInput("");
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">AI Assistant</h1>
          <p className="text-muted-foreground mt-1">
            {metrics ? 'Powered by AI with insights from your uploaded documents' : 'Powered by Google Gemini AI for intelligent automation'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="card-elevated shadow-3d">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Smart Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Get AI-powered predictions and recommendations from your data
              </p>
            </CardContent>
          </Card>

          <Card className="card-elevated shadow-3d">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-google-green/10 flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-google-green" />
              </div>
              <CardTitle>Chat Assistant</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Natural language queries about your business metrics
              </p>
            </CardContent>
          </Card>

          <Card className="card-elevated shadow-3d">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-google-yellow/10 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-google-yellow" />
              </div>
              <CardTitle>Document Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Upload files to get instant AI-powered insights
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="card-elevated shadow-3d">
          <CardHeader>
            <CardTitle>Chat with AI Assistant</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ScrollArea ref={scrollRef} className="h-[400px] pr-4">
              <div className="space-y-4">
                {messages.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    <Bot className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="font-medium mb-2">Start a conversation</p>
                    <p className="text-sm">Ask about your business metrics, trends, or upload a document for analysis</p>
                  </div>
                ) : (
                  messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-4 shadow-md ${
                          msg.role === "user"
                            ? "bg-gradient-primary text-white"
                            : "bg-muted"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
            
            <div className="flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Ask me anything... (e.g., 'Analyze our revenue trends' or 'What insights can you provide?')"
                className="min-h-[100px]"
                disabled={isLoading}
              />
            </div>
            
            <Button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-gradient-primary w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Bot className="w-4 h-4 mr-2" />
                  Send Message
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}