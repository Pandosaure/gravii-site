// Server-safe shared constants (no "use client"), importable from both
// server and client components.

// The site's single primary CTA. Visitors can't log in (the app is a private,
// allowlisted pilot), so the site converts interest into a named lead via the
// on-brand form at /register rather than sending them to a dead-end login.
export const REGISTER_HREF = "/register";

// Personal contact, used only as the form's error-state fallback (Tommy replies
// personally at this stage - no automated follow-up).
export const CONTACT_EMAIL = "tommy@gravii.app";
