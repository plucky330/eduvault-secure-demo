import { Link } from "react-router-dom";
import { Shield, Lock, Eye, ArrowRight, Fingerprint, Server, Activity } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: "256-bit", label: "AES Encryption" },
  { value: "99.97%", label: "Uptime SLA" },
  { value: "<50ms", label: "Auth Latency" },
  { value: "24/7", label: "Threat Monitoring" },
];

const features = [
  {
    icon: Lock,
    title: "Vault Lock System",
    desc: "Time-locked digital asset storage with configurable durations from 90 days to 50 years.",
  },
  {
    icon: Fingerprint,
    title: "Multi-Layer Auth",
    desc: "Passphrase, file verification, TOTP, and biometric authentication layers.",
  },
  {
    icon: Activity,
    title: "Audit Trail",
    desc: "Immutable security logs with device fingerprinting and geolocation tracking.",
  },
  {
    icon: Server,
    title: "Infrastructure",
    desc: "Distributed vault architecture with automated failover and zero-knowledge proofs.",
  },
];

const SectionReveal = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Landing = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-14">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
              <Shield className="w-4.5 h-4.5 text-primary" />
            </div>
            <span className="text-base font-semibold tracking-tight">EduVault</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="px-4 py-1.5 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors active:scale-[0.97]"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-secondary/50 text-xs text-muted-foreground mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Systems Operational
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.08] text-foreground" style={{ textWrap: "balance" }}>
            Digital Asset
            <br />
            Security Platform
          </h1>

          <p className="text-base text-muted-foreground mt-5 leading-relaxed max-w-lg">
            Enterprise-grade vault infrastructure for digital asset authentication, time-locked storage, and multi-factor verification.
          </p>

          <div className="flex items-center gap-3 mt-8">
            <Link
              to="/login"
              className="group flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all active:scale-[0.97]"
            >
              Access Vault
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/signup"
              className="px-6 py-2.5 rounded-lg text-sm font-medium text-foreground bg-secondary hover:bg-secondary/70 border border-border transition-colors active:scale-[0.97]"
            >
              Create Account
            </Link>
          </div>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-px mt-20 rounded-xl overflow-hidden border border-border bg-border"
        >
          {stats.map((s) => (
            <div key={s.label} className="bg-card px-5 py-5 text-center">
              <div className="text-lg font-semibold text-foreground font-mono tracking-tight">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-20 border-t border-border">
        <SectionReveal>
          <div className="mb-12">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">Security Architecture</h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-md">
              Multi-layered protection designed for institutional-grade digital asset management.
            </p>
          </div>
        </SectionReveal>

        <div className="grid sm:grid-cols-2 gap-4">
          {features.map((f, i) => (
            <SectionReveal key={f.title} delay={i * 0.08}>
              <div className="group bg-card border border-border rounded-xl p-6 hover:border-muted-foreground/20 transition-all duration-300 hover:shadow-md h-full">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors duration-300">
                  <f.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-1.5">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-20 border-t border-border">
        <SectionReveal>
          <div className="bg-card border border-border rounded-xl p-8 sm:p-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Ready to secure your assets?</h2>
              <p className="text-sm text-muted-foreground mt-1.5">Access your vault with enterprise-grade authentication.</p>
            </div>
            <Link
              to="/login"
              className="group flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all active:scale-[0.97] shrink-0"
            >
              Sign In
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </SectionReveal>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-6 text-center">
        <p className="text-xs text-muted-foreground">© 2026 EduVault</p>
      </footer>
    </div>
  );
};

export default Landing;
