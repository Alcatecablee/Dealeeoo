import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { useAuth } from '@/contexts/AuthContext';

interface AuthModalProps {
  triggerElement?: React.ReactNode;
  defaultMode?: 'login' | 'signup';
  onAuthSuccess?: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ 
  triggerElement, 
  defaultMode = 'login',
  onAuthSuccess 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'login' | 'signup'>(defaultMode);
  const { isAuthenticated } = useAuth();

  const handleSuccess = () => {
    if (onAuthSuccess) onAuthSuccess();
    setIsOpen(false);
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
  };

  // If user is already authenticated, don't show the auth modal
  if (isAuthenticated) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {triggerElement || (
          <Button 
            variant="outline" 
            className="hover:text-friendly-blue hover:border-friendly-blue transition-colors"
            data-auth-trigger
          >
            Sign In
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-3xl w-full bg-background rounded-2xl p-8 shadow-xl border border-border" style={{overflow: 'visible'}}>
        <div className="flex flex-col md:flex-row w-full gap-0">
          <div className="flex-1 min-w-0 flex flex-col items-center justify-center pr-0 md:pr-8">
            <DialogHeader className="w-full mb-6">
              <DialogTitle className="text-2xl font-bold text-gradient-friendly mb-1 text-center md:text-left">
                {mode === 'login' ? 'Sign In to Your Account' : 'Create Your Account'}
              </DialogTitle>
              <p className="text-muted-foreground text-base text-center md:text-left">
                {mode === 'login' ? 'Sign in to access your deals dashboard and more.' : 'Sign up to track all your deals in one place.'}
              </p>
            </DialogHeader>
            <div className="w-full max-w-md mx-auto mt-0">
              {mode === 'login' ? (
                <LoginForm onSuccess={handleSuccess} onToggleForm={toggleMode} />
              ) : (
                <SignupForm onSuccess={handleSuccess} onToggleForm={toggleMode} />
              )}
            </div>
          </div>
          <div className="hidden md:flex flex-col flex-1 min-w-0 pl-8 border-l border-border bg-muted/60 rounded-r-2xl justify-center gap-6">
            <div>
              <h2 className="text-xl font-bold mb-2">Why Create an Account?</h2>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2"><span className="text-friendly-blue">&#9679;</span> <span><b>Deal Dashboard:</b> Access all your active and past deals in one centralized dashboard.</span></li>
                <li className="flex items-start gap-2"><span className="text-friendly-blue">&#9679;</span> <span><b>Real-time Notifications:</b> Get email updates for every deal status change and activity.</span></li>
                <li className="flex items-start gap-2"><span className="text-friendly-blue">&#9679;</span> <span><b>Templates & History:</b> Save templates for recurring deals and download your complete history.</span></li>
                <li className="flex items-start gap-2"><span className="text-friendly-blue">&#9679;</span> <span><b>Build Your Reputation:</b> Create a trust profile based on your successful transactions.</span></li>
              </ul>
            </div>
            <div className="bg-card/80 rounded-lg p-4 mt-4">
              <h3 className="font-semibold mb-1">Still Not Sure?</h3>
              <p className="text-sm mb-2">You can still use Dealeeoo without an account. Create deals as a guest and we'll send secure access links via email.</p>
              <a href="#" className="text-friendly-blue hover:underline font-medium">Create a deal as guest →</a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;