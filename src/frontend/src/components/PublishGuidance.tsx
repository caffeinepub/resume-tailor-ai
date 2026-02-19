import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Rocket, Terminal, Globe, AlertCircle } from 'lucide-react';

export function PublishGuidance() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Rocket className="h-4 w-4" />
          How to Publish
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Globe className="h-5 w-5" />
            Deploy to Internet Computer
          </DialogTitle>
          <DialogDescription>
            Follow these steps to publish your Resume Tailor AI app to the Internet Computer blockchain
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-6">
            {/* Prerequisites */}
            <div className="space-y-3">
              <h3 className="font-semibold text-base flex items-center gap-2">
                <Terminal className="h-4 w-4" />
                Prerequisites
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Install <code className="px-1.5 py-0.5 rounded bg-muted text-foreground">dfx</code> (Internet Computer SDK) from <a href="https://internetcomputer.org/docs/current/developer-docs/getting-started/install/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">internetcomputer.org</a></span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Have Node.js and pnpm installed</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Ensure you have ICP tokens for deployment (cycles)</span>
                </li>
              </ul>
            </div>

            {/* Step 1 */}
            <div className="space-y-3">
              <h3 className="font-semibold text-base">Step 1: Build Your Application</h3>
              <div className="rounded-lg bg-muted p-4 font-mono text-sm">
                <code>pnpm run build</code>
              </div>
              <p className="text-sm text-muted-foreground">
                This compiles your frontend and backend code for production.
              </p>
            </div>

            {/* Step 2 */}
            <div className="space-y-3">
              <h3 className="font-semibold text-base">Step 2: Deploy to Mainnet</h3>
              <div className="rounded-lg bg-muted p-4 font-mono text-sm space-y-2">
                <div><code>dfx deploy --network ic</code></div>
              </div>
              <p className="text-sm text-muted-foreground">
                This deploys both your frontend and backend canisters to the Internet Computer mainnet.
              </p>
            </div>

            {/* Step 3 */}
            <div className="space-y-3">
              <h3 className="font-semibold text-base">Step 3: Access Your Live App</h3>
              <p className="text-sm text-muted-foreground">
                After deployment, dfx will output your canister IDs. Your app will be accessible at:
              </p>
              <div className="rounded-lg bg-muted p-4 font-mono text-sm">
                <code>https://{'<frontend-canister-id>'}.ic0.app</code>
              </div>
            </div>

            {/* Optional: Custom Domain */}
            <div className="space-y-3">
              <h3 className="font-semibold text-base">Optional: Custom Domain</h3>
              <p className="text-sm text-muted-foreground">
                You can configure a custom domain for your app using the Internet Computer's boundary nodes. See the <a href="https://internetcomputer.org/docs/current/developer-docs/production/custom-domain/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">custom domain documentation</a> for details.
              </p>
            </div>

            <Separator className="my-6" />

            {/* Troubleshooting Section */}
            <div className="space-y-4">
              <h3 className="font-semibold text-base flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-warning" />
                Troubleshooting Common Issues
              </h3>
              
              <div className="space-y-4">
                {/* Issue 1: Missing dfx */}
                <div className="rounded-lg border border-border p-4 space-y-2">
                  <h4 className="font-medium text-sm">❌ "dfx: command not found"</h4>
                  <p className="text-sm text-muted-foreground">
                    <strong>Solution:</strong> Install the Internet Computer SDK:
                  </p>
                  <div className="rounded bg-muted p-3 font-mono text-xs">
                    <code>sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"</code>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Then restart your terminal and verify with <code className="px-1 py-0.5 rounded bg-muted">dfx --version</code>
                  </p>
                </div>

                {/* Issue 2: Missing cycles */}
                <div className="rounded-lg border border-border p-4 space-y-2">
                  <h4 className="font-medium text-sm">❌ "Insufficient cycles" or wallet errors</h4>
                  <p className="text-sm text-muted-foreground">
                    <strong>Solution:</strong> You need cycles to deploy. Get free cycles for testing:
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                    <li className="flex gap-2">
                      <span>1.</span>
                      <span>Visit the <a href="https://internetcomputer.org/docs/current/developer-docs/getting-started/cycles/cycles-faucet" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">cycles faucet</a></span>
                    </li>
                    <li className="flex gap-2">
                      <span>2.</span>
                      <span>Or use <code className="px-1 py-0.5 rounded bg-muted">dfx wallet balance</code> to check your wallet</span>
                    </li>
                  </ul>
                </div>

                {/* Issue 3: Wrong network */}
                <div className="rounded-lg border border-border p-4 space-y-2">
                  <h4 className="font-medium text-sm">❌ Deployment fails or canisters not found</h4>
                  <p className="text-sm text-muted-foreground">
                    <strong>Solution:</strong> Ensure you're using the correct network flag:
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>For mainnet: <code className="px-1 py-0.5 rounded bg-muted">dfx deploy --network ic</code></span>
                    </li>
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>For local testing: <code className="px-1 py-0.5 rounded bg-muted">dfx deploy</code> (requires <code className="px-1 py-0.5 rounded bg-muted">dfx start</code> first)</span>
                    </li>
                  </ul>
                </div>

                {/* Issue 4: Build errors */}
                <div className="rounded-lg border border-border p-4 space-y-2">
                  <h4 className="font-medium text-sm">❌ Build or TypeScript errors</h4>
                  <p className="text-sm text-muted-foreground">
                    <strong>Solution:</strong> Clean and rebuild:
                  </p>
                  <div className="rounded bg-muted p-3 font-mono text-xs space-y-1">
                    <div><code>rm -rf node_modules .dfx dist</code></div>
                    <div><code>pnpm install</code></div>
                    <div><code>dfx canister create --all</code></div>
                    <div><code>dfx generate backend</code></div>
                    <div><code>pnpm run build</code></div>
                  </div>
                </div>

                {/* Issue 5: Missing assets */}
                <div className="rounded-lg border border-border p-4 space-y-2">
                  <h4 className="font-medium text-sm">❌ Assets not loading (404 errors)</h4>
                  <p className="text-sm text-muted-foreground">
                    <strong>Solution:</strong> Ensure all assets are in <code className="px-1 py-0.5 rounded bg-muted">frontend/public/</code>:
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>Check that <code className="px-1 py-0.5 rounded bg-muted">frontend/public/assets/generated/</code> contains your logo and background images</span>
                    </li>
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>Verify <code className="px-1 py-0.5 rounded bg-muted">frontend/public/favicon.ico</code> exists</span>
                    </li>
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>Rebuild after adding assets: <code className="px-1 py-0.5 rounded bg-muted">pnpm run build</code></span>
                    </li>
                  </ul>
                </div>

                {/* Issue 6: Stale canister IDs */}
                <div className="rounded-lg border border-border p-4 space-y-2">
                  <h4 className="font-medium text-sm">❌ "Canister not found" after deployment</h4>
                  <p className="text-sm text-muted-foreground">
                    <strong>Solution:</strong> Check your canister IDs are correct:
                  </p>
                  <div className="rounded bg-muted p-3 font-mono text-xs">
                    <code>dfx canister id frontend --network ic</code>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    If switching between local and mainnet, ensure you're using the right canister IDs for each network.
                  </p>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Helpful Resources */}
            <div className="space-y-3">
              <h3 className="font-semibold text-base">Helpful Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <a href="https://internetcomputer.org/docs" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Internet Computer Documentation</a>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <a href="https://internetcomputer.org/docs/current/developer-docs/getting-started/cycles/cycles-faucet" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Get Free Cycles (for testing)</a>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <a href="https://forum.dfinity.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Developer Forum</a>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <a href="https://internetcomputer.org/docs/current/developer-docs/production/deployment-guide" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Production Deployment Guide</a>
                </li>
              </ul>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
