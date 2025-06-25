export default function EmailPanel() {
  return (
    <div className="flex flex-col items-start gap-2 p-4">
      <button
        className="text-blue-700 font-bold underline hover:text-blue-900 transition"
        onClick={() => {
          navigator.clipboard.writeText("matasmatasp@gmail.com");
          alert("Email copied to clipboard!");
        }}
      >
        matasmatasp@gmail.com
      </button>
      <span className="text-xs text-gray-500">Click to copy email</span>
    </div>
  );
}
