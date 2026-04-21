import { NextResponse } from "next/server";
import { readWaitlist } from "@/lib/waitlist";

export const dynamic = "force-dynamic";

export async function GET() {
  const list = readWaitlist();

  const rows = [
    ["#", "Email", "Joined At", "IP"].join(","),
    ...list
      .sort((a, b) => new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime())
      .map((e, i) =>
        [list.length - i, `"${e.email}"`, `"${e.joinedAt}"`, e.ip ?? ""].join(",")
      ),
  ].join("\n");

  return new NextResponse(rows, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="voiceflow-waitlist-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
