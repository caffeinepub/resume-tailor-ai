import { useState } from 'react';
import { ResumeInputs } from './components/ResumeInputs';
import { ResumePreview } from './components/ResumePreview';
import { TailoredResumeDownloadScreen } from './components/TailoredResumeDownloadScreen';
import { useTailorResumeMutation } from './hooks/useTailorResumeMutation';
import { parseResumeText } from './lib/resumeParsing';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertCircle, Sparkles, Download } from 'lucide-react';
import type { Resume } from '../../backend';

type ScreenMode = 'edit' | 'download-preview';

export function TailorResumePage() {
  const [baseResumeText, setBaseResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [tailoredResume, setTailoredResume] = useState<Resume | null>(null);
  const [extractionError, setExtractionError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [screenMode, setScreenMode] = useState<ScreenMode>('edit');

  const { mutate: tailorResume, isPending, error: tailoringError } = useTailorResumeMutation();

  const handleTailorResume = () => {
    // Clear previous errors
    setValidationError(null);

    // Validate inputs
    if (!baseResumeText.trim()) {
      setValidationError('Please provide your base resume text or upload a resume file.');
      return;
    }

    if (!jobDescription.trim()) {
      setValidationError('Please provide the job description you want to tailor your resume for.');
      return;
    }

    const parsedResume = parseResumeText(baseResumeText);
    
    tailorResume(
      { baseResume: parsedResume, jobDescription },
      {
        onSuccess: (result) => {
          setTailoredResume(result);
        },
      }
    );
  };

  const handleExtractionError = (error: string | null) => {
    setExtractionError(error);
  };

  const handleDownloadClick = () => {
    setScreenMode('download-preview');
  };

  const handleBackToEdit = () => {
    setScreenMode('edit');
  };

  const canTailor = baseResumeText.trim().length > 0 && jobDescription.trim().length > 0;

  // Show download preview screen
  if (screenMode === 'download-preview' && tailoredResume) {
    return (
      <TailoredResumeDownloadScreen
        resume={tailoredResume}
        onBack={handleBackToEdit}
      />
    );
  }

  // Show edit screen
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Input Section */}
      <div className="space-y-6">
        <Card className="p-6">
          <ResumeInputs
            baseResumeText={baseResumeText}
            jobDescription={jobDescription}
            onBaseResumeChange={setBaseResumeText}
            onJobDescriptionChange={setJobDescription}
            onExtractionError={handleExtractionError}
          />
          
          <div className="mt-6 space-y-4">
            <Button
              onClick={handleTailorResume}
              disabled={!canTailor || isPending}
              className="w-full h-12 text-base font-semibold"
              size="lg"
            >
              {isPending ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Tailoring Resume...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Tailor Resume
                </>
              )}
            </Button>

            {/* Download Button - only show when tailored resume exists */}
            {tailoredResume && (
              <Button
                onClick={handleDownloadClick}
                variant="outline"
                className="w-full h-12 text-base font-semibold"
                size="lg"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Resume
              </Button>
            )}

            {/* Validation Error */}
            {validationError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{validationError}</AlertDescription>
              </Alert>
            )}

            {/* PDF Extraction Error */}
            {extractionError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>PDF Extraction Error:</strong> {extractionError}
                </AlertDescription>
              </Alert>
            )}

            {/* Backend Tailoring Error */}
            {tailoringError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Tailoring Error:</strong>{' '}
                  {tailoringError instanceof Error ? tailoringError.message : 'Failed to tailor resume. Please try again.'}
                </AlertDescription>
              </Alert>
            )}
          </div>
        </Card>
      </div>

      {/* Preview Section */}
      <div className="space-y-6">
        <Card className="p-6 min-h-[600px]">
          {tailoredResume ? (
            <ResumePreview resume={tailoredResume} />
          ) : (
            <div className="flex h-full min-h-[500px] items-center justify-center text-center">
              <div className="space-y-3">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <Sparkles className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold">Your tailored resume will appear here</h3>
                <p className="text-sm text-muted-foreground max-w-sm">
                  Enter your base resume and job description, then click "Tailor Resume" to get started.
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
