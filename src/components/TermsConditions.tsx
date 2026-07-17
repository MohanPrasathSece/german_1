import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Footer } from "./Footer";

export function TermsConditions() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background pt-24 pb-32">
      <div className="mx-auto max-w-4xl px-6">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-12 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>
        
        <h1 className="text-4xl leading-tight tracking-tight sm:text-5xl mb-6">Terms & Conditions</h1>
        <p className="text-muted-foreground mb-12">Last Updated: {new Date().toLocaleDateString()}</p>
        
        <div className="prose prose-invert max-w-none text-foreground/80 space-y-8">
          <section>
            <h2 className="text-2xl font-display text-foreground mb-4">1. Acceptance & Eligibility</h2>
            <p>By accessing or using our services, you agree to be bound by these Terms. Our services are strictly intended for individuals who are at least 18 years old and meet the regulatory criteria for our investment mandates in their respective jurisdictions.</p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-foreground mb-4">2. Website Purpose</h2>
            <p>The content provided on this website is for informational purposes only. It does not constitute an offer or solicitation to buy or sell any digital assets, securities, or financial instruments.</p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-foreground mb-4">3. Cryptocurrency Risk Disclosure</h2>
            <p>Investing in digital assets involves a high degree of risk, including the risk of complete loss of capital. Cryptocurrency markets are highly volatile and subject to sudden, significant price movements. Past performance is not indicative of future results.</p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-foreground mb-4">4. No Financial Advice</h2>
            <p>Nothing on this website constitutes financial, investment, legal, or tax advice. You should consult with independent professionals before making any investment decisions.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-display text-foreground mb-4">5. No Guaranteed Returns</h2>
            <p>We do not guarantee any specific investment returns or outcomes. All investments are subject to market risks, and the value of your portfolio may fluctuate.</p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-foreground mb-4">6. User Responsibilities & Acceptable Use</h2>
            <p>You agree to use our services only for lawful purposes. You are solely responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-foreground mb-4">7. Intellectual Property</h2>
            <p>All content on this website, including text, graphics, logos, and software, is the property of Aurelian Capital or its licensors and is protected by intellectual property laws.</p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-foreground mb-4">8. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, Aurelian Capital shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of our services.</p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-foreground mb-4">9. Privacy Reference</h2>
            <p>Your use of our services is also governed by our Privacy Policy, which outlines how we collect, use, and protect your personal data.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-display text-foreground mb-4">10. Governing Law & Disputes</h2>
            <p>These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Aurelian Capital operates. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the competent courts.</p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-foreground mb-4">11. Contact</h2>
            <p>If you have any questions about these Terms, please contact us at legal@aurelian.capital.</p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
