import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { demoLocks, demoBalance } from "@/data/mockData";
import { Lock, Clock, CheckCircle2, Copy, Plus, Shield, FileText, Mic, Key } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const durations = ["3 months", "6 months", "1 year", "2 years", "5 years", "10 years", "25 years", "50 years"];
const unlockOptions = [
  { id: "passphrase", label: "Secret Passphrase", icon: Key, desc: "Custom text passphrase" },
  { id: "file", label: "File Verification", icon: FileText, desc: "Upload matching file to unlock" },
  { id: "2fa", label: "Authenticator Code", icon: Shield, desc: "6-digit TOTP code" },
  { id: "voice", label: "Voice Recognition", icon: Mic, desc: "Simulated biometric" },
];

function getCountdown(endDate: string) {
  const diff = new Date(endDate).getTime() - Date.now();
  if (diff <= 0) return "Expired";
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  return `${d}d ${h}h remaining`;
}

const Vault = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState("");
  const [selectedMethods, setSelectedMethods] = useState<string[]>([]);
  const [passphrase, setPassphrase] = useState("");

  const toggleMethod = (id: string) => {
    setSelectedMethods((prev) => (prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]));
  };

  const handleCreate = () => {
    if (!amount || !duration || selectedMethods.length === 0) {
      toast.error("Please fill all fields and select at least one unlock method");
      return;
    }
    const code = `EV-LOCK-${Math.random().toString(36).slice(2, 6).toUpperCase()}${Math.floor(1000 + Math.random() * 9000)}`;
    toast.success(`Vault locked! Code: ${code}`);
    setShowCreate(false);
    setAmount("");
    setDuration("");
    setSelectedMethods([]);
    setPassphrase("");
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Lock code copied to clipboard");
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Vault Lock System</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage your locked digital assets</p>
          </div>
          <button
            onClick={() => setShowCreate(!showCreate)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" /> New Lock
          </button>
        </div>

        {/* Create new lock */}
        <AnimatePresence>
          {showCreate && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="glass p-6 space-y-6">
                <h3 className="text-lg font-semibold text-foreground">Create New Vault Lock</h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Lock Amount ($)</label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder={`Max: $${demoBalance.available.toLocaleString()}`}
                      max={demoBalance.available}
                      className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Lock Duration</label>
                    <select
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    >
                      <option value="">Select duration</option>
                      {durations.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground block mb-3">Unlock Methods</label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {unlockOptions.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => toggleMethod(opt.id)}
                        className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${
                          selectedMethods.includes(opt.id)
                            ? "border-primary bg-primary/5"
                            : "border-border bg-secondary/50 hover:border-glass-highlight"
                        }`}
                      >
                        <opt.icon className={`w-5 h-5 ${selectedMethods.includes(opt.id) ? "text-primary" : "text-muted-foreground"}`} />
                        <div>
                          <p className="text-sm font-medium text-foreground">{opt.label}</p>
                          <p className="text-xs text-muted-foreground">{opt.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {selectedMethods.includes("passphrase") && (
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Secret Passphrase</label>
                    <input
                      type="password"
                      value={passphrase}
                      onChange={(e) => setPassphrase(e.target.value)}
                      placeholder="Enter your secret passphrase"
                      className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={handleCreate}
                    className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    Confirm & Lock
                  </button>
                  <button
                    onClick={() => setShowCreate(false)}
                    className="px-6 py-2.5 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Existing locks */}
        <div className="grid gap-4">
          {demoLocks.map((lock, i) => (
            <motion.div
              key={lock.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass-hover p-6"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    lock.status === "active" ? "bg-primary/10" : "bg-muted"
                  }`}>
                    {lock.status === "active" ? (
                      <Lock className="w-5 h-5 text-primary" />
                    ) : (
                      <CheckCircle2 className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-medium text-foreground">{lock.code}</span>
                      <button onClick={() => copyCode(lock.code)} className="text-muted-foreground hover:text-foreground">
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-2xl font-bold text-foreground mt-1">${lock.amount.toLocaleString()}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span>{lock.duration}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {getCountdown(lock.endDate)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    lock.status === "active" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                  }`}>
                    {lock.status === "active" ? "Active" : "Expired"}
                  </span>
                  <div className="flex gap-1">
                    {lock.unlockMethods.map((m) => (
                      <span key={m} className="px-2 py-0.5 rounded bg-secondary text-xs text-muted-foreground capitalize">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Vault;
