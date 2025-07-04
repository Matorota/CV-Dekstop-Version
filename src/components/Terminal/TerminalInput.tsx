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
      className="flex px-3 py-2 bg-black border-t border-gray-700"
    >
      <span className="text-blue-400 font-mono mr-2">{cwd}</span>
      <span className="text-green-400 font-mono">$</span>
      <input
        className="flex-1 bg-black text-green-300 font-mono outline-none px-2"
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value)}
        spellCheck={false}
        autoComplete="off"
        disabled={disabled}
      />
    </form>
  );
}
