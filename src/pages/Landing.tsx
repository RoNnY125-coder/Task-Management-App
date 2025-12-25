import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckSquare, 
  ArrowRight, 
  Sparkles, 
  Users, 
  LayoutDashboard,
  Calendar,
  Zap,
  Shield,
  Clock
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';

const features = [
  {
    icon: LayoutDashboard,
    title: 'Kanban Board',
    description: 'Drag and drop tasks between columns with smooth animations.',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Assign tasks, leave comments, and track activity in real-time.',
  },
  {
    icon: Calendar,
    title: 'Multiple Views',
    description: 'Switch between Kanban, List, and Calendar views effortlessly.',
  },
  {
    icon: Zap,
    title: 'Fast & Intuitive',
    description: 'Designed for speed with keyboard shortcuts and quick actions.',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Your data is encrypted and never shared with third parties.',
  },
  {
    icon: Clock,
    title: 'Due Date Tracking',
    description: 'Never miss a deadline with smart notifications and reminders.',
  },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium animate-fade-in">
              <Sparkles className="h-3.5 w-3.5 mr-2" />
              Prototype Demo — Built for Showcase
            </Badge>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight animate-slide-up">
              Manage Tasks with
              <span className="block mt-2 bg-gradient-to-r from-primary to-[hsl(199,89%,48%)] bg-clip-text text-transparent">
                Clarity & Speed
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              A modern, collaborative task management app designed for teams to plan, track, and complete work efficiently. Beautiful, fast, and intuitive.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Link to="/board">
                <Button size="lg" className="h-12 px-8 text-base gap-2 rounded-xl shadow-glow hover:shadow-xl transition-all">
                  Open Dashboard
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="h-12 px-8 text-base rounded-xl">
                Watch Demo
              </Button>
            </div>

            {/* Social Proof */}
            <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center gap-2">
                <CheckSquare className="h-4 w-4 text-primary" />
                <span>Free to use</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckSquare className="h-4 w-4 text-primary" />
                <span>No signup required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckSquare className="h-4 w-4 text-primary" />
                <span>Demo data included</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything you need to stay organized
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features wrapped in a beautiful, intuitive interface that teams love to use.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/20 hover:shadow-custom-lg transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to boost your productivity?
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              Jump into the demo and experience the power of organized task management.
            </p>
            <Link to="/board">
              <Button size="lg" className="h-14 px-10 text-lg gap-3 rounded-xl shadow-glow hover:shadow-xl transition-all">
                <LayoutDashboard className="h-5 w-5" />
                Launch TaskFlow
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <CheckSquare className="h-4 w-4" />
              </div>
              <span className="font-semibold text-foreground">TaskFlow</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 TaskFlow Demo. Built for portfolio showcase.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
