import { useState } from "react";

export default function TerminalInput({
  onCommand,
  cwd,
  disabled,
}: {
  onCommand: (cmd: string) => void;
  cwd: string;
  disabled?: boolean;
}) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!disabled) {
      onCommand(value);
      setValue("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 px-3 py-2 border-t border-gray-700"
    >
      <span className="text-blue-400 font-mono text-sm">{cwd}</span>
      <span className="text-green-400 font-mono text-sm">$</span>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled}
        className="flex-1 bg-transparent text-green-300 outline-none font-mono text-sm"
        placeholder="Enter command..."
        autoFocus
      />
    </form>
  );
}
