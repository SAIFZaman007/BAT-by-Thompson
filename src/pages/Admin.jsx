import { useEffect, useState } from "react";
import { api } from "../lib/api.js";
import { Button, Field, Notice, inputCls } from "../components/ui/Primitives.jsx";

const STATUSES = ["pending", "reviewed", "approved", "rejected"];
const badge = {
  pending: "bg-slate-100 text-slate-700",
  reviewed: "bg-brand-soft text-brand",
  approved: "bg-teal-soft text-teal",
  rejected: "bg-red-50 text-red-700",
};

export default function Admin() {
  // Token kept in memory only — gone on refresh, by design (no XSS-readable storage).
  const [token, setToken] = useState(null);
  return token ? <Dashboard token={token} onLogout={() => setToken(null)} /> : <Login onToken={setToken} />;
}

function Login({ onToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true); setError("");
    try {
      const res = await api.login(username, password);
      onToken(res.access_token);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-surface px-5">
      <form onSubmit={submit} className="w-full max-w-sm space-y-5 rounded-2xl border border-slate-200 bg-white p-8">
        <div>
          <h1 className="text-xl font-semibold">Admin sign in</h1>
          <p className="mt-1 text-sm text-slate-500">Bahamas AI Trading — submissions console</p>
        </div>
        <Field label="Username">
          <input className={inputCls} value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" />
        </Field>
        <Field label="Password">
          <input className={inputCls} type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
        </Field>
        <Button type="submit" disabled={busy} className="w-full">{busy ? "Signing in…" : "Sign in"}</Button>
        {error && <Notice kind="error">{error}</Notice>}
      </form>
    </main>
  );
}

function Dashboard({ token, onLogout }) {
  const client = api.admin(token);
  const [tab, setTab] = useState("submissions");
  const [subs, setSubs] = useState([]);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");

  const load = async () => {
    setError("");
    try {
      const [s, m] = await Promise.all([client.submissions(), client.contactMessages()]);
      setSubs(s); setMessages(m);
    } catch (e) {
      setError(e.message.includes("Session") ? "Session expired — sign in again." : e.message);
      if (e.message.includes("Session")) setTimeout(onLogout, 1200);
    }
  };
  useEffect(() => { load(); }, []); // eslint-disable-line

  const setStatus = async (id, status) => {
    try {
      const updated = await client.setStatus(id, status);
      setSubs((prev) => prev.map((s) => (s.id === id ? updated : s)));
    } catch (e) { setError(e.message); }
  };

  const openKyc = async (docId) => {
    try { window.open(await client.fetchKyc(docId), "_blank", "noopener"); }
    catch (e) { setError(e.message); }
  };

  return (
    <main className="min-h-screen bg-surface">
      <header className="border-b border-slate-200 bg-white">
        <div className="container-content flex h-14 items-center justify-between">
          <p className="font-display font-bold text-ink">BAT Admin</p>
          <div className="flex items-center gap-3">
            <button onClick={load} className="text-sm font-medium text-brand hover:underline">Refresh</button>
            <button onClick={onLogout} className="text-sm font-medium text-slate-500 hover:text-ink">Sign out</button>
          </div>
        </div>
      </header>
      <div className="container-content py-8">
        <div className="mb-6 flex gap-2">
          {["submissions", "messages"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold capitalize ${tab === t ? "bg-brand text-white" : "bg-white text-slate-600 border border-slate-200"}`}
            >
              {t} {t === "submissions" ? `(${subs.length})` : `(${messages.length})`}
            </button>
          ))}
        </div>
        {error && <Notice kind="error">{error}</Notice>}

        {tab === "submissions" && (
          <div className="mt-4 space-y-4">
            {subs.length === 0 && <EmptyState text="No onboarding submissions yet. They'll appear here as soon as a client applies." />}
            {subs.map((s) => (
              <article key={s.id} className="rounded-xl border border-slate-200 bg-white p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-ink">{s.full_name} <span className="ml-2 font-mono text-xs text-slate-400">#{s.reference_code}</span></p>
                    <p className="text-sm text-slate-500">{s.email} · {s.phone}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badge[s.status]}`}>{s.status}</span>
                    <select
                      className="rounded-lg border border-slate-300 px-2 py-1.5 text-sm"
                      value={s.status}
                      onChange={(e) => setStatus(s.id, e.target.value)}
                    >
                      {STATUSES.map((st) => <option key={st}>{st}</option>)}
                    </select>
                  </div>
                </div>
                <p className="mt-3 break-all text-xs text-slate-500">Wallet: <span className="font-mono">{s.wallet_address}</span></p>
                {s.details && <p className="mt-2 text-sm text-slate-600">{s.details}</p>}
                <div className="mt-3 flex flex-wrap gap-2">
                  {s.kyc_documents.length === 0 && <span className="text-xs text-slate-400">No KYC documents uploaded yet</span>}
                  {s.kyc_documents.map((d) => (
                    <button
                      key={d.id}
                      onClick={() => openKyc(d.id)}
                      className="rounded-lg border border-teal/40 bg-teal-soft px-3 py-1.5 text-xs font-semibold text-teal hover:border-teal"
                    >
                      View {d.original_name}
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-[11px] text-slate-400">Submitted {new Date(s.created_at).toLocaleString()}</p>
              </article>
            ))}
          </div>
        )}

        {tab === "messages" && (
          <div className="mt-4 space-y-4">
            {messages.length === 0 && <EmptyState text="No contact messages yet." />}
            {messages.map((m) => (
              <article key={m.id} className="rounded-xl border border-slate-200 bg-white p-5">
                <p className="font-semibold text-ink">{m.name} <span className="ml-2 text-sm font-normal text-slate-500">{m.email}</span></p>
                <p className="mt-2 whitespace-pre-wrap text-sm text-slate-600">{m.message}</p>
                <p className="mt-2 text-[11px] text-slate-400">{new Date(m.created_at).toLocaleString()}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

function EmptyState({ text }) {
  return <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">{text}</div>;
}
