import AppLayout from "@/components/layout/AppLayout";
import { demoAdminUsers, demoActivity } from "@/data/mockData";
import { Users, Activity, Shield, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const Admin = () => {
  return (
    <AppLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Admin Demo Panel</h1>
          <p className="text-sm text-muted-foreground mt-1">System overview with simulated data</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Users", value: "5", icon: Users },
            { label: "Active Locks", value: "11", icon: Shield },
            { label: "Transactions Today", value: "23", icon: Activity },
            { label: "System Health", value: "99.9%", icon: TrendingUp },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="glass-hover p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">{s.label}</span>
                <s.icon className="w-4 h-4 text-primary" />
              </div>
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Users table */}
        <div className="glass overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="text-sm font-semibold text-foreground">All Users (Demo)</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-muted-foreground uppercase tracking-wider border-b border-border">
                  <th className="p-4">User</th>
                  <th className="p-4">Balance</th>
                  <th className="p-4">Locks</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Last Login</th>
                </tr>
              </thead>
              <tbody>
                {demoAdminUsers.map((u) => (
                  <tr key={u.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                    <td className="p-4">
                      <p className="font-medium text-foreground">{u.name}</p>
                      <p className="text-xs text-muted-foreground">{u.email}</p>
                    </td>
                    <td className="p-4 font-medium">${u.balance.toLocaleString()}</td>
                    <td className="p-4 text-muted-foreground">{u.locks}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        u.status === "active" ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"
                      }`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="p-4 text-xs text-muted-foreground">{new Date(u.lastLogin).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent logs */}
        <div className="glass overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="text-sm font-semibold text-foreground">Real-time Logs</h3>
          </div>
          <div className="p-4 space-y-2 max-h-64 overflow-auto">
            {demoActivity.map((log) => (
              <div key={log.id} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 text-xs">
                <div className={`w-2 h-2 rounded-full ${log.status === "success" ? "bg-primary" : "bg-destructive"} security-pulse`} />
                <span className="text-muted-foreground flex-1">{log.message}</span>
                <span className="text-muted-foreground/60 font-mono">{log.ip}</span>
                <span className="text-muted-foreground/60">{new Date(log.timestamp).toLocaleTimeString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Admin;
