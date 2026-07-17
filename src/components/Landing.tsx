import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring, animate, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ShieldCheck, LineChart, Layers, Cpu, FileText, Building2,
  ArrowUpRight, Check, Star, Quote, Mail, Phone, MapPin, Clock,
  Twitter, Linkedin, Github, Sparkles, TrendingUp, Lock, Award, Loader2, Menu, X
} from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { AuthModal } from "./AuthModal";
import { CountryDropdown } from "./CountryDropdown";
import { Footer } from "./Footer";

/* ---------------- helpers ---------------- */

function Counter({ to, suffix = "", prefix = "", decimals = 0 }: { to: number; suffix?: string; prefix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, {
      duration: 2, ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(v),
    });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>{prefix}{val.toFixed(decimals)}{suffix}</span>;
}

function MagneticButton({ children, variant = "primary", href = "#" }: { children: React.ReactNode; variant?: "primary" | "ghost"; href?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });
  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - r.left - r.width / 2) * 0.25);
    y.set((e.clientY - r.top - r.height / 2) * 0.25);
  };
  const reset = () => { x.set(0); y.set(0); };
  const base = "group relative inline-flex w-full justify-center sm:w-auto items-center gap-2 rounded-full px-5 py-3 md:px-7 md:py-3.5 text-sm font-medium tracking-wide transition-colors";
  const styles = variant === "primary"
    ? "bg-primary text-primary-foreground hover:bg-gold-soft"
    : "border border-border text-foreground hover:bg-secondary";
  return (
    <motion.a ref={ref} href={href} onMouseMove={onMove} onMouseLeave={reset}
      style={{ x: sx, y: sy }} className={`${base} ${styles}`}>
      {children}
      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </motion.a>
  );
}

function SectionLabel({ eyebrow, title, kicker }: { eyebrow: string; title: React.ReactNode; kicker?: string }) {
  return (
    <div className="max-w-3xl">
      <div className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-primary">
        <span className="h-px w-8 bg-primary" /> {eyebrow}
      </div>
      <h2 className="text-4xl leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">{title}</h2>
      {kicker && <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">{kicker}</p>}
    </div>
  );
}

/* ---------------- NAV ---------------- */

function Nav({ onLoginClick }: { onLoginClick: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);

  const links = [
    { label: "Home", href: "#" },
    { label: "Exclusivity", href: "#exclusivity" },
    { label: "FAQ", href: "#faq" },
    { label: "Apply", href: "#contact" },
  ];

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}>
        <div className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-500 ${scrolled ? "glass rounded-full py-2.5" : ""}`}>
          <a href="#" className="flex items-center gap-2.5">
            <div className="grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="font-display text-lg tracking-tight">Aurelian<span className="text-primary">.</span>Capital</span>
          </a>
          
          <nav className="hidden items-center gap-9 text-sm text-muted-foreground md:flex">
            {links.map(l => (
              <a key={l.label} href={l.href} className="transition-colors hover:text-foreground">{l.label}</a>
            ))}
          </nav>

          <div className="hidden md:block">
            <button onClick={onLoginClick} className="rounded-full border border-border px-4 py-2 text-sm text-foreground transition-colors hover:bg-secondary">
              Investor Login
            </button>
          </div>

          <button 
            className="md:hidden text-foreground"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[100] flex flex-col bg-background/95 backdrop-blur-3xl px-6 py-6 md:hidden"
          >
            <div className="flex items-center justify-between">
              <a href="#" className="flex items-center gap-2.5" onClick={() => setMobileMenuOpen(false)}>
                <div className="grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground">
                  <Sparkles className="h-4 w-4" />
                </div>
                <span className="font-display text-lg tracking-tight">Aurelian<span className="text-primary">.</span>Capital</span>
              </a>
              <button onClick={() => setMobileMenuOpen(false)} className="text-foreground">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-12 flex flex-col gap-6 text-xl">
              {links.map(l => (
                <a key={l.label} href={l.href} onClick={() => setMobileMenuOpen(false)} className="border-b border-border pb-4 transition-colors hover:text-primary">
                  {l.label}
                </a>
              ))}
            </div>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                onLoginClick();
              }} 
              className="mt-8 rounded-full bg-primary py-4 text-center text-primary-foreground font-medium"
            >
              Investor Login
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ---------------- HERO ---------------- */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={ref} className="relative isolate min-h-screen overflow-hidden pt-32">
      <motion.div style={{ y, opacity }} className="pointer-events-none absolute inset-0 -z-10">
        <img src={heroBg} alt="" width={1920} height={1280} className="h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
        <div className="absolute inset-0 grid-lines opacity-40" />
      </motion.div>

      {/* radial glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-primary/20 blur-[140px] animate-glow-pulse" />

      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs text-primary backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-glow-pulse" />
          Q3 Tranche Closing · 1,497 of 1,500 Client Seats Filled
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.16,1,0.3,1] }}
              className="text-4xl leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.5rem]">
              Compound your capital with <em className="font-display italic text-gradient-gold">institutional discipline</em>.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.8 }}
              className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Aurelian Capital enforces a strict hard cap on active mandates to maximize ROI and protect outsized returns for our clients. 
              With institutional demand surging, our Q3 allocation is 99% full. Apply immediately to bypass the 14-month waitlist.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-8 flex flex-col sm:flex-row flex-wrap items-center gap-3 sm:gap-4">
              <MagneticButton href="#contact">Apply for 1 of 3 Remaining Seats</MagneticButton>
              <MagneticButton variant="ghost" href="#contact">Join the Waitlist</MagneticButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 1 }}
              className="mt-10 sm:mt-16 flex flex-wrap items-center gap-x-4 gap-y-3 sm:gap-x-8 sm:gap-y-4 text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.24em] text-muted-foreground">
              <span className="flex items-center gap-1.5 sm:gap-2"><Lock className="h-3.5 w-3.5 text-primary" /> SOC 2 Type II</span>
              <span className="flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5 text-primary" /> Qualified Custody</span>
              <span className="flex items-center gap-2"><Award className="h-3.5 w-3.5 text-primary" /> FinCEN Registered</span>
            </motion.div>
          </div>

          {/* Floating stat card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 1 }}
            className="relative lg:mt-12">
            <div className="glass relative rounded-3xl p-6 shadow-[var(--shadow-elegant)]">
              <div className="flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground">
                <span>Closed Institutional Portfolio</span>
                <span className="flex items-center gap-1 text-primary"><TrendingUp className="h-3 w-3" /> Live</span>
              </div>
              <div className="mt-6 flex items-end justify-between">
                <div>
                  <div className="font-display text-4xl sm:text-5xl tracking-tight">
                    <Counter to={42.7} decimals={1} suffix="%" />
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">Annualized net return · 3Y</div>
                </div>
                <div className="text-right text-xs text-muted-foreground">
                  <div>AUM</div>
                  <div className="mt-1 font-display text-xl text-foreground">$<Counter to={1.84} decimals={2} />B</div>
                </div>
              </div>

              {/* mini chart */}
              <svg viewBox="0 0 300 90" className="mt-6 w-full">
                <defs>
                  <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.82 0.14 78)" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="oklch(0.82 0.14 78)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <motion.path
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 1 }}
                  d="M0,70 C40,60 60,40 90,45 C130,52 150,20 190,25 C230,30 250,10 300,15"
                  fill="none" stroke="oklch(0.82 0.14 78)" strokeWidth="2" />
                <path d="M0,70 C40,60 60,40 90,45 C130,52 150,20 190,25 C230,30 250,10 300,15 L300,90 L0,90 Z" fill="url(#g1)" />
              </svg>

              <div className="mt-6 grid grid-cols-3 gap-3 text-xs">
                {[["BTC","38%"],["ETH","27%"],["Alt","35%"]].map(([k,v]) => (
                  <div key={k} className="rounded-xl bg-secondary/60 p-3">
                    <div className="text-muted-foreground">{k}</div>
                    <div className="mt-1 font-display text-base text-foreground">{v}</div>
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="glass absolute -left-8 -top-6 hidden rounded-2xl px-4 py-3 md:block">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Sharpe</div>
              <div className="font-display text-xl">1.94</div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 12, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="glass absolute -bottom-6 -right-4 hidden rounded-2xl px-4 py-3 md:block border border-primary/30 bg-primary/5">
              <div className="text-[10px] uppercase tracking-widest text-primary font-bold">Seats Remaining</div>
              <div className="font-display text-xl text-primary">3</div>
            </motion.div>
          </motion.div>
        </div>

        {/* market ticker */}
        <div className="relative mt-24 overflow-hidden border-y border-border/60 py-5">
          <div className="animate-ticker flex whitespace-nowrap">
            {[...Array(2)].map((_,i)=>(
              <div key={i} className="flex shrink-0 items-center gap-10 pr-10 text-sm text-muted-foreground">
                {[
                  ["BTC/USD","67,842.20","+2.14%"],["ETH/USD","3,584.10","+1.82%"],["SOL/USD","178.43","+4.02%"],
                  ["AVAX/USD","42.11","+0.94%"],["ARB/USD","1.24","+3.31%"],["LINK/USD","18.02","+2.18%"],
                  ["MATIC/USD","0.87","+1.11%"],["ATOM/USD","9.14","+0.72%"],
                ].map(([s,p,c]) => (
                  <span key={s+i} className="flex items-center gap-2">
                    <span className="text-foreground">{s}</span>
                    <span>{p}</span>
                    <span className="text-primary">{c}</span>
                    <span className="text-border">·</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}



/* ---------------- RESULTS ---------------- */


const faqs = [
  { q: "How do you consistently improve our invested capital?", a: "By combining AI-assisted quantitative models with rigorous risk management, we aggressively harvest market volatility to compound your portfolio through every cycle." },
  { q: "How are my assets custodied while generating yield?", a: "All client assets are held with qualified third-party custodians in segregated, insured cold-storage - never on our balance sheet." },
  { q: "How often is the portfolio rebalanced for maximum ROI?", a: "Weekly by mandate, with intra-week tactical adjustments during defined regime shifts to protect and grow your capital." },
  { q: "Can I withdraw my gains at any time?", a: "Yes. Liquidity is T+2 for most mandates, with no lockups on our core strategies." },
];

function Results() {
  return (
    <section id="faq" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionLabel
            eyebrow="Highly Exclusive & Proven"
            title={<>Trusted by leading institutions. <em className="font-display italic text-gradient-gold">Closed to the general public</em>.</>}
          />
          <div className="flex items-center gap-2">
            {[...Array(5)].map((_,i) => <Star key={i} className="h-5 w-5 fill-primary text-primary" />)}
            <span className="ml-2 text-sm text-muted-foreground">Allocations strictly capped at 1,500 active clients.</span>
          </div>
        </div>


        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.5fr]">
          <div>
            <div className="text-xs uppercase tracking-widest text-primary">FAQ</div>
            <h3 className="mt-4 text-3xl leading-tight">Questions before you allocate?</h3>
            <p className="mt-4 text-sm text-muted-foreground">Every mandate starts with a conversation. If your question isn't here, our team responds within one business day.</p>
          </div>
          <div className="divide-y divide-border rounded-3xl border border-border">
            {faqs.map((f) => (
              <details key={f.q} className="group px-6 py-5 [&_summary]:list-none">
                <summary className="flex cursor-pointer items-center justify-between gap-4">
                  <span className="text-base text-foreground">{f.q}</span>
                  <span className="grid h-8 w-8 place-items-center rounded-full border border-border text-primary transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- CONTACT ---------------- */

function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "CH",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMsg("");

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
        setSuccessMsg(data.message || "Contact submission successful.");
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
    <section id="contact" className="relative py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]" />
      </div>
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel
          eyebrow="Final Call: Q3 Allocation Closing"
          title={<>Secure one of the final <em className="font-display italic text-gradient-gold">3 client mandates</em>.</>}
          kicker="Due to unprecedented institutional demand and our strict cap on active mandates, Q3 enrollment is closing permanently within 48 hours. Submit your details immediately to bypass the waitlist and secure a priority consultation."
        />

        <div className="mt-16 mx-auto max-w-2xl">
          <form
            onSubmit={handleSubmit}
            className="glass rounded-3xl p-8 md:p-10">
            
            {error && (
              <div className="mb-6 rounded-lg bg-red-500/10 p-4 text-sm text-red-500 border border-red-500/20">
                {error}
              </div>
            )}
            
            {successMsg && (
              <div className="mb-6 rounded-lg bg-primary/10 p-4 text-sm text-primary border border-primary/20">
                {successMsg}
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
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs text-muted-foreground">By submitting, you consent to being contacted by an Aurelian advisor.</p>
              <button disabled={loading || sent} type="submit" className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-gold-soft disabled:opacity-50">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : sent ? "Request Received" : "Request Consultation"}
                {!loading && !sent && <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", as = "input", options = [] }:
  { label: string; name: string; type?: string; as?: "input" | "textarea" | "select"; options?: string[] }) {
  const base = "peer w-full rounded-xl border border-border bg-background/50 px-4 pb-2.5 pt-6 text-sm text-foreground placeholder-transparent transition-colors focus:border-primary focus:outline-none";
  return (
    <label className="relative block">
      {as === "textarea" ? (
        <textarea name={name} rows={4} placeholder={label} className={base} />
      ) : as === "select" ? (
        <select name={name} defaultValue="" className={base + " appearance-none"}>
          <option value="" disabled></option>
          {options.map(o => <option key={o} className="bg-background">{o}</option>)}
        </select>
      ) : (
        <input type={type} name={name} placeholder={label} className={base} />
      )}
      <span className="pointer-events-none absolute left-4 top-2 text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
    </label>
  );
}



/* ---------------- EXCLUSIVITY ---------------- */

function Exclusivity() {
  return (
    <section id="exclusivity" className="relative py-32 border-y border-border/50 bg-surface/30">
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel
          eyebrow="Strict Capacity Constraints"
          title={<>Why our mandates are <em className="font-display italic text-gradient-gold">impossible to get</em>.</>}
          kicker="Aurelian Capital’s algorithmic trading models are highly sensitive to market liquidity. If our AUM scales beyond our proprietary threshold, yields compress. To protect the outsized returns of our existing partners, we enforce a ruthless hard cap on active capital. We do not apologize for this exclusivity."
        />
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {[
            { n: "1,500", l: "Absolute Client Cap" },
            { n: "14 Mo", l: "Current Waitlist" },
            { n: "3", l: "Slots Available Now" },
          ].map(s => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="glass rounded-3xl p-8 border border-primary/20 text-center">
              <div className="font-display text-5xl text-gradient-gold">{s.n}</div>
              <div className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">{s.l}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- ROOT ---------------- */

const popupMessages = [
  "1 mandate just secured by a Family Office in Geneva",
  "Institutional allocation filled from London",
  "Waitlist bypassed: Client admitted from Zurich",
  "Capacity warning: Only 2 priority slots remaining",
  "New mandate secured by a private client in Dubai"
];

function FomoPopup() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let hideTimeout: NodeJS.Timeout;
    
    const trigger = () => {
      setVisible(true);
      hideTimeout = setTimeout(() => setVisible(false), 5000);
    };

    const initial = setTimeout(trigger, 2000);
    
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % popupMessages.length);
      trigger();
    }, 12000);

    return () => {
      clearTimeout(initial);
      clearTimeout(hideTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="hidden md:flex fixed bottom-6 left-6 z-[100] items-center gap-3 rounded-2xl border border-primary/30 bg-background/90 p-4 shadow-[0_0_40px_oklch(0.82_0.14_78/0.2)] backdrop-blur-xl"
        >
          <div className="grid h-8 w-8 place-items-center rounded-full bg-primary/20 text-primary">
            <TrendingUp className="h-4 w-4" />
          </div>
          <p className="text-xs font-medium text-foreground sm:text-sm">{popupMessages[index]}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function UrgentModal() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
    return () => { document.body.style.overflow = 'auto'; }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 backdrop-blur-md bg-background/80">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-lg overflow-hidden rounded-3xl border border-primary/30 bg-surface shadow-[0_0_80px_oklch(0.82_0.14_78/0.15)]"
          >
            <div className="p-8 sm:p-10 text-center">
              <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full bg-primary/20 text-primary">
                <Lock className="h-8 w-8" />
              </div>
              <h2 className="font-display text-3xl text-gradient-gold sm:text-4xl pb-1">High Demand Notice</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Due to extremely high demand, our current enrollment is almost entirely full. We currently have exactly <strong className="text-foreground">3 spots remaining</strong> for new clients.
              </p>
              <p className="mt-4 text-sm text-primary font-medium">
                Once these final spots are taken, you will be placed on a 14-month waitlist.
              </p>
              <button 
                onClick={() => setOpen(false)}
                className="mt-10 w-full rounded-full bg-primary px-6 py-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-gold-soft"
              >
                I Understand & Enter Site
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default function Landing() {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <main className="relative">
      <UrgentModal />
      <FomoPopup />
      <Nav onLoginClick={() => setAuthModalOpen(true)} />
      <Hero />
      <Exclusivity />
      <Results />
      <Contact />
      <Footer />
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </main>
  );
}
