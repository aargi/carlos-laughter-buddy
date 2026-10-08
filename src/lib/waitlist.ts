// Shared waitlist submission. Returns true only when the backend confirms the
// row was stored, so the UI can show a success message it can trust.
export async function submitWaitlist(
  interest: string,
  email: string,
  teamSize?: string,
): Promise<boolean> {
  try {
    const res = await fetch("/api/public/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ interest, email, teamSize }),
    });
    if (!res.ok) return false;
    const data = (await res.json().catch(() => null)) as { ok?: boolean } | null;
    return data?.ok === true;
  } catch {
    return false;
  }
}
