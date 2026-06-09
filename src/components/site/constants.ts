// Server-safe shared constants (no "use client"), importable from both
// server and client components.

export const PILOT_HREF = "mailto:tommy@gravii.app?subject=Request%20a%20pilot";

// App auth entry (Google + magic link). Passwordless, so sign in and register
// are the same flow. Confirm the exact route against the app's V2 auth.
export const SIGNIN_HREF = "https://app.gravii.app/login";
