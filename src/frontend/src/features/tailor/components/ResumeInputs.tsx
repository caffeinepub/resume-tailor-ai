import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Upload, FileText, Briefcase, Sparkles } from 'lucide-react';
import { extractPdfText } from '../../../shared/lib/pdf/extractPdfText';
import { Progress } from '@/components/ui/progress';

interface ResumeInputsProps {
  baseResumeText: string;
  jobDescription: string;
  onBaseResumeChange: (text: string) => void;
  onJobDescriptionChange: (text: string) => void;
  onExtractionError: (error: string | null) => void;
}

export function ResumeInputs({
  baseResumeText,
  jobDescription,
  onBaseResumeChange,
  onJobDescriptionChange,
  onExtractionError,
}: ResumeInputsProps) {
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractionProgress, setExtractionProgress] = useState(0);
  const [extractionStage, setExtractionStage] = useState('');

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Clear previous extraction errors
    onExtractionError(null);
    setExtractionProgress(0);
    setExtractionStage('');

    const fileName = file.name.toLowerCase();
    const isPdf = fileName.endsWith('.pdf');
    const isTxt = fileName.endsWith('.txt');

    if (!isPdf && !isTxt) {
      onExtractionError('Please upload a .txt or .pdf file.');
      return;
    }

    setIsExtracting(true);

    try {
      if (isTxt) {
        // Handle text file
        setExtractionStage('Reading text file...');
        setExtractionProgress(30);
        
        const reader = new FileReader();
        reader.onload = (e) => {
          const text = e.target?.result as string;
          setExtractionProgress(80);
          setExtractionStage('Processing resume content...');
          
          setTimeout(() => {
            onBaseResumeChange(text);
            setExtractionProgress(100);
            setExtractionStage('Resume loaded successfully!');
            setTimeout(() => {
              setIsExtracting(false);
              setExtractionProgress(0);
              setExtractionStage('');
            }, 1000);
          }, 300);
        };
        reader.onerror = () => {
          onExtractionError('Failed to read text file. Please try again.');
          setIsExtracting(false);
          setExtractionProgress(0);
          setExtractionStage('');
        };
        reader.readAsText(file);
      } else if (isPdf) {
        // Handle PDF file with AI-style progress feedback
        setExtractionStage('Analyzing PDF structure...');
        setExtractionProgress(20);

        const arrayBuffer = await file.arrayBuffer();
        
        setExtractionStage('Extracting text content...');
        setExtractionProgress(50);

        const extractedText = await extractPdfText(arrayBuffer);
        
        if (!extractedText || extractedText.trim().length === 0) {
          onExtractionError('The PDF appears to be empty or contains no extractable text. Please try a different file or paste your resume manually.');
          setIsExtracting(false);
          setExtractionProgress(0);
          setExtractionStage('');
          return;
        }

        setExtractionStage('Processing resume sections...');
        setExtractionProgress(80);

        // Simulate intelligent processing
        await new Promise(resolve => setTimeout(resolve, 500));

        onBaseResumeChange(extractedText);
        
        setExtractionProgress(100);
        setExtractionStage('Resume converted successfully!');
        
        setTimeout(() => {
          setIsExtracting(false);
          setExtractionProgress(0);
          setExtractionStage('');
        }, 1500);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to extract text from PDF. Please try a different file or paste your resume manually.';
      onExtractionError(errorMessage);
      setIsExtracting(false);
      setExtractionProgress(0);
      setExtractionStage('');
    }

    // Reset file input
    event.target.value = '';
  };

  return (
    <div className="space-y-6">
      {/* Base Resume Input */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="base-resume" className="text-base font-semibold flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Base Resume
          </Label>
          <div className="relative">
            <input
              type="file"
              accept=".txt,.pdf"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
              disabled={isExtracting}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => document.getElementById('file-upload')?.click()}
              type="button"
              disabled={isExtracting}
            >
              {isExtracting ? (
                <>
                  <Sparkles className="mr-2 h-3 w-3 animate-pulse" />
                  Converting...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-3 w-3" />
                  Upload Resume
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Progress indicator */}
        {isExtracting && (
          <div className="space-y-2 rounded-lg border border-primary/20 bg-primary/5 p-3">
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4 animate-pulse" />
              <span>{extractionStage}</span>
            </div>
            <Progress value={extractionProgress} className="h-2" />
          </div>
        )}

        <Textarea
          id="base-resume"
          placeholder="Paste your resume here or upload a .txt or .pdf file...&#10;&#10;Example format:&#10;Name: John Doe&#10;Position: Software Engineer&#10;Summary: Experienced developer...&#10;Education: BS Computer Science, University...&#10;Work Experience: Senior Developer at Company...&#10;Skills: JavaScript, React, Node.js...&#10;Certificates: AWS Certified...&#10;Languages: English, Spanish..."
          value={baseResumeText}
          onChange={(e) => onBaseResumeChange(e.target.value)}
          className="min-h-[240px] font-mono text-sm resize-none"
          disabled={isExtracting}
        />
        {baseResumeText.trim().length === 0 && !isExtracting && (
          <p className="text-xs text-muted-foreground">
            Upload your resume file and it will be automatically converted to text, or paste your resume content directly.
          </p>
        )}
      </div>

      {/* Job Description Input */}
      <div className="space-y-3">
        <Label htmlFor="job-description" className="text-base font-semibold flex items-center gap-2">
          <Briefcase className="h-4 w-4" />
          Job Description
        </Label>
        <Textarea
          id="job-description"
          placeholder="Paste the target job description here...&#10;&#10;Include key requirements, responsibilities, and desired skills from the job posting."
          value={jobDescription}
          onChange={(e) => onJobDescriptionChange(e.target.value)}
          className="min-h-[200px] resize-none"
        />
        {jobDescription.trim().length === 0 && (
          <p className="text-xs text-muted-foreground">
            Paste the complete job description to tailor your resume for this specific role.
          </p>
        )}
      </div>
    </div>
  );
}
