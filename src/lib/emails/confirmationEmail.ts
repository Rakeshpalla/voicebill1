export function confirmationEmailHtml(email: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>You're on the VoiceBill Waitlist!</title>
</head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

          <!-- Logo header -->
          <tr>
            <td style="background:linear-gradient(135deg,#0d2238 0%,#1a3a5c 100%);border-radius:16px 16px 0 0;padding:32px 40px;text-align:center;">
              <table cellpadding="0" cellspacing="0" style="display:inline-table;">
                <tr>
                  <td style="background:#f97316;border-radius:10px;width:40px;height:40px;text-align:center;vertical-align:middle;">
                    <span style="color:#fff;font-weight:900;font-size:20px;line-height:40px;">V</span>
                  </td>
                  <td style="padding-left:10px;vertical-align:middle;">
                    <span style="color:#fff;font-weight:900;font-size:22px;letter-spacing:-0.5px;">VoiceBill</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main card -->
          <tr>
            <td style="background:#ffffff;padding:40px 40px 32px;border-left:1px solid #e2e8f0;border-right:1px solid #e2e8f0;">

              <!-- Party emoji -->
              <p style="margin:0 0 16px;font-size:48px;text-align:center;">🎉</p>

              <!-- Headline -->
              <h1 style="margin:0 0 12px;font-size:26px;font-weight:900;color:#0f1923;text-align:center;line-height:1.2;">
                You&rsquo;re on the list!
              </h1>
              <p style="margin:0 0 28px;font-size:15px;color:#64748b;text-align:center;line-height:1.6;">
                Welcome to VoiceBill Invoicing. You&rsquo;re now one of the first trade pros in the world to get access when we launch.
              </p>

              <!-- What you get box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f7ff;border-radius:12px;margin-bottom:28px;">
                <tr>
                  <td style="padding:24px 28px;">
                    <p style="margin:0 0 14px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#1a3a5c;">
                      What happens next
                    </p>
                    <table cellpadding="0" cellspacing="0" width="100%">
                      ${[
                        ["⚡", "Priority early access before public launch"],
                        ["💸", "Lock in the lowest founding member price"],
                        ["🎙️", "Be first to invoice by voice — zero typing"],
                        ["📩", "We'll email you the moment we open the doors"],
                      ]
                        .map(
                          ([icon, text]) => `
                      <tr>
                        <td style="width:28px;padding-bottom:10px;vertical-align:top;">
                          <span style="font-size:16px;">${icon}</span>
                        </td>
                        <td style="padding-bottom:10px;padding-left:8px;vertical-align:top;">
                          <span style="font-size:14px;color:#1e293b;font-weight:500;">${text}</span>
                        </td>
                      </tr>`
                        )
                        .join("")}
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <hr style="border:none;border-top:1px solid #e2e8f0;margin:0 0 28px;" />

              <!-- How it works preview -->
              <h2 style="margin:0 0 16px;font-size:16px;font-weight:800;color:#0f1923;">
                Here&rsquo;s what you&rsquo;re signing up for:
              </h2>
              <table cellpadding="0" cellspacing="0" width="100%">
                ${[
                  ["🎙️", "Tap once", "Hit the big orange button — works with gloves on."],
                  ["🗣️", "Speak naturally", "\"Water heater replaced, 2 hrs labor, $150 parts.\""],
                  ["⚡", "Invoice sent", "AI generates your invoice + Stripe pay link in seconds."],
                ]
                  .map(
                    ([icon, title, desc]) => `
                <tr>
                  <td style="width:44px;padding-bottom:18px;vertical-align:top;">
                    <div style="width:36px;height:36px;background:#1a3a5c;border-radius:8px;text-align:center;line-height:36px;font-size:18px;">${icon}</div>
                  </td>
                  <td style="padding-bottom:18px;padding-left:12px;vertical-align:top;">
                    <p style="margin:0 0 2px;font-size:14px;font-weight:700;color:#0f1923;">${title}</p>
                    <p style="margin:0;font-size:13px;color:#64748b;line-height:1.5;">${desc}</p>
                  </td>
                </tr>`
                  )
                  .join("")}
              </table>

              <!-- CTA button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:8px;">
                <tr>
                  <td align="center">
                    <a href="https://voiceflow.app" style="display:inline-block;background:#f97316;color:#ffffff;font-weight:800;font-size:15px;text-decoration:none;padding:14px 36px;border-radius:12px;letter-spacing:0.2px;">
                      Share with a trade pro you know →
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f0f4f8;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 16px 16px;padding:24px 40px;text-align:center;">
              <p style="margin:0 0 6px;font-size:12px;color:#94a3b8;">
                You&rsquo;re receiving this because <strong style="color:#64748b;">${email}</strong> joined the VoiceBill waitlist.
              </p>
              <p style="margin:0;font-size:12px;color:#94a3b8;">
                Built for trade pros worldwide 🌍
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`;
}

export function confirmationEmailText(email: string): string {
  return `Hey there!

You're on the VoiceBill Invoicing waitlist — and you're one of the first trade pros in the world to get access.

WHAT HAPPENS NEXT:
⚡ Priority early access before public launch
💸 Lock in the lowest founding member price
🎙️ Be first to invoice by voice — zero typing
📩 We'll email you the moment we open the doors

HOW IT WORKS:
1. Tap once — hit the big orange button (works with gloves on)
2. Speak naturally — "Water heater replaced, 2 hrs labor, $150 parts"
3. Invoice sent — AI generates your invoice + Stripe pay link in seconds

Know another trade pro who'd love this? Forward this email.

— The VoiceBill Team

---
You're receiving this because ${email} joined the VoiceBill waitlist.
`;
}
