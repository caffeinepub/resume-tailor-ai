import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Clock, Target } from 'lucide-react';

export function HomePage() {
  const navigate = useNavigate();

  const handleTailorClick = () => {
    navigate({ to: '/tailor' });
  };

  return (
    <div className="relative min-h-[calc(100vh-200px)] flex items-center justify-center">
      {/* Hero Background Image */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'url(/assets/generated/hero-background.dim_1920x1080.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Main Headline */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/50 text-accent-foreground text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4" />
              AI-Powered Resume Optimization
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
              Transform Your Resume for{' '}
              <span className="text-primary">Every Opportunity</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Match your resume perfectly to any job description with intelligent AI tailoring. 
              Stand out from the crowd and land more interviews.
            </p>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button 
              size="lg" 
              onClick={handleTailorClick}
              className="text-lg px-8 py-6 h-auto shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              Tailor Resume
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Value Propositions */}
          <div className="grid md:grid-cols-3 gap-8 pt-16 max-w-3xl mx-auto">
            <div className="space-y-3 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mx-auto">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg">Precision Matching</h3>
              <p className="text-sm text-muted-foreground">
                AI analyzes job descriptions and highlights your most relevant skills and experience
              </p>
            </div>

            <div className="space-y-3 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mx-auto">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg">Save Time</h3>
              <p className="text-sm text-muted-foreground">
                Stop manually editing your resume for each application. Get tailored results in seconds
              </p>
            </div>

            <div className="space-y-3 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mx-auto">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg">Stand Out</h3>
              <p className="text-sm text-muted-foreground">
                Increase your chances of getting noticed by recruiters and landing interviews
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
