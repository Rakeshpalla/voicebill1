import fs from "fs";
import path from "path";

export interface WaitlistEntry {
  id: string;
  email: string;
  joinedAt: string;
  ip?: string;
}

const DATA_FILE = path.join(process.cwd(), "data", "waitlist.json");

function ensureFile() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "[]", "utf-8");
}

export function readWaitlist(): WaitlistEntry[] {
  ensureFile();
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8")) as WaitlistEntry[];
  } catch {
    return [];
  }
}

export function addToWaitlist(email: string, ip?: string): { ok: boolean; duplicate: boolean } {
  const list = readWaitlist();
  const normalized = email.trim().toLowerCase();
  if (list.some((e) => e.email.toLowerCase() === normalized)) {
    return { ok: false, duplicate: true };
  }
  const entry: WaitlistEntry = {
    id: crypto.randomUUID(),
    email: normalized,
    joinedAt: new Date().toISOString(),
    ip,
  };
  list.push(entry);
  fs.writeFileSync(DATA_FILE, JSON.stringify(list, null, 2), "utf-8");
  return { ok: true, duplicate: false };
}
