import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { Moon, Sun, LayoutDashboard, CheckSquare, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform group-hover:scale-105">
              <CheckSquare className="h-5 w-5" />
            </div>
            <span className="text-xl font-semibold text-foreground">TaskFlow</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link 
              to="/board" 
              className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
            >
              Board
            </Link>
            <Link 
              to="/board" 
              className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
            >
              Calendar
            </Link>
            <Link 
              to="/board" 
              className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
            >
              Team
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-9 w-9 rounded-lg"
            >
              {theme === 'light' ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>
            
            <Link to="/board" className="hidden sm:block">
              <Button className="gap-2 rounded-lg">
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-9 w-9"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={cn(
          "md:hidden overflow-hidden transition-all duration-300",
          mobileMenuOpen ? "max-h-48 pb-4" : "max-h-0"
        )}>
          <div className="flex flex-col gap-2 pt-2">
            <Link 
              to="/board" 
              className="px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors text-sm font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Board
            </Link>
            <Link 
              to="/board" 
              className="px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors text-sm font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Calendar
            </Link>
            <Link 
              to="/board" 
              className="px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors text-sm font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Team
            </Link>
            <Link to="/board" className="sm:hidden" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full gap-2 rounded-lg mt-2">
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
