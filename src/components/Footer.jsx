import { Dumbbell, Globe, MessageCircle } from "lucide-react";

export const Footer = () => (
  <footer className="border-t border-white/5 mt-auto">
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-neon-cyan/10 border border-neon-cyan/30 flex items-center justify-center">
            <Dumbbell className="w-4 h-4 text-neon-cyan" />
          </div>
          <span className="font-bold text-text-primary">
            Fit<span className="text-neon-cyan">Flow</span>
          </span>
        </div>
        <p className="text-sm text-text-muted">
          Transform your fitness journey with digital precision.
        </p>
        <div className="flex items-center gap-4">
          <a
            href="#"
            className="text-text-muted hover:text-neon-cyan transition-colors"
          >
            <Globe className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="text-text-muted hover:text-neon-cyan transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
          </a>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-white/5 text-center text-xs text-text-muted">
        &copy; {new Date().getFullYear()} FitFlow. All rights reserved.
      </div>
    </div>
  </footer>
);
