export interface VaultLock {
  id: string;
  code: string;
  amount: number;
  duration: string;
  startDate: string;
  endDate: string;
  status: "active" | "expired";
  unlockMethods: string[];
}

export interface ActivityLog {
  id: string;
  type: "login" | "lock" | "unlock_attempt" | "withdrawal" | "security" | "failed_login";
  message: string;
  timestamp: string;
  device: string;
  ip: string;
  status: "success" | "failed" | "pending";
}

export interface Transaction {
  id: string;
  type: "lock" | "unlock" | "withdrawal";
  amount: number;
  date: string;
  status: "completed" | "pending" | "failed";
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "security" | "success";
  read: boolean;
  timestamp: string;
}

export const demoBalance = {
  total: 35000,
  available: 0,
  locked: 35000,
};

export const demoLocks: VaultLock[] = [
  {
    id: "lk_001",
    code: "EV-LOCK-93XK2045",
    amount: 20000,
    duration: "1 year",
    startDate: "2025-06-01T00:00:00Z",
    endDate: "2026-06-01T00:00:00Z",
    status: "active",
    unlockMethods: ["passphrase", "2fa"],
  },
  {
    id: "lk_002",
    code: "EV-LOCK-7BM9F312",
    amount: 15000,
    duration: "2 years",
    startDate: "2025-03-01T00:00:00Z",
    endDate: "2027-03-01T00:00:00Z",
    status: "active",
    unlockMethods: ["file", "passphrase", "2fa"],
  },
];

export const demoActivity: ActivityLog[] = [
  { id: "a1", type: "login", message: "Successful login from Chrome / macOS", timestamp: "2026-03-19T08:30:00Z", device: "Chrome 120 / macOS", ip: "192.168.1.42", status: "success" },
  { id: "a2", type: "security", message: "Unauthorized access attempt blocked", timestamp: "2026-03-18T22:15:00Z", device: "Firefox 119 / Windows", ip: "203.45.67.89", status: "failed" },
  { id: "a3", type: "lock", message: "New vault lock created: EV-LOCK-93XK2045", timestamp: "2026-03-18T14:00:00Z", device: "Chrome 120 / macOS", ip: "192.168.1.42", status: "success" },
  { id: "a4", type: "unlock_attempt", message: "Failed unlock attempt on vault EV-LOCK-7BM9F312", timestamp: "2026-03-17T19:45:00Z", device: "Safari 17 / iOS", ip: "192.168.1.55", status: "failed" },
  { id: "a5", type: "withdrawal", message: "Withdrawal of $2,500 processed", timestamp: "2026-03-17T11:30:00Z", device: "Chrome 120 / macOS", ip: "192.168.1.42", status: "success" },
  { id: "a6", type: "failed_login", message: "Failed login attempt with incorrect password", timestamp: "2026-03-16T03:20:00Z", device: "Unknown / Linux", ip: "45.33.32.156", status: "failed" },
  { id: "a7", type: "security", message: "Password changed successfully", timestamp: "2026-03-15T16:00:00Z", device: "Chrome 120 / macOS", ip: "192.168.1.42", status: "success" },
  { id: "a8", type: "login", message: "Login from new device detected", timestamp: "2026-03-15T09:10:00Z", device: "Edge 120 / Windows", ip: "10.0.0.15", status: "success" },
];

export const demoTransactions: Transaction[] = [];

export const demoNotifications: Notification[] = [
  { id: "n1", title: "Security Alert", message: "Unauthorized access attempt was blocked from IP 203.45.67.89", type: "security", read: false, timestamp: "2026-03-18T22:15:00Z" },
  { id: "n2", title: "Vault Locked", message: "Successfully locked $10,000 for 6 months", type: "success", read: false, timestamp: "2026-03-18T14:00:00Z" },
  { id: "n3", title: "New Device Login", message: "A new device was used to access your account", type: "warning", read: true, timestamp: "2026-03-15T09:10:00Z" },
  { id: "n4", title: "System Update", message: "EduVault security protocols have been updated", type: "info", read: true, timestamp: "2026-03-14T00:00:00Z" },
];

export const demoChartData = [
  { month: "Oct", locked: 35000, available: 0 },
  { month: "Nov", locked: 35000, available: 0 },
  { month: "Dec", locked: 35000, available: 0 },
  { month: "Jan", locked: 35000, available: 0 },
  { month: "Feb", locked: 35000, available: 0 },
  { month: "Mar", locked: 35000, available: 0 },
];

export const demoAdminUsers = [
  { id: "usr_8k2m4n6p", name: "Alex Morgan", email: "alex@demo.io", balance: 50000, locks: 2, status: "active" as const, lastLogin: "2026-03-19T08:30:00Z" },
  { id: "usr_2j5h7g9f", name: "Jordan Lee", email: "jordan@demo.io", balance: 75000, locks: 3, status: "active" as const, lastLogin: "2026-03-18T14:20:00Z" },
  { id: "usr_4m6k8n1p", name: "Sam Rivera", email: "sam@demo.io", balance: 25000, locks: 1, status: "suspended" as const, lastLogin: "2026-03-10T09:00:00Z" },
  { id: "usr_9q3w5e7r", name: "Taylor Chen", email: "taylor@demo.io", balance: 100000, locks: 5, status: "active" as const, lastLogin: "2026-03-19T07:45:00Z" },
  { id: "usr_1t3y5u7i", name: "Casey Kim", email: "casey@demo.io", balance: 12000, locks: 0, status: "active" as const, lastLogin: "2026-03-17T22:10:00Z" },
];

export const securityStrength = {
  score: 82,
  factors: [
    { label: "Password Strength", score: 90, status: "strong" as const },
    { label: "2FA Enabled", score: 100, status: "strong" as const },
    { label: "Recovery Options", score: 60, status: "moderate" as const },
    { label: "Login History", score: 75, status: "moderate" as const },
    { label: "Device Trust", score: 85, status: "strong" as const },
  ],
};
