import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Shield, Eye, EyeOff, ArrowLeft, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const Auth = () => {
  const location = useLocation();
  const isSignup = location.pathname === "/signup";
  const navigate = useNavigate();
  const { login, needs2FA, verify2FA } = useAuth();

  const [username, setUsername] = useState("franklin.taipe");
  const [password, setPassword] = useState("Peru@2030");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const [signupError, setSignupError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (isSignup) {
      await new Promise((r) => setTimeout(r, 1500));
      setSignupError(true);
      setLoading(false);
      return;
    }

    try {
      const success = await login(username, password);
      if (!success) setError("Invalid username or password.");
    } catch {
      setError("An error occurred.");
    }
    setLoading(false);
  };

  const handle2FA = () => {
    if (verify2FA(otpValue)) {
      navigate("/dashboard");
    } else {
      setError("Invalid authentication code.");
      setOtpValue("");
    }
  };

  if (needs2FA) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass w-full max-w-md p-8 relative z-10"
        >
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Shield className="w-7 h-7 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Two-Factor Authentication</h2>
            <p className="text-sm text-muted-foreground mt-2">Enter your 6-digit authentication code</p>
          </div>

          <div className="flex justify-center mb-6">
            <InputOTP maxLength={6} value={otpValue} onChange={setOtpValue}>
              <InputOTPGroup>
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <InputOTPSlot
                    key={i}
                    index={i}
                    className="w-12 h-14 text-lg bg-secondary border-border text-foreground"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>

          {error && <p className="text-sm text-destructive text-center mb-4">{error}</p>}

          <button
            onClick={handle2FA}
            disabled={otpValue.length < 6}
            className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            Verify & Continue
          </button>
        </motion.div>
      </div>
    );
  }

  if (signupError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass w-full max-w-md p-8 relative z-10 text-center"
        >
          <div className="w-14 h-14 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto mb-4">
            <Shield className="w-7 h-7 text-destructive" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Registration Unavailable</h2>
          <p className="text-sm text-muted-foreground mb-6">
            This service is not available in your region. Please try again from a supported location.
          </p>
          <Link
            to="/login"
            className="inline-flex px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Back to Sign In
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass w-full max-w-md p-8 relative z-10"
      >
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Shield className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">{isSignup ? "Create Account" : "Welcome Back"}</h1>
          <p className="text-sm text-muted-foreground mt-2">
            {isSignup ? "Create your EduVault account" : "Sign in to your EduVault account"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <div>
              <label className="text-sm font-medium text-foreground block mb-1.5">Full Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                placeholder="Your full name"
                required
              />
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-foreground block mb-1.5">
              {isSignup ? "Email" : "Username"}
            </label>
            <input
              type={isSignup ? "email" : "text"}
              value={isSignup ? "" : username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              placeholder={isSignup ? "you@example.com" : "Enter your username"}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={isSignup ? "" : password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all pr-12"
                placeholder="••••••••"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {isSignup ? "Create Account" : "Sign In"}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <Link to={isSignup ? "/login" : "/signup"} className="text-primary hover:underline font-medium">
            {isSignup ? "Sign In" : "Sign Up"}
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Auth;
