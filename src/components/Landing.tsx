import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ShieldCheck, LineChart, Layers, Cpu, FileText, Building2,
  ArrowUpRight, Check, Star, Quote, Mail, Phone, MapPin, Clock,
  Twitter, Linkedin, Github, Sparkles, TrendingUp, Lock, Award,
} from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

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
  const base = "group relative inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-colors";
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

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}>
      <div className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-500 ${scrolled ? "glass rounded-full py-2.5" : ""}`}>
        <a href="#" className="flex items-center gap-2.5">
          <div className="grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="font-display text-lg tracking-tight">Aurelian<span className="text-primary">.</span>Capital</span>
        </a>
        <nav className="hidden items-center gap-9 text-sm text-muted-foreground md:flex">
          {["Philosophy","Process","Results","Contact"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="transition-colors hover:text-foreground">{l}</a>
          ))}
        </nav>
        <a href="#contact" className="hidden rounded-full border border-border px-4 py-2 text-sm text-foreground transition-colors hover:bg-secondary md:inline-flex">
          Investor Login
        </a>
      </div>
    </header>
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
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-glow-pulse" />
          Regulated digital asset management · Est. 2017
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.16,1,0.3,1] }}
              className="text-5xl leading-[0.98] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.5rem]">
              Compounding <em className="font-display italic text-gradient-gold">digital&nbsp;wealth</em><br />
              with institutional discipline.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.8 }}
              className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Aurelian Capital designs, custodies, and actively manages diversified crypto portfolios
              for private clients and institutions — with the rigor of a modern asset manager and the
              conviction of a long-term investor.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-10 flex flex-wrap items-center gap-4">
              <MagneticButton href="#contact">Start Investing</MagneticButton>
              <MagneticButton variant="ghost" href="#contact">Book Consultation</MagneticButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 1 }}
              className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-4 text-xs uppercase tracking-[0.24em] text-muted-foreground">
              <span className="flex items-center gap-2"><Lock className="h-3.5 w-3.5 text-primary" /> SOC 2 Type II</span>
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
                <span>Flagship Portfolio</span>
                <span className="flex items-center gap-1 text-primary"><TrendingUp className="h-3 w-3" /> Live</span>
              </div>
              <div className="mt-6 flex items-end justify-between">
                <div>
                  <div className="font-display text-5xl tracking-tight">
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
              className="glass absolute -bottom-6 -right-4 hidden rounded-2xl px-4 py-3 md:block">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Clients</div>
              <div className="font-display text-xl">12,400+</div>
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

/* ---------------- PHILOSOPHY ---------------- */

const pillars = [
  { icon: Layers, title: "Portfolio Diversification", body: "Multi-strategy allocation across BTC, ETH, layer-1s, and yield-bearing assets — engineered to compound through cycles." },
  { icon: ShieldCheck, title: "Institutional-Grade Custody", body: "Qualified custodians, cold-storage, multi-sig controls, and third-party attestation on every basis point." },
  { icon: Cpu, title: "AI-Assisted Research", body: "Quantitative signals and human conviction combined — proprietary models score liquidity, risk, and regime shifts daily." },
  { icon: LineChart, title: "Active Asset Management", body: "A dedicated investment committee rebalances weekly, harvests volatility, and manages drawdowns with discipline." },
  { icon: FileText, title: "Transparent Reporting", body: "Monthly performance letters, real-time dashboards, audited returns — you always see exactly what you own." },
  { icon: Building2, title: "Regulated Operations", body: "Registered with FinCEN, SOC 2 Type II certified, and structured under a segregated fund vehicle." },
];

function Philosophy() {
  return (
    <section id="philosophy" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel
          eyebrow="Why Aurelian"
          title={<>A philosophy built for <em className="font-display italic text-gradient-gold">the next decade</em>, not the next quarter.</>}
          kicker="We manage capital the way private banks have for a century — with fiduciary rigor, defensive discipline, and long-horizon conviction — applied to the most important asset class of our lifetime."
        />

        <div className="mt-20 grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, delay: i * 0.06 }}
              className="group relative bg-background p-8 transition-colors hover:bg-surface md:p-10">
              <div className="mb-6 grid h-11 w-11 place-items-center rounded-xl border border-border bg-surface text-primary transition-colors group-hover:border-primary/40">
                <p.icon className="h-5 w-5" />
              </div>
              <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">0{i+1}</div>
              <h3 className="text-2xl">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </motion.div>
          ))}
        </div>

        {/* stats strip */}
        <div className="mt-16 grid gap-8 rounded-3xl border border-border bg-gradient-to-br from-surface to-background p-10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { v: 1.84, prefix: "$", suffix: "B", d: 2, label: "Assets under management" },
            { v: 12400, suffix: "+", d: 0, label: "Private & institutional clients" },
            { v: 42.7, suffix: "%", d: 1, label: "3-year annualized return" },
            { v: 99.98, suffix: "%", d: 2, label: "Custody uptime, 5-year record" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-display text-4xl tracking-tight text-gradient-gold sm:text-5xl">
                <Counter to={s.v} prefix={s.prefix} suffix={s.suffix} decimals={s.d} />
              </div>
              <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- PROCESS ---------------- */

const steps = [
  { n: "01", t: "Discovery Consultation", d: "A private call with a portfolio strategist to understand your goals, horizon, risk tolerance, and existing exposure." },
  { n: "02", t: "Portfolio Construction", d: "We build a bespoke allocation aligned to your mandate — conservative income, balanced growth, or opportunistic alpha." },
  { n: "03", t: "Secure Allocation", d: "Funds settle into segregated qualified custody. You retain audit-visible ownership at every step." },
  { n: "04", t: "Active Management & Reporting", d: "Weekly rebalancing, monthly investor letters, and 24/7 dashboards. Your dedicated advisor is a call away." },
];

function Process() {
  return (
    <section id="process" className="relative py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel
          eyebrow="The Process"
          title={<>From first conversation to <em className="font-display italic text-gradient-gold">compounding capital</em>.</>}
          kicker="A four-step onboarding designed to feel closer to a private wealth relationship than a fintech signup."
        />

        <div className="relative mt-20">
          <div className="absolute left-8 top-0 hidden h-full w-px bg-gradient-to-b from-primary/40 via-border to-transparent lg:block" />
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, delay: i * 0.1 }}
                className={`relative rounded-3xl border border-border bg-surface p-8 md:p-10 ${i % 2 ? "lg:mt-16" : ""}`}>
                <div className="mb-8 flex items-start justify-between">
                  <div className="font-display text-6xl text-gradient-gold">{s.n}</div>
                  <div className="grid h-10 w-10 place-items-center rounded-full border border-border text-primary">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
                <h3 className="text-2xl">{s.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
                <div className="mt-6 hairline" />
                <div className="mt-4 flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
                  <Check className="h-3.5 w-3.5 text-primary" /> Typical timeline: {["48 hrs","3–5 days","24 hrs","Ongoing"][i]}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- RESULTS ---------------- */

const testimonials = [
  { q: "Aurelian gave us the operational assurance our board required to allocate a meaningful sleeve of our treasury into digital assets.", a: "Marcus Vale", r: "CIO, Northbridge Family Office" },
  { q: "Their reporting is what finally made crypto legible to my accountants. The performance is a bonus.", a: "Elena Zhou", r: "Founder, Meridian Ventures" },
  { q: "Rare combination of long-term conviction and disciplined risk management. They compounded through the last cycle without a scare.", a: "James Okafor", r: "Managing Partner, Halcyon Advisors" },
];

const faqs = [
  { q: "What is the minimum investment?", a: "Private client mandates begin at $50,000. Institutional and family office allocations begin at $1M." },
  { q: "How are my assets custodied?", a: "All client assets are held with qualified third-party custodians in segregated, insured cold-storage — never on our balance sheet." },
  { q: "How often is the portfolio rebalanced?", a: "Weekly by mandate, with intra-week tactical adjustments during defined regime shifts." },
  { q: "Can I withdraw at any time?", a: "Yes. Liquidity is T+2 for most mandates, with no lockups on our core strategies." },
];

function Results() {
  return (
    <section id="results" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionLabel
            eyebrow="Trust & Results"
            title={<>Compounding trust, <em className="font-display italic text-gradient-gold">portfolio by portfolio</em>.</>}
          />
          <div className="flex items-center gap-2">
            {[...Array(5)].map((_,i) => <Star key={i} className="h-5 w-5 fill-primary text-primary" />)}
            <span className="ml-2 text-sm text-muted-foreground">4.9 · 1,240+ verified reviews</span>
          </div>
        </div>

        {/* testimonials */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.a}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass flex h-full flex-col rounded-3xl p-8">
              <Quote className="h-6 w-6 text-primary" />
              <blockquote className="mt-6 flex-1 font-display text-xl leading-snug tracking-tight">"{t.q}"</blockquote>
              <figcaption className="mt-8">
                <div className="text-sm text-foreground">{t.a}</div>
                <div className="text-xs text-muted-foreground">{t.r}</div>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        {/* awards + partners */}
        <div className="mt-16 grid gap-10 rounded-3xl border border-border bg-surface p-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Recognized by</div>
            <h3 className="mt-4 text-3xl leading-tight">Trusted by the industry, awarded by its peers.</h3>
            <div className="mt-6 flex flex-wrap gap-3">
              {["Best Digital Asset Manager 2025","Top 50 Fintech","Wealth Innovator Award"].map(a => (
                <span key={a} className="rounded-full border border-border bg-background px-4 py-2 text-xs text-muted-foreground">{a}</span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4">
            {["FORBES","BLOOMBERG","REUTERS","COINDESK","FT","WSJ","BARRON'S","THE BLOCK"].map(n => (
              <div key={n} className="bg-surface px-4 py-6 text-center font-display text-sm tracking-widest text-muted-foreground">{n}</div>
            ))}
          </div>
        </div>

        {/* FAQ */}
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
  return (
    <section id="contact" className="relative py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]" />
      </div>
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel
          eyebrow="Begin the Conversation"
          title={<>Schedule a private <em className="font-display italic text-gradient-gold">strategy call</em>.</>}
          kicker="Share a few details and a portfolio strategist will reach out within one business day to explore whether we're the right fit."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="glass rounded-3xl p-8 md:p-10">
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Full Name" name="name" />
              <Field label="Email Address" name="email" type="email" />
              <Field label="Phone Number" name="phone" type="tel" />
              <Field label="Investment Budget" name="budget" as="select" options={["Under $50k","$50k – $250k","$250k – $1M","$1M – $5M","$5M+"]} />
            </div>
            <div className="mt-5">
              <Field label="Investment Goals" name="goals" as="select" options={["Capital preservation","Balanced growth","Aggressive growth","Yield & income","Diversification hedge"]} />
            </div>
            <div className="mt-5">
              <Field label="Message" name="message" as="textarea" />
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs text-muted-foreground">By submitting, you consent to being contacted by an Aurelian advisor.</p>
              <button type="submit" className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-gold-soft">
                {sent ? "Request Received" : "Request Consultation"}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
            </div>
          </form>

          <div className="space-y-4">
            <div className="glass rounded-3xl p-8">
              <div className="text-xs uppercase tracking-widest text-primary">Global Offices</div>
              <ul className="mt-6 space-y-5 text-sm">
                <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 text-primary" /><div><div className="text-foreground">Headquarters</div><div className="text-muted-foreground">32 Old Broad Street, London EC2N 1HQ</div></div></li>
                <li className="flex items-start gap-3"><Mail className="mt-0.5 h-4 w-4 text-primary" /><div><div className="text-foreground">clients@aurelian.capital</div><div className="text-muted-foreground">General inquiries</div></div></li>
                <li className="flex items-start gap-3"><Phone className="mt-0.5 h-4 w-4 text-primary" /><div><div className="text-foreground">+44 20 4534 8890</div><div className="text-muted-foreground">Client desk</div></div></li>
                <li className="flex items-start gap-3"><Clock className="mt-0.5 h-4 w-4 text-primary" /><div><div className="text-foreground">Mon – Fri · 08:00 – 19:00 GMT</div><div className="text-muted-foreground">Emergency line 24/7 for clients</div></div></li>
              </ul>
              <div className="mt-6 flex gap-2">
                {[Twitter, Linkedin, Github].map((I, i) => (
                  <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary">
                    <I className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="relative h-56 overflow-hidden rounded-3xl border border-border bg-surface">
              <div className="absolute inset-0 grid-lines opacity-60" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,oklch(0.82_0.14_78/0.25),transparent_70%)]" />
              <svg viewBox="0 0 400 200" className="absolute inset-0 h-full w-full opacity-70">
                <path d="M0,120 Q100,80 200,110 T400,90" stroke="oklch(0.82 0.14 78 / 0.6)" strokeWidth="1" fill="none" />
                <path d="M0,150 Q120,110 220,140 T400,120" stroke="oklch(0.82 0.14 78 / 0.4)" strokeWidth="1" fill="none" />
              </svg>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="relative mx-auto mb-2 grid h-10 w-10 place-items-center rounded-full bg-primary/20">
                  <span className="h-2 w-2 rounded-full bg-primary animate-glow-pulse" />
                </div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">London · UK</div>
              </div>
            </div>
          </div>
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

/* ---------------- FOOTER ---------------- */

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <a href="#" className="flex items-center gap-2.5">
              <div className="grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="font-display text-lg tracking-tight">Aurelian<span className="text-primary">.</span>Capital</span>
            </a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              A regulated digital asset management firm building long-horizon crypto portfolios for private clients and institutions worldwide.
            </p>
          </div>
          {[
            { h: "Company", l: ["Philosophy","Team","Careers","Press"] },
            { h: "Products", l: ["Flagship Fund","Yield Mandate","Institutional","Advisory"] },
            { h: "Legal", l: ["Privacy Policy","Terms of Service","Disclaimer","Regulatory Disclosures"] },
          ].map(c => (
            <div key={c.h}>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">{c.h}</div>
              <ul className="mt-5 space-y-2 text-sm">
                {c.l.map(x => <li key={x}><a href="#" className="text-foreground/80 transition-colors hover:text-primary">{x}</a></li>)}
              </ul>
            </div>
          ))}
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

/* ---------------- ROOT ---------------- */

export default function Landing() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <Philosophy />
      <Process />
      <Results />
      <Contact />
      <Footer />
    </main>
  );
}
