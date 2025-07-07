import { useState } from "react";

export default function EmailPanel() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    alert(
      `Message sent!\n\nTo: matasmatasp@gmail.com\nFrom: ${form.name} <${form.email}>\n\n${form.message}`
    );
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 2000);
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
          />
        </label>
        <button
          type="submit"
          className="bg-blue-700 text-white font-bold px-4 py-2 rounded hover:bg-blue-800 transition"
        >
          Send
        </button>
        {sent && (
          <span className="text-green-600 text-sm mt-1">Message sent!</span>
        )}
      </form>
      <span className="text-xs text-gray-500 mt-2">
        Your message will be sent to <b>Matas Štrimaitis</b>
      </span>
    </div>
  );
}
