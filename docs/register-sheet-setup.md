# "Register interest" -> Google Sheet wiring (one-time, ~5 min)

The `/register` form posts to `src/app/api/register/route.ts`, which forwards each lead
to a Google Apps Script webhook that appends a row to your Sheet and emails you. The
webhook URL lives **only** in Vercel env (`REGISTER_WEBHOOK_URL`) - never in the repo.

## 1. Create the Sheet

1. New Google Sheet, name it e.g. **Gravii - design partners**.
2. Rename the first tab to **Leads**.
3. Put this header in row 1: `timestamp | name | email | firm | role | message | source`.

## 2. Add the Apps Script webhook

In the Sheet: **Extensions -> Apps Script**, replace the contents with:

```js
const NOTIFY = "tommy@gravii.app"; // where the per-lead email goes

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName("Leads") || ss.getSheets()[0];
    sheet.appendRow([
      new Date(), d.name || "", d.email || "", d.firm || "",
      d.role || "", d.message || "", d.source || "",
    ]);
    MailApp.sendEmail({
      to: NOTIFY,
      subject: "Gravii - new design-partner interest: " + (d.firm || d.name || "unknown"),
      body: [
        "Name:   " + (d.name || ""),
        "Email:  " + (d.email || ""),
        "Firm:   " + (d.firm || ""),
        "Role:   " + (d.role || ""),
        "Note:   " + (d.message || "(none)"),
        "Source: " + (d.source || ""),
      ].join("\n"),
    });
    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## 3. Deploy it as a web app

**Deploy -> New deployment -> Web app**. Execute as: **Me**. Who has access: **Anyone**.
Authorise when prompted. Copy the deployment URL (ends in `/exec`).

## 4. Point the site at it

In Vercel (the `gravii-site` project) -> Settings -> Environment Variables, add:

- `REGISTER_WEBHOOK_URL` = the `/exec` URL from step 3 (Production + Preview).

Redeploy the site (or it applies on the next deploy from `main`).

## 5. Verify live (the mission's proof)

Open gravii.app/register, submit a test entry. Within a few seconds you should see:
- a new row in the **Leads** tab, and
- an email at `tommy@gravii.app`.

Screenshot both for the PR. If the env var is missing the form shows a mailto fallback,
so a lead is never lost while you wire this up.
