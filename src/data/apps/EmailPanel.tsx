import { useState, useEffect } from "react";
import { sendEmail } from "../../api/email";
import { useTheme } from "../../context/ThemeContext";

export default function EmailPanel() {
  const { theme } = useTheme();
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
    <div
      className={`p-3 sm:p-6 w-full h-full overflow-y-auto ${
        theme === "dark" ? "text-gray-200" : "text-gray-800"
      }`}
    >
      <h2 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6 border-b-2 border-blue-500 pb-2">
        Contact Me
      </h2>

      {backendStatus && (
        <div className="text-red-600 text-xs sm:text-sm mb-2">
          Backend/API error: {backendStatus}
        </div>
      )}

      <form
        onSubmit={handleSend}
        className="flex flex-col gap-3 sm:gap-4 w-full max-w-lg"
      >
        <label
          className={`text-xs sm:text-sm font-semibold ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Your Name
          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            className={`mt-1 w-full px-2 sm:px-3 py-1 sm:py-2 rounded-lg border transition-colors ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 text-gray-200 focus:border-blue-500"
                : "bg-white border-gray-300 text-gray-800 focus:border-blue-400"
            } focus:outline-none text-sm sm:text-base`}
            placeholder="Your name"
            disabled={loading}
          />
        </label>

        <label
          className={`text-xs sm:text-sm font-semibold ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Your Email
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            className={`mt-1 w-full px-2 sm:px-3 py-1 sm:py-2 rounded-lg border transition-colors ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 text-gray-200 focus:border-blue-500"
                : "bg-white border-gray-300 text-gray-800 focus:border-blue-400"
            } focus:outline-none text-sm sm:text-base`}
            placeholder="Your email"
            disabled={loading}
          />
        </label>

        <label
          className={`text-xs sm:text-sm font-semibold ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Message
          <textarea
            name="message"
            required
            value={form.message}
            onChange={handleChange}
            className={`mt-1 w-full px-2 sm:px-3 py-1 sm:py-2 rounded-lg border transition-colors resize-vertical ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 text-gray-200 focus:border-blue-500"
                : "bg-white border-gray-300 text-gray-800 focus:border-blue-400"
            } focus:outline-none text-sm sm:text-base`}
            rows={4}
            placeholder="Write your message"
            disabled={loading}
          />
        </label>

        <button
          type="submit"
          className={`font-bold px-4 py-2 sm:py-3 rounded-lg transition text-sm sm:text-base ${
            theme === "dark"
              ? "bg-blue-700 text-white hover:bg-blue-800"
              : "bg-blue-600 text-white hover:bg-blue-700"
          } disabled:opacity-50`}
          disabled={loading || !!backendStatus}
        >
          {loading ? "Sending..." : "Send"}
        </button>

        {sent && (
          <span className="text-green-500 text-xs sm:text-sm mt-1">
            Message sent!
          </span>
        )}
        {error && (
          <span className="text-red-500 text-xs sm:text-sm mt-1">{error}</span>
        )}
      </form>

      <span
        className={`text-xs ${
          theme === "dark" ? "text-gray-400" : "text-gray-500"
        } mt-4 block`}
      >
        Your message will be sent to <b>matasmatasp@gmail.com</b>
      </span>
    </div>
  );
}
