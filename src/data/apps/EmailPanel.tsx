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

  useEffect(() => {}, []);

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
      className={`w-full h-full overflow-y-auto flex flex-col items-center justify-start p-3 sm:p-6 ${
        theme === "dark" ? "text-gray-200" : "text-gray-800"
      }`}
    >
      <div className="w-full max-w-md mx-auto flex flex-col items-center">
        <h2 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6 border-b-2 border-blue-500 pb-2 text-center w-full">
          Contact Me
        </h2>

        {backendStatus && (
          <div className="text-red-600 text-xs sm:text-sm mb-4 text-center w-full p-2 bg-red-50 rounded-lg border border-red-200">
            Backend/API error: {backendStatus}
          </div>
        )}

        <form
          onSubmit={handleSend}
          className="flex flex-col gap-3 sm:gap-4 w-full"
        >
          <div className="space-y-3 sm:space-y-4">
            <label
              className={`block text-xs sm:text-sm font-semibold ${
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
                className={`mt-1 w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border-2 transition-all duration-200 ${
                  theme === "dark"
                    ? "bg-gray-700 border-gray-600 text-gray-200 focus:border-blue-500 focus:bg-gray-600"
                    : "bg-white border-gray-300 text-gray-800 focus:border-blue-400 focus:bg-blue-50"
                } focus:outline-none text-sm sm:text-base shadow-sm hover:shadow-md`}
                placeholder="Enter your full name"
                disabled={loading}
              />
            </label>

            <label
              className={`block text-xs sm:text-sm font-semibold ${
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
                className={`mt-1 w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border-2 transition-all duration-200 ${
                  theme === "dark"
                    ? "bg-gray-700 border-gray-600 text-gray-200 focus:border-blue-500 focus:bg-gray-600"
                    : "bg-white border-gray-300 text-gray-800 focus:border-blue-400 focus:bg-blue-50"
                } focus:outline-none text-sm sm:text-base shadow-sm hover:shadow-md`}
                placeholder="your.email@example.com"
                disabled={loading}
              />
            </label>

            <label
              className={`block text-xs sm:text-sm font-semibold ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Message
              <textarea
                name="message"
                required
                value={form.message}
                onChange={handleChange}
                className={`mt-1 w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border-2 transition-all duration-200 resize-vertical min-h-[100px] ${
                  theme === "dark"
                    ? "bg-gray-700 border-gray-600 text-gray-200 focus:border-blue-500 focus:bg-gray-600"
                    : "bg-white border-gray-300 text-gray-800 focus:border-blue-400 focus:bg-blue-50"
                } focus:outline-none text-sm sm:text-base shadow-sm hover:shadow-md`}
                rows={4}
                placeholder="Write your message here..."
                disabled={loading}
              />
            </label>
          </div>

          <button
            type="submit"
            className={`w-full font-bold px-4 py-3 sm:py-4 rounded-lg transition-all duration-200 text-sm sm:text-base mt-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02] ${
              theme === "dark"
                ? "bg-blue-700 text-white hover:bg-blue-800 focus:bg-blue-800"
                : "bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-700"
            } disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-lg`}
            disabled={loading || !!backendStatus}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Sending...
              </span>
            ) : (
              "Send Message"
            )}
          </button>

          {sent && (
            <div className="text-green-500 text-xs sm:text-sm mt-2 text-center p-2 bg-green-50 rounded-lg border border-green-200">
              ✓ Message sent successfully!
            </div>
          )}
          {error && (
            <div className="text-red-500 text-xs sm:text-sm mt-2 text-center p-2 bg-red-50 rounded-lg border border-red-200">
              ⚠ {error}
            </div>
          )}
        </form>

        <div className="mt-6 text-center">
          <span
            className={`text-xs ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            } block mb-2`}
          >
            Your message will be sent to
          </span>
          <span
            className={`font-semibold text-sm ${
              theme === "dark" ? "text-blue-400" : "text-blue-600"
            }`}
          >
            matasmatasp@gmail.com
          </span>
        </div>
      </div>
    </div>
  );
}
