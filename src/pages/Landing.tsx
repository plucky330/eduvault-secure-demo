import { Link } from "react-router-dom";
import { Shield, Lock, Eye, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: Lock, title: "Vault Lock System", desc: "Lock digital assets with customizable durations and multi-layer authentication" },
  { icon: Shield, title: "Multi-Factor Auth", desc: "2FA, passphrases, file verification, and simulated biometrics" },
  { icon: Eye, title: "Security Monitoring", desc: "Real-time activity logs, login alerts, and intrusion detection" },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px]" />
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 lg:px-12 py-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <span className="text-xl font-bold gradient-text">EduVault</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Sign In
          </Link>
          <Link
            to="/signup"
            className="px-5 py-2.5 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pt-20 pb-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-warning/10 text-warning text-xs font-medium border border-warning/20 mb-8">
            <Shield className="w-3 h-3" /> Educational Simulation Only — No Real Transactions
          </span>

          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
            <span className="text-foreground">Secure Digital</span>
            <br />
            <span className="gradient-text">Asset Vault</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            A premium fintech simulation platform for learning about digital asset authentication,
            vault security, and multi-layer protection systems.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              to="/signup"
              className="group flex items-center gap-2 px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all glow-border"
            >
              Launch Vault Demo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/login"
              className="px-8 py-3.5 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors border border-border"
            >
              Sign In
            </Link>
          </div>
        </motion.div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-24">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="glass-hover p-8 text-left group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 flex items-center justify-center gap-8 flex-wrap text-sm text-muted-foreground"
        >
          {["AES-256 Encryption Simulated", "Multi-Factor Auth", "Real-time Monitoring"].map((t) => (
            <span key={t} className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" /> {t}
            </span>
          ))}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border py-8 text-center">
        <p className="text-xs text-muted-foreground">
          © 2026 EduVault — Educational Simulation Platform. No real financial transactions occur.
        </p>
      </footer>
    </div>
  );
};

export default Landing;
