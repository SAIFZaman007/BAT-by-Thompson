import { useRef, useState } from "react";
import { api } from "../../lib/api.js";
import IllustrationPanel from "../IllustrationPanel.jsx";
import { useReveal } from "../../lib/motion.js";
import { Button, Field, Notice, SectionHeading, inputCls } from "../ui/Primitives.jsx";

export default function KycUpload() {
  const [refCode, setRefCode] = useState("");
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState("");
  const [error, setError] = useState("");
  const fileInput = useRef(null);

  const submit = async (e) => {
    e.preventDefault();
    setError(""); setDone("");
    if (!refCode.trim()) return setError("Enter the reference code from your application.");
    if (!file) return setError("Choose a PDF, JPG or PNG of your ID document.");
    if (file.size > 10 * 1024 * 1024) return setError("File is larger than 10 MB. Upload a smaller scan.");
    setBusy(true);
    try {
      const res = await api.uploadKyc(refCode.trim().toUpperCase(), file);
      setDone(res.message);
      setRefCode(""); setFile(null);
      if (fileInput.current) fileInput.current.value = "";
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const revealRef = useReveal();
  return (
    <section id="kyc" ref={revealRef} className="section-pad overflow-hidden bg-surface">
      <div className="container-content grid gap-12 lg:grid-cols-5">
        <div data-reveal className="lg:col-span-2">
          <SectionHeading
            eyebrow="Secure KYC upload"
            title="Verify your identity"
            lead="Upload a clear photo or scan of a government-issued ID. Documents are encrypted at rest and only visible to the verification team. KYC must be completed before your application can be approved."
          />
          <ul className="space-y-2 text-sm text-slate-600">
            <li>• Accepted: PDF, JPG, PNG — up to 10 MB</li>
            <li>• Make sure all four corners and the photo are visible</li>
            <li>• Files are transferred over HTTPS and stored encrypted</li>
          </ul>
          <div className="mt-8 hidden lg:block">
            <IllustrationPanel variant="shield" />
          </div>
        </div>
        <form onSubmit={submit} data-reveal className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 sm:p-6 lg:col-span-3 lg:h-[794px] xl:h-[794px]">
          <Field label="Your reference code">
            <input
              className={`${inputCls} font-mono uppercase`}
              value={refCode}
              onChange={(e) => setRefCode(e.target.value)}
              placeholder="e.g. 4F2A9C1B"
              spellCheck="false"
            />
          </Field>
          <Field label="ID document (PDF, JPG or PNG)">
            <input
              ref={fileInput}
              className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-brand-soft file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-brand hover:file:bg-brand/10"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </Field>
          <Button type="submit" disabled={busy}>{busy ? "Uploading…" : "Upload securely"}</Button>
          {done && <Notice>{done}</Notice>}
          {error && <Notice kind="error">{error}</Notice>}
        </form>
      </div>
    </section>
  );
}
