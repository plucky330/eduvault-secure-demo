import { useAuth } from "@/context/AuthContext";
import { demoBalance, demoChartData, demoTransactions, demoLocks, securityStrength } from "@/data/mockData";
import { Wallet, Lock, TrendingUp, Shield, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import AppLayout from "@/components/layout/AppLayout";

const statCards = [
  { label: "Total Balance", value: `$${demoBalance.total.toLocaleString()}`, icon: Wallet, color: "text-primary" },
  { label: "Available", value: `$${demoBalance.available.toLocaleString()}`, icon: TrendingUp, color: "text-accent" },
  { label: "Locked", value: `$${demoBalance.locked.toLocaleString()}`, icon: Lock, color: "text-vault-gold" },
  { label: "Active Locks", value: demoLocks.filter((l) => l.status === "active").length.toString(), icon: Shield, color: "text-primary" },
];

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Welcome */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold text-foreground">Welcome back, {user?.name?.split(" ")[0]}</h1>
          <p className="text-sm text-muted-foreground mt-1">Here's an overview of your vault activity</p>
        </motion.div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass-hover p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">{s.label}</span>
                <s.icon className={`w-4 h-4 ${s.color}`} />
              </div>
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 glass p-6"
          >
            <h3 className="text-sm font-semibold text-foreground mb-4">Balance Overview</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={demoChartData}>
                  <defs>
                    <linearGradient id="colorLocked" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(160,84%,39%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(160,84%,39%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorAvailable" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(200,80%,50%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(200,80%,50%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,14%,18%)" />
                  <XAxis dataKey="month" stroke="hsl(215,12%,50%)" fontSize={12} />
                  <YAxis stroke="hsl(215,12%,50%)" fontSize={12} tickFormatter={(v) => `$${v / 1000}k`} />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(220,18%,10%)",
                      border: "1px solid hsl(220,14%,18%)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, undefined]}
                  />
                  <Area type="monotone" dataKey="available" stroke="hsl(200,80%,50%)" fill="url(#colorAvailable)" strokeWidth={2} name="Available" />
                  <Area type="monotone" dataKey="locked" stroke="hsl(160,84%,39%)" fill="url(#colorLocked)" strokeWidth={2} name="Locked" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Security strength */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass p-6"
          >
            <h3 className="text-sm font-semibold text-foreground mb-4">Security Strength</h3>
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-28 h-28">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(220,14%,18%)" strokeWidth="8" />
                  <circle
                    cx="50" cy="50" r="42" fill="none"
                    stroke="hsl(160,84%,39%)" strokeWidth="8"
                    strokeDasharray={`${securityStrength.score * 2.64} 264`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-foreground">{securityStrength.score}</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              {securityStrength.factors.map((f) => (
                <div key={f.label} className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{f.label}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 rounded-full bg-secondary overflow-hidden">
                      <div
                        className={`h-full rounded-full ${f.status === "strong" ? "bg-primary" : "bg-warning"}`}
                        style={{ width: `${f.score}%` }}
                      />
                    </div>
                    <span className="text-muted-foreground w-7 text-right">{f.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent transactions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass p-6"
        >
          <h3 className="text-sm font-semibold text-foreground mb-4">Recent Transactions</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-muted-foreground uppercase tracking-wider border-b border-border">
                  <th className="pb-3 pr-4">ID</th>
                  <th className="pb-3 pr-4">Type</th>
                  <th className="pb-3 pr-4">Amount</th>
                  <th className="pb-3 pr-4">Date</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {demoTransactions.map((tx) => (
                  <tr key={tx.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                    <td className="py-3 pr-4 font-mono text-xs text-muted-foreground">{tx.id}</td>
                    <td className="py-3 pr-4 flex items-center gap-2 capitalize">
                      {tx.type === "withdrawal" ? (
                        <ArrowUpRight className="w-3.5 h-3.5 text-destructive" />
                      ) : (
                        <ArrowDownRight className="w-3.5 h-3.5 text-primary" />
                      )}
                      {tx.type}
                    </td>
                    <td className="py-3 pr-4 font-medium">${tx.amount.toLocaleString()}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{tx.date}</td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          tx.status === "completed"
                            ? "bg-primary/10 text-primary"
                            : tx.status === "pending"
                            ? "bg-warning/10 text-warning"
                            : "bg-destructive/10 text-destructive"
                        }`}
                      >
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
