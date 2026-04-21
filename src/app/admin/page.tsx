import { readWaitlist } from "@/lib/waitlist";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Waitlist Admin — VoiceBill Invoicing",
  robots: { index: false, follow: false },
};

// Always re-render on request so we get the latest data
export const dynamic = "force-dynamic";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

export default function AdminPage() {
  const list = readWaitlist();
  const total = list.length;
  // Most recent first
  const sorted = [...list].sort(
    (a, b) => new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime()
  );

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Header */}
      <header className="bg-[#0d2238] text-white px-6 py-5 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center font-black text-lg">
            V
          </div>
          <div>
            <h1 className="font-black text-lg leading-tight">VoiceBill — Waitlist Admin</h1>
            <p className="text-blue-300/70 text-xs">Internal view · not indexed</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="bg-orange-500 text-white text-sm font-bold px-4 py-1.5 rounded-full">
            {total} {total === 1 ? "member" : "members"}
          </span>
          <a
            href="/admin/export"
            className="bg-white/10 hover:bg-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full border border-white/20 transition-colors"
          >
            ↓ Export CSV
          </a>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-5 py-8">
        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Signups", value: total },
            {
              label: "Today",
              value: list.filter(
                (e) => new Date(e.joinedAt).toDateString() === new Date().toDateString()
              ).length,
            },
            {
              label: "This Week",
              value: list.filter(
                (e) =>
                  Date.now() - new Date(e.joinedAt).getTime() < 7 * 24 * 60 * 60 * 1000
              ).length,
            },
            {
              label: "Spots Left",
              value: Math.max(0, 500 - total),
            },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="bg-white border border-slate-200 rounded-2xl p-5 text-center shadow-sm"
            >
              <div className="text-3xl font-black text-[#1a3a5c]">{value}</div>
              <div className="text-slate-500 text-sm mt-1">{label}</div>
            </div>
          ))}
        </div>

        {/* Table */}
        {total === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center shadow-sm">
            <div className="text-5xl mb-4">📭</div>
            <h2 className="text-xl font-bold text-slate-700 mb-2">No signups yet</h2>
            <p className="text-slate-400 text-sm">
              Share the landing page and come back here to see your waitlist grow.
            </p>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-bold text-slate-800">All Members</h2>
              <span className="text-slate-400 text-sm">Most recent first</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="text-left px-6 py-3 text-slate-500 font-semibold text-xs uppercase tracking-wider">
                      #
                    </th>
                    <th className="text-left px-6 py-3 text-slate-500 font-semibold text-xs uppercase tracking-wider">
                      Email
                    </th>
                    <th className="text-left px-6 py-3 text-slate-500 font-semibold text-xs uppercase tracking-wider">
                      Joined At
                    </th>
                    <th className="text-left px-6 py-3 text-slate-500 font-semibold text-xs uppercase tracking-wider">
                      IP
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((entry, i) => (
                    <tr
                      key={entry.id}
                      className="border-b border-slate-50 hover:bg-blue-50/40 transition-colors"
                    >
                      <td className="px-6 py-4 text-slate-400 font-mono text-xs">
                        {total - i}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 bg-[#1a3a5c] rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                            {entry.email[0].toUpperCase()}
                          </div>
                          <a
                            href={`mailto:${entry.email}`}
                            className="text-[#1a3a5c] font-semibold hover:text-orange-500 transition-colors"
                          >
                            {entry.email}
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-500 font-mono text-xs whitespace-nowrap">
                        {formatDate(entry.joinedAt)}
                      </td>
                      <td className="px-6 py-4 text-slate-400 font-mono text-xs">
                        {entry.ip ?? "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t border-slate-100 text-slate-400 text-xs">
              Data stored in <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">data/waitlist.json</code> · Refresh the page to see new signups
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
