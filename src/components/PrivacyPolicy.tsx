import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Footer } from "./Footer";

export function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background pt-24 pb-32">
      <div className="mx-auto max-w-4xl px-6">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-12 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>
        
        <h1 className="text-4xl leading-tight tracking-tight sm:text-5xl mb-6">Privacy Policy</h1>
        <p className="text-muted-foreground mb-12">Last Updated: {new Date().toLocaleDateString()}</p>
        
        <div className="prose prose-invert max-w-none text-foreground/80 space-y-8">
          <section>
            <h2 className="text-2xl font-display text-foreground mb-4">1. Information Collection</h2>
            <p>We collect information you provide directly to us, such as when you create or modify your account, request on-demand services, contact customer support, or otherwise communicate with us. This information may include: name, email, phone number, country, and investment details.</p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-foreground mb-4">2. Data Usage</h2>
            <p>We use the information we collect about you to provide, maintain, and improve our services, including to process transactions, provide customer support, and communicate with you about products, services, offers, and promotions.</p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-foreground mb-4">3. CRM Processing</h2>
            <p>Your contact information and inquiries are securely transmitted to our internal Customer Relationship Management (CRM) system for processing and communication purposes. Our CRM infrastructure adheres to stringent security protocols to ensure your data is protected.</p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-foreground mb-4">4. Cookies and Tracking</h2>
            <p>We use cookies and similar technologies to track activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-foreground mb-4">5. Security</h2>
            <p>We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. We employ institutional-grade encryption and access controls.</p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-foreground mb-4">6. Data Retention</h2>
            <p>We retain your personal data only for as long as is necessary for the purposes set out in this Privacy Policy, or as required by regulatory authorities.</p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-foreground mb-4">7. User Rights</h2>
            <p>You have the right to request access to, correction, or deletion of your personal data. You may also object to or request the restriction of processing of your personal data.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-display text-foreground mb-4">8. Marketing & Third Parties</h2>
            <p>We do not sell your personal data to third parties. We may share your data with trusted partners solely for the purpose of operating our business and providing services to you.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-display text-foreground mb-4">9. International Transfers</h2>
            <p>Your information, including Personal Data, may be transferred to - and maintained on - computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ.</p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-foreground mb-4">10. Contact</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at privacy@aurelian.capital.</p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
