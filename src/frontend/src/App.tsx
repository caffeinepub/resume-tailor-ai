import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { TailorResumePage } from './features/tailor';
import { HomePage } from './pages/HomePage';
import { PublishGuidance } from './components/PublishGuidance';
import { SiCaffeine } from 'react-icons/si';

const queryClient = new QueryClient();

// Layout component with header and footer
function Layout() {
  // Safe hostname retrieval for UTM tracking
  const getHostname = () => {
    if (typeof window !== 'undefined') {
      return window.location.hostname;
    }
    return 'unknown-app';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background pattern */}
      <div 
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'url(/assets/generated/resume-tailor-ai-background.dim_1600x900.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Header */}
      <header className="relative border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img 
                src="/assets/generated/resume-tailor-ai-logo.dim_512x512.png" 
                alt="Resume Tailor AI Logo"
                className="h-12 w-12 rounded-lg"
              />
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Resume Tailor AI</h1>
                <p className="text-sm text-muted-foreground">Customize your resume for any job description</p>
              </div>
            </div>
            <PublishGuidance />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="relative mt-16 border-t border-border bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center justify-center gap-2 text-center text-sm text-muted-foreground">
            <p className="flex items-center gap-2">
              Built with <SiCaffeine className="h-4 w-4 text-primary" /> using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(getHostname())}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground hover:underline"
              >
                caffeine.ai
              </a>
            </p>
            <p>© {new Date().getFullYear()} Resume Tailor AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Define routes
const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const tailorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tailor',
  component: () => (
    <div className="container mx-auto px-4 py-8">
      <TailorResumePage />
    </div>
  ),
});

// Create router
const routeTree = rootRoute.addChildren([indexRoute, tailorRoute]);
const router = createRouter({ routeTree });

// App component
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
