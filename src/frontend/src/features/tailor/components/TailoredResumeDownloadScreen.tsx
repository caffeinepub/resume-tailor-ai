import { useState } from 'react';
import type { Resume } from '../../../backend';
import { ResumePreview } from './ResumePreview';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Download } from 'lucide-react';
import { generateResumePdf } from '../../../shared/lib/pdf/generateResumePdf';

interface TailoredResumeDownloadScreenProps {
  resume: Resume;
  onBack: () => void;
}

export function TailoredResumeDownloadScreen({ resume, onBack }: TailoredResumeDownloadScreenProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPdf = async () => {
    setIsGenerating(true);
    try {
      const pdfBlob = await generateResumePdf(resume);
      
      // Create download link
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${resume.name.replace(/\s+/g, '_')}_Resume.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the URL object
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header with actions */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={onBack}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Editing
        </Button>
        
        <Button
          onClick={handleDownloadPdf}
          disabled={isGenerating}
          className="gap-2"
          size="lg"
        >
          {isGenerating ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Generating PDF...
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              Download PDF
            </>
          )}
        </Button>
      </div>

      {/* Resume Preview */}
      <Card className="p-8">
        <ResumePreview resume={resume} />
      </Card>

      {/* Bottom action */}
      <div className="flex justify-center">
        <Button
          onClick={handleDownloadPdf}
          disabled={isGenerating}
          className="gap-2"
          size="lg"
        >
          {isGenerating ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Generating PDF...
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              Download PDF
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
