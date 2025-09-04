import { useState, useEffect } from "react";
import { sendEmail, checkEmailService } from "../../api/email";
import { useTheme } from "../../context/ThemeContext";
import {
  FaEnvelope,
  FaLinkedin,
  FaExternalLinkAlt,
  FaExclamationTriangle,
  FaCheckCircle,
  FaSpinner,
} from "react-icons/fa";

export default function EmailPanel() {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<{
    type: "idle" | "loading" | "success" | "error";
    message: string;
  }>({ type: "idle", message: "" });
  const [serviceHealth, setServiceHealth] = useState<boolean | null>(null);

  useEffect(() => {
    const checkHealth = async () => {
      const isHealthy = await checkEmailService();
      setServiceHealth(isHealthy);
    };
    checkHealth();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      setStatus({
        type: "error",
        message: "Please fill in all fields before sending.",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({
        type: "error",
        message: "Please enter a valid email address.",
      });
      return;
    }

    setStatus({ type: "loading", message: "Sending your message..." });

    try {
      const result = await sendEmail(formData);

      if (result.success) {
        setStatus({
          type: "success",
          message:
            "Email sent successfully! Thank you for reaching out. I'll get back to you soon.",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus({
          type: "error",
          message:
            result.error ||
            "Failed to send email. Please try the alternative contact methods below.",
        });
      }
    } catch (error) {
      setStatus({
        type: "error",
        message:
          "Something went wrong! Please try the alternative contact methods below.",
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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

      <div
        className={`mb-4 p-3 rounded-lg flex items-center gap-2 ${
          serviceHealth === true
            ? theme === "dark"
              ? "bg-green-900/30 border border-green-600 text-green-200"
              : "bg-green-50 border border-green-300 text-green-800"
            : serviceHealth === false
            ? theme === "dark"
              ? "bg-red-900/30 border border-red-600 text-red-200"
              : "bg-red-50 border border-red-300 text-red-800"
            : theme === "dark"
            ? "bg-gray-700/50 border border-gray-600 text-gray-200"
            : "bg-gray-50 border border-gray-300 text-gray-600"
        }`}
      >
        {serviceHealth === true && <FaCheckCircle className="text-green-500" />}
        {serviceHealth === false && (
          <FaExclamationTriangle className="text-red-500" />
        )}
        {serviceHealth === null && (
          <FaSpinner className="text-gray-500 animate-spin" />
        )}
        <span className="text-sm">
          {serviceHealth === true && "Email service is ready"}
          {serviceHealth === false &&
            "Email service unavailable - please use alternative contact methods"}
          {serviceHealth === null && "Checking email service..."}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 mb-6">
        <div>
          <label
            htmlFor="name"
            className={`block text-sm font-medium mb-1 sm:mb-2 ${
              theme === "dark" ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-800"
            }`}
            placeholder="Your full name"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className={`block text-sm font-medium mb-1 sm:mb-2 ${
              theme === "dark" ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-800"
            }`}
            placeholder="your.email@example.com"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className={`block text-sm font-medium mb-1 sm:mb-2 ${
              theme === "dark" ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm sm:text-base ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-800"
            }`}
            placeholder="Your message here..."
          />
        </div>

        <button
          type="submit"
          disabled={status.type === "loading" || serviceHealth === false}
          className={`w-full font-medium py-2 px-4 rounded-lg transition-colors text-sm sm:text-base flex items-center justify-center gap-2 ${
            status.type === "loading" || serviceHealth === false
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {status.type === "loading" && <FaSpinner className="animate-spin" />}
          {status.type === "loading" ? "Sending..." : "Send Message"}
        </button>
      </form>

      {status.message && (
        <div
          className={`p-3 sm:p-4 rounded-lg mb-6 ${
            status.type === "success"
              ? theme === "dark"
                ? "bg-green-900/40 text-green-200 border border-green-700"
                : "bg-green-100 text-green-800 border border-green-200"
              : status.type === "error"
              ? theme === "dark"
                ? "bg-red-900/40 text-red-200 border border-red-700"
                : "bg-red-100 text-red-800 border border-red-200"
              : theme === "dark"
              ? "bg-blue-900/40 text-blue-200 border border-blue-700"
              : "bg-blue-100 text-blue-800 border border-blue-200"
          }`}
        >
          <div className="flex items-start gap-2">
            {status.type === "success" && (
              <FaCheckCircle
                className="text-green-600 mt-1 flex-shrink-0"
                size={16}
              />
            )}
            {status.type === "error" && (
              <FaExclamationTriangle
                className="text-red-600 mt-1 flex-shrink-0"
                size={16}
              />
            )}
            <p className="text-sm">{status.message}</p>
          </div>
        </div>
      )}

      <div
        className={`p-4 sm:p-6 rounded-xl border ${
          status.type === "error"
            ? theme === "dark"
              ? "bg-yellow-900/30 border-yellow-600/50 text-yellow-100"
              : "bg-yellow-50 border-yellow-300 text-yellow-800"
            : theme === "dark"
            ? "bg-gray-800/80 border-gray-600 text-gray-100"
            : "bg-gray-50 border-gray-200 text-gray-700"
        }`}
      >
        {status.type === "error" && (
          <div className="mb-4">
            <h3
              className={`font-semibold text-base sm:text-lg mb-2 ${
                theme === "dark" ? "text-yellow-200" : "text-yellow-800"
              }`}
            >
              Having trouble? Contact me directly:
            </h3>
          </div>
        )}

        <h3
          className={`font-semibold text-sm sm:text-base mb-3 ${
            status.type === "error"
              ? theme === "dark"
                ? "text-yellow-200"
                : "text-yellow-800"
              : theme === "dark"
              ? "text-gray-200"
              : "text-gray-700"
          }`}
        >
          Alternative Contact Methods
        </h3>

        <div className="space-y-3">
          {/* Gmail Link */}
          <a
            href="mailto:matasmatasp@gmail.com"
            className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
              theme === "dark"
                ? "bg-gray-700/80 hover:bg-gray-600/80 border border-gray-600 text-gray-100"
                : "bg-white hover:bg-gray-50 border border-gray-200"
            } shadow-sm hover:shadow-md group`}
          >
            <div className="flex items-center justify-center w-10 h-10 bg-red-500 text-white rounded-lg group-hover:scale-110 transition-transform">
              <FaEnvelope size={18} />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-sm sm:text-base">Email</h4>
              <p
                className={`text-xs sm:text-sm ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                matasmatasp@gmail.com
              </p>
            </div>
            <FaExternalLinkAlt
              className={`text-xs sm:text-sm ${
                theme === "dark" ? "text-gray-300" : "text-gray-500"
              } group-hover:text-blue-500 transition-colors`}
            />
          </a>

          {/* LinkedIn Link */}
          <a
            href="https://www.linkedin.com/in/matas-štrimaitis-9aa953186/?originalSubdomain=lt"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
              theme === "dark"
                ? "bg-gray-700/80 hover:bg-gray-600/80 border border-gray-600 text-gray-100"
                : "bg-white hover:bg-gray-50 border border-gray-200"
            } shadow-sm hover:shadow-md group`}
          >
            <div className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-lg group-hover:scale-110 transition-transform">
              <FaLinkedin size={18} />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-sm sm:text-base">LinkedIn</h4>
              <p
                className={`text-xs sm:text-sm ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Professional Network
              </p>
            </div>
            <FaExternalLinkAlt
              className={`text-xs sm:text-sm ${
                theme === "dark" ? "text-gray-300" : "text-gray-500"
              } group-hover:text-blue-500 transition-colors`}
            />
          </a>
        </div>

        {status.type === "error" && (
          <div
            className={`mt-4 p-3 rounded-lg ${
              theme === "dark"
                ? "bg-yellow-900/40 border border-yellow-700"
                : "bg-yellow-100"
            }`}
          >
            <p
              className={`text-xs sm:text-sm ${
                theme === "dark" ? "text-yellow-100" : "text-yellow-800"
              }`}
            >
              💡 <strong>Tip:</strong> Click on the email link above to open
              your default email client, or visit my LinkedIn profile to connect
              professionally.
            </p>
          </div>
        )}
      </div>

      {/* Footer Contact Info */}
      <div
        className={`mt-6 pt-4 border-t text-center ${
          theme === "dark" ? "border-gray-600" : "border-gray-200"
        }`}
      >
        <p
          className={`text-xs sm:text-sm ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Quick Contact:
          <span className="text-blue-500 mx-2 font-medium">+370 602 64827</span>
          |
          <a
            href="https://www.linkedin.com/in/matas-štrimaitis-9aa953186/?originalSubdomain=lt"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 mx-2 underline"
          >
            LinkedIn
          </a>
        </p>
      </div>
    </div>
  );
}
