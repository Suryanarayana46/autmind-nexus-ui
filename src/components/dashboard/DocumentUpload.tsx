import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, X } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface DocumentUploadProps {
  onUpload: (doc: string) => void;
  uploadedDoc: string | null;
}

export const DocumentUpload = ({ onUpload, uploadedDoc }: DocumentUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileUpload = (file: File) => {
    const validTypes = [
      "application/pdf",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];
    
    if (validTypes.includes(file.type)) {
      onUpload(file.name);
      toast({
        title: "Document uploaded",
        description: "AI is processing your document...",
      });
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload PDF, Excel (.xls, .xlsx), or Word (.doc, .docx) files",
        variant: "destructive",
      });
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  return (
    <Card className="h-full border-border/50 shadow-md">
      <CardHeader className="border-b border-border/50 bg-gradient-to-r from-accent/5 to-transparent">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Upload className="w-5 h-5 text-accent" />
            <span>Document AI</span>
          </CardTitle>
          <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30">
            Powered by Document AI
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {!uploadedDoc ? (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
              isDragging
                ? "border-accent bg-accent/10"
                : "border-border hover:border-accent/50 hover:bg-accent/5"
            }`}
          >
            <Upload className={`w-12 h-12 mx-auto mb-4 ${isDragging ? "text-accent" : "text-muted-foreground"}`} />
            <p className="text-sm font-medium text-foreground mb-2">
              Drop your document here or click to upload
            </p>
            <p className="text-xs text-muted-foreground mb-4">
              Supports PDF, Excel (.xls, .xlsx), Word (.doc, .docx) up to 10MB
            </p>
            <input
              type="file"
              id="file-upload"
              className="hidden"
              accept=".pdf,.xls,.xlsx,.doc,.docx"
              onChange={handleFileInput}
            />
            <Button
              variant="outline"
              onClick={() => document.getElementById("file-upload")?.click()}
              className="hover:bg-accent hover:text-accent-foreground"
            >
              Select File
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-accent/5 rounded-lg border border-accent/20">
              <div className="flex items-center space-x-3">
                <FileText className="w-8 h-8 text-accent" />
                <div>
                  <p className="font-medium text-foreground">{uploadedDoc}</p>
                  <p className="text-xs text-muted-foreground">Processing complete</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onUpload(null as any)}
                className="hover:bg-destructive/10 hover:text-destructive"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="p-4 bg-card rounded-lg border border-border">
              <h4 className="font-semibold text-foreground mb-2">Extracted Content</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Sample extracted text from the document. The Document AI has successfully
                processed your PDF and extracted key information including tables, forms,
                and handwritten text with high accuracy.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
