import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { demoBalance } from "@/data/mockData";
import { ArrowRight, CheckCircle2, Loader2, Shield, AlertTriangle, Link2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

type Step = "amount" | "destination" | "unlock" | "otp" | "confirm" | "complete";

const Withdraw = () => {
  const [step, setStep] = useState<Step>("amount");
  const [amount, setAmount] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const [otp, setOtp] = useState("");
  const [processing, setProcessing] = useState(false);
  const [binanceLinking, setBinanceLinking] = useState(false);
  const [binanceError, setBinanceError] = useState(false);
  const txId = `TX-${Math.random().toString(36).slice(2, 9).toUpperCase()}`;

  const steps: { key: Step; label: string }[] = [
    { key: "amount", label: "Amount" },
    { key: "destination", label: "Destination" },
    { key: "unlock", label: "Verify" },
    { key: "otp", label: "OTP" },
    { key: "confirm", label: "Confirm" },
  ];

  const currentIdx = steps.findIndex((s) => s.key === step);

  const handleBinanceLink = async () => {
    setBinanceLinking(true);
    setBinanceError(false);
    await new Promise((r) => setTimeout(r, 2500));
    setBinanceLinking(false);
    setBinanceError(true);
  };

  const handleConfirm = async () => {
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 2000));
    setProcessing(false);
    setStep("complete");
  };

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Withdrawal Simulation</h1>
          <p className="text-sm text-muted-foreground mt-1">Multi-step verification process</p>
        </div>

        {/* Progress */}
        {step !== "complete" && (
          <div className="flex items-center gap-2">
            {steps.map((s, i) => (
              <div key={s.key} className="flex items-center gap-2 flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                  i <= currentIdx ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                }`}>
                  {i < currentIdx ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                </div>
                <span className={`text-xs hidden sm:block ${i <= currentIdx ? "text-foreground" : "text-muted-foreground"}`}>
                  {s.label}
                </span>
                {i < steps.length - 1 && <div className={`flex-1 h-px ${i < currentIdx ? "bg-primary" : "bg-border"}`} />}
              </div>
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === "amount" && (
            <motion.div key="amount" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="glass p-8">
              <h3 className="text-lg font-semibold text-foreground mb-2">Select Amount</h3>
              <p className="text-sm text-muted-foreground mb-6">Available: ${demoBalance.available.toLocaleString()}</p>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                max={demoBalance.available}
                placeholder="Enter amount"
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-lg focus:outline-none focus:ring-2 focus:ring-primary/30 mb-6"
              />
              <div className="flex gap-2 mb-6">
                {[1000, 5000, 10000, 25000].map((v) => (
                  <button
                    key={v}
                    onClick={() => setAmount(v.toString())}
                    className="px-4 py-2 rounded-lg bg-secondary text-sm text-secondary-foreground hover:bg-secondary/80 transition-colors"
                  >
                    ${v.toLocaleString()}
                  </button>
                ))}
              </div>
              <button
                onClick={() => amount && setStep("destination")}
                disabled={!amount}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {step === "destination" && (
            <motion.div key="destination" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="glass p-8">
              <h3 className="text-lg font-semibold text-foreground mb-2">Select Destination</h3>
              <p className="text-sm text-muted-foreground mb-6">Link your exchange account to withdraw funds</p>

              <div className="space-y-4">
                {/* Binance option */}
                <div className="p-4 rounded-lg border border-border bg-secondary/30">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[hsl(45,100%,51%)]/10 flex items-center justify-center">
                        <span className="text-lg font-bold text-[hsl(45,100%,51%)]">B</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Binance</p>
                        <p className="text-xs text-muted-foreground">Link your Binance account</p>
                      </div>
                    </div>
                    <button
                      onClick={handleBinanceLink}
                      disabled={binanceLinking}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                    >
                      {binanceLinking ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Linking...</>
                      ) : (
                        <><Link2 className="w-4 h-4" /> Link Account</>
                      )}
                    </button>
                  </div>

                  <AnimatePresence>
                    {binanceError && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-start gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20"
                      >
                        <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-destructive">Connection Failed</p>
                          <p className="text-xs text-destructive/80 mt-1">
                            Failed to link Binance account. Please try on a different region. This service is currently unavailable in your area.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Bank Transfer (disabled) */}
                <div className="p-4 rounded-lg border border-border bg-secondary/10 opacity-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      <Shield className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Bank Transfer</p>
                      <p className="text-xs text-muted-foreground">Coming soon</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button onClick={() => setStep("amount")} className="px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium">
                  Back
                </button>
                <button
                  onClick={() => setStep("unlock")}
                  disabled
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {step === "unlock" && (
            <motion.div key="unlock" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="glass p-8">
              <h3 className="text-lg font-semibold text-foreground mb-2">Enter Unlock Method</h3>
              <p className="text-sm text-muted-foreground mb-6">Verify your identity with your passphrase</p>
              <input
                type="password"
                value={passphrase}
                onChange={(e) => setPassphrase(e.target.value)}
                placeholder="Enter your secret passphrase"
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 mb-6"
              />
              <div className="flex gap-3">
                <button onClick={() => setStep("destination")} className="px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium">
                  Back
                </button>
                <button
                  onClick={() => passphrase && setStep("otp")}
                  disabled={!passphrase}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {step === "otp" && (
            <motion.div key="otp" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="glass p-8">
              <h3 className="text-lg font-semibold text-foreground mb-2">Confirm with OTP</h3>
              <p className="text-sm text-muted-foreground mb-6">Enter any 6-digit code (simulation)</p>
              <div className="flex justify-center mb-6">
                <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                  <InputOTPGroup>
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <InputOTPSlot key={i} index={i} className="w-12 h-14 text-lg bg-secondary border-border text-foreground" />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep("unlock")} className="px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium">
                  Back
                </button>
                <button
                  onClick={() => otp.length === 6 && setStep("confirm")}
                  disabled={otp.length < 6}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {step === "confirm" && (
            <motion.div key="confirm" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="glass p-8 text-center">
              <Shield className="w-12 h-12 text-warning mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Confirm Withdrawal</h3>
              <p className="text-3xl font-bold text-foreground mb-1">${Number(amount).toLocaleString()}</p>
              <p className="text-sm text-muted-foreground mb-6">This action is simulated — no real funds will be moved</p>
              <div className="flex gap-3 justify-center">
                <button onClick={() => setStep("otp")} className="px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium">
                  Back
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={processing}
                  className="flex items-center gap-2 px-8 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {processing ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</> : "Confirm Withdrawal"}
                </button>
              </div>
            </motion.div>
          )}

          {step === "complete" && (
            <motion.div key="complete" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Withdrawal Complete</h3>
              <p className="text-3xl font-bold text-foreground mb-1">${Number(amount).toLocaleString()}</p>
              <p className="font-mono text-sm text-muted-foreground mb-6">{txId}</p>
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">Completed</span>
              <div className="mt-8">
                <button
                  onClick={() => { setStep("amount"); setAmount(""); setPassphrase(""); setOtp(""); setBinanceError(false); }}
                  className="px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors"
                >
                  New Withdrawal
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppLayout>
  );
};

export default Withdraw;
