import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DocumentUpload } from "@/components/dashboard/DocumentUpload";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Upload, Search, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Documents() {
  const [uploadedDoc, setUploadedDoc] = useState<string | null>(null);
  
  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Documents</h1>
          <p className="text-muted-foreground mt-1">
            Upload and process documents with Google Document AI
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DocumentUpload onUpload={setUploadedDoc} uploadedDoc={uploadedDoc} />

          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Recent Documents</CardTitle>
              <CardDescription>
                View and manage your uploaded documents
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search documents..." className="pl-10" />
              </div>

              <div className="space-y-2">
                {[
                  { name: "Q4_Financial_Report.pdf", size: "2.4 MB", date: "2 hours ago" },
                  { name: "Sales_Data_2024.pdf", size: "1.8 MB", date: "Yesterday" },
                  { name: "HR_Analytics.pdf", size: "3.1 MB", date: "3 days ago" },
                ].map((doc, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-lg bg-google-red/10 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-google-red" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{doc.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {doc.size} • {doc.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
