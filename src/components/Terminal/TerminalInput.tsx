import { useState } from "react";

export default function TerminalInput({
  onCommand,
}: {
  onCommand: (cmd: string) => void;
}) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCommand(value);
    setValue("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex px-3 py-2 bg-black border-t border-gray-700"
    >
      <span className="text-green-400 font-mono">$</span>
      <input
        className="flex-1 bg-black text-green-300 font-mono outline-none px-2"
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value)}
        spellCheck={false}
        autoComplete="off"
      />
    </form>
  );
}
