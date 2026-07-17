import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ShieldCheck, TrendingUp, Lock, CheckCircle, Loader2, LogOut, Sparkles } from "lucide-react";
import { CountryDropdown } from "./CountryDropdown";
import { Footer } from "./Footer";
import { useNavigate, Link } from "react-router-dom";

export function EducationalDashboard() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", country: "CH", message: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const parts = formData.name.trim().split(" ");
      const firstName = parts[0];
      const lastName = parts.slice(1).join(" ");

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          firstName,
          lastName,
          phone: formData.phone,
          countryName: formData.country,
          description: formData.message,
        })
      });

      const data = await res.json();
      if (res.ok) {
        setSent(true);
        setSuccess(data.message || "Contact submission successful.");
      } else {
        setError(data.message || data.error || "An unexpected failure occurred.");
      }
    } catch (err) {
      setError("An unexpected failure occurred while connecting to the server.");
    } finally {
      setLoading(false);
    }
  };

  const inputBase = "peer w-full rounded-xl border border-border bg-background/50 px-4 pb-2.5 pt-6 text-sm text-foreground placeholder-transparent transition-colors focus:border-primary focus:outline-none";

  return (
    <div className="min-h-screen bg-background pb-32 overflow-hidden flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="font-display text-lg tracking-tight">Aurelian<span className="text-primary">.</span>Capital</span>
          </Link>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </header>

      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 -z-10 mt-16">
        <div className="absolute top-0 right-1/4 h-[400px] w-[600px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[140px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-24 flex-1">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl mb-24">
          <h1 className="text-4xl leading-[1.05] tracking-tight sm:text-5xl md:text-6xl mb-6">
            Welcome to <em className="font-display italic text-gradient-gold">Aurelian Insights</em>
          </h1>
          <p className="text-lg text-muted-foreground">
            Understand how we secure your capital and optimize your portfolio through institutional-grade strategies.
          </p>
        </motion.div>

        {/* Section 1: How we improve investment amount */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-32 grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-primary">
              <span className="h-px w-8 bg-primary" /> Portfolio Growth
            </div>
            <h2 className="text-3xl sm:text-4xl mb-6">How we optimize your returns</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              We leverage quantitative models and deep market analysis to identify asymmetrical opportunities. By actively managing your allocation across diverse digital assets, we aim to capture upside volatility while strictly capping downside risk.
            </p>
            <ul className="space-y-4">
              {["Algorithmic rebalancing during market inefficiencies", "Yield generation through institutional staking", "Strategic exposure to emerging market leaders"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-foreground/80">
                  <CheckCircle className="h-4 w-4 text-primary" /> {item}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="relative h-[400px] rounded-3xl border border-border bg-surface p-6 glass">
            {/* Candlestick illustration */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full max-w-[80%] h-[60%] border-b border-l border-border/50 relative flex items-end justify-between px-4 pb-2">
                {[40, 70, 45, 90, 60, 85].map((h, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ height: 0 }} 
                    whileInView={{ height: `${h}%` }} 
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className={`w-8 relative rounded-t-sm ${i % 2 === 0 ? 'bg-red-500/80' : 'bg-primary'}`}
                  >
                     <div className="absolute left-1/2 top-[-10px] bottom-[-10px] w-px bg-current opacity-50 -translate-x-1/2" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Section 2: Safe and Secure */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-32 grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="order-2 lg:order-1 relative h-[400px] rounded-3xl border border-border bg-surface p-6 glass flex items-center justify-center">
             <div className="relative">
               <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute inset-[-40px] rounded-full border border-dashed border-primary/30" />
               <motion.div animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute inset-[-20px] rounded-full border border-primary/40" />
               <div className="grid h-32 w-32 place-items-center rounded-full bg-primary/20 backdrop-blur-md border border-primary/50 shadow-[0_0_50px_rgba(212,175,55,0.2)]">
                 <ShieldCheck className="h-12 w-12 text-primary" />
               </div>
             </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-primary">
              <span className="h-px w-8 bg-primary" /> Security First
            </div>
            <h2 className="text-3xl sm:text-4xl mb-6">Institutional Grade Custody</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Security is not an afterthought; it is the foundation of our infrastructure. Client assets are stored in cold, multi-signature vaults protected by geographically distributed keys.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Lock, title: "Cold Storage", desc: "100% offline asset protection" },
                { icon: ShieldCheck, title: "Multi-Sig", desc: "No single point of failure" },
              ].map((s, i) => (
                <div key={i} className="rounded-2xl border border-border bg-background/50 p-4">
                  <s.icon className="h-6 w-6 text-primary mb-3" />
                  <div className="text-sm font-medium">{s.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Contact Form Section */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl mb-4">Ready to elevate your portfolio?</h2>
            <p className="text-muted-foreground">Reach out to your dedicated portfolio manager directly.</p>
          </div>

          <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 md:p-10 border border-border">
            {error && (
              <div className="mb-6 rounded-lg bg-red-500/10 p-4 text-sm text-red-500 border border-red-500/20">
                {error}
              </div>
            )}
            
            {success && (
              <div className="mb-6 rounded-lg bg-primary/10 p-4 text-sm text-primary border border-primary/20">
                {success}
              </div>
            )}

            <div className="grid gap-5 md:grid-cols-2">
              <label className="relative block">
                <input required type="text" className={inputBase} value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Full Name" />
                <span className="pointer-events-none absolute left-4 top-2 text-[10px] uppercase tracking-widest text-muted-foreground">Full Name</span>
              </label>
              <label className="relative block">
                <input required type="email" className={inputBase} value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="Email Address" />
                <span className="pointer-events-none absolute left-4 top-2 text-[10px] uppercase tracking-widest text-muted-foreground">Email Address</span>
              </label>
              <div className="relative block">
                 <div className="[&>div]:!bg-background/50 [&>div]:!pt-[1.4rem] [&>div]:!pb-2">
                   <CountryDropdown value={formData.country} onChange={v => setFormData({ ...formData, country: v })} />
                 </div>
              </div>
              <label className="relative block">
                <input required type="tel" className={inputBase} value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} placeholder="Phone Number" />
                <span className="pointer-events-none absolute left-4 top-2 text-[10px] uppercase tracking-widest text-muted-foreground">Phone Number</span>
              </label>
            </div>
            <div className="mt-5">
              <label className="relative block">
                <textarea rows={4} className={inputBase} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} placeholder="Message (Optional)" />
                <span className="pointer-events-none absolute left-4 top-2 text-[10px] uppercase tracking-widest text-muted-foreground">Message (Optional)</span>
              </label>
            </div>
            <div className="mt-8 flex justify-end">
              <button disabled={loading || sent} type="submit" className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-gold-soft disabled:opacity-50">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : sent ? "Message Sent" : "Send Secure Message"}
                {!loading && !sent && <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
              </button>
            </div>
          </form>
        </motion.section>
      </div>
      <Footer />
    </div>
  );
}
