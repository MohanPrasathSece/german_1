import React from "react";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <div className="grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="font-display text-lg tracking-tight">Aurelian<span className="text-primary">.</span>Capital</span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              A regulated digital asset management firm building long-horizon crypto portfolios for private clients and institutions worldwide.
            </p>
          </div>
          
          <div>
             <div className="text-xs uppercase tracking-widest text-muted-foreground">Company</div>
             <ul className="mt-5 space-y-2 text-sm">
                <li><Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-foreground/80 transition-colors hover:text-primary">Philosophy</Link></li>
                <li><Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-foreground/80 transition-colors hover:text-primary">Team</Link></li>
             </ul>
          </div>
          <div>
             <div className="text-xs uppercase tracking-widest text-muted-foreground">Products</div>
             <ul className="mt-5 space-y-2 text-sm">
                <li><Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-foreground/80 transition-colors hover:text-primary">Flagship Fund</Link></li>
                <li><Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-foreground/80 transition-colors hover:text-primary">Institutional</Link></li>
             </ul>
          </div>
          <div>
             <div className="text-xs uppercase tracking-widest text-muted-foreground">Legal</div>
             <ul className="mt-5 space-y-2 text-sm">
                <li><Link to="/privacy-policy" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-foreground/80 transition-colors hover:text-primary">Privacy Policy</Link></li>
                <li><Link to="/terms-conditions" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-foreground/80 transition-colors hover:text-primary">Terms & Conditions</Link></li>
             </ul>
          </div>
        </div>

        <div className="mt-14 hairline" />

        <div className="mt-6 flex flex-col-reverse items-start justify-between gap-6 text-xs text-muted-foreground lg:flex-row lg:items-center">
          <div>© {new Date().getFullYear()} Aurelian Capital Ltd. All rights reserved. Investment in digital assets involves risk of loss. Past performance is not indicative of future results.</div>
          <div className="flex items-center gap-4">
            <span>FinCEN #31000-XXX</span>
            <span>·</span>
            <span>FCA Registered</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
