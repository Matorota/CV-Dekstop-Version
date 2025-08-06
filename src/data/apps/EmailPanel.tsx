import { useState, useEffect } from "react";
import { sendEmail } from "../../api/email";

export default function EmailPanel() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [backendStatus] = useState<string | null>(null);

  useEffect(() => {
    // Optionally, implement backend check here if needed
    // setBackendStatus("Backend check not implemented.");
  }, []);

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
      await sendEmail(form);
      setSent(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 3000);
    } catch (err: any) {
      setError(
        err?.message?.includes("Failed to fetch")
          ? "Could not connect to backend. Please try again later."
          : "Failed to send message. Please try again."
      );
      console.error("Send email error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-start gap-2 p-4 w-full max-w-md">
      {backendStatus && (
        <div className="text-red-600 text-sm mb-2">
          Backend/API error: {backendStatus}
        </div>
      )}
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
            placeholder="Your email"
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
            placeholder="Write your message"
            disabled={loading}
          />
        </label>
        <button
          type="submit"
          className="bg-blue-700 text-white font-bold px-4 py-2 rounded hover:bg-blue-800 transition"
          disabled={loading || !!backendStatus}
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
