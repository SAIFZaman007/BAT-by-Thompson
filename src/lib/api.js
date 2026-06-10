const ORIGIN = import.meta.env.VITE_API_BASE || "";
const BASE = `${ORIGIN}/api/v1`;

async function handle(res) {
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.detail || "Something went wrong. Try again.");
  return body;
}

export const api = {
  submitOnboarding: (data) =>
    fetch(`${BASE}/onboarding`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(handle),

  uploadKyc: (referenceCode, file) => {
    const form = new FormData();
    form.append("reference_code", referenceCode);
    form.append("file", file);
    return fetch(`${BASE}/kyc/upload`, { method: "POST", body: form }).then(handle);
  },

  sendContact: (data) =>
    fetch(`${BASE}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(handle),
};

export const SUPPORT_EMAIL = "support@bahamasaitrading.com";
