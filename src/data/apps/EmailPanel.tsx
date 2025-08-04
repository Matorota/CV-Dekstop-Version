import { useState } from "react";

export default function EmailPanel() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to send");
      }
      setSent(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 3000);
    } catch (err: any) {
      setError(
        err?.message?.includes("Failed to fetch")
          ? "Could not connect to backend. Please try again later."
          : "Failed to send message. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-start gap-2 p-4 w-full max-w-md">
      <form onSubmit={handleSend} className="flex flex-col gap-3 w-full">
        <label className="text-sm font-semibold text-gray-700">
          Your Name
          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            className="mt-1 w-full px-2 py-1 border rounded bg-white"
            placeholder="Your name"
            disabled={loading}
          />
        </label>
        <label className="text-sm font-semibold text-gray-700">
          Your Email
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            className="mt-1 w-full px-2 py-1 border rounded bg-white"
            placeholder="your@email.com"
            disabled={loading}
          />
        </label>
        <label className="text-sm font-semibold text-gray-700">
          Message
          <textarea
            name="message"
            required
            value={form.message}
            onChange={handleChange}
            className="mt-1 w-full px-2 py-1 border rounded bg-white"
            rows={4}
            placeholder="Your message"
            disabled={loading}
          />
        </label>
        <button
          type="submit"
          className="bg-blue-700 text-white font-bold px-4 py-2 rounded hover:bg-blue-800 transition"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </button>
        {sent && (
          <span className="text-green-600 text-sm mt-1">Message sent!</span>
        )}
        {error && <span className="text-red-600 text-sm mt-1">{error}</span>}
      </form>
      <span className="text-xs text-gray-500 mt-2">
        Your message will be sent to <b>matasmatasp@gmail.com</b>
      </span>
    </div>
  );
}
