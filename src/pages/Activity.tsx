import AppLayout from "@/components/layout/AppLayout";
import { demoActivity } from "@/data/mockData";
import { Shield, LogIn, Lock, AlertTriangle, ArrowDownToLine, XCircle } from "lucide-react";
import { motion } from "framer-motion";

const iconMap: Record<string, React.ElementType> = {
  login: LogIn,
  lock: Lock,
  unlock_attempt: AlertTriangle,
  withdrawal: ArrowDownToLine,
  security: Shield,
  failed_login: XCircle,
};

const Activity = () => {
  return (
    <AppLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Activity & Security Logs</h1>
          <p className="text-sm text-muted-foreground mt-1">Complete audit trail of all vault activity</p>
        </div>

        <div className="glass overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-muted-foreground uppercase tracking-wider border-b border-border">
                  <th className="p-4">Event</th>
                  <th className="p-4">Details</th>
                  <th className="p-4">Device</th>
                  <th className="p-4">IP Address</th>
                  <th className="p-4">Time</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {demoActivity.map((log, i) => {
                  const Icon = iconMap[log.type] || Shield;
                  return (
                    <motion.tr
                      key={log.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="border-b border-border/50 hover:bg-secondary/30 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            log.status === "failed" ? "bg-destructive/10" : "bg-primary/10"
                          }`}>
                            <Icon className={`w-4 h-4 ${log.status === "failed" ? "text-destructive" : "text-primary"}`} />
                          </div>
                          <span className="capitalize text-foreground font-medium">{log.type.replace("_", " ")}</span>
                        </div>
                      </td>
                      <td className="p-4 text-muted-foreground max-w-xs truncate">{log.message}</td>
                      <td className="p-4 text-muted-foreground text-xs">{log.device}</td>
                      <td className="p-4 font-mono text-xs text-muted-foreground">{log.ip}</td>
                      <td className="p-4 text-xs text-muted-foreground">
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          log.status === "success" ? "bg-primary/10 text-primary" :
                          log.status === "failed" ? "bg-destructive/10 text-destructive" :
                          "bg-warning/10 text-warning"
                        }`}>
                          {log.status}
                        </span>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Activity;
