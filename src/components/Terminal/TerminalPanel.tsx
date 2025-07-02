import { useRef, useState } from "react";
import TerminalInput from "./TerminalInput";

export default function TerminalPanel({ onClose }: { onClose: () => void }) {
  const [lines, setLines] = useState<string[]>([
    "Welcome to the Linux Terminal! Type 'help' for commands.",
  ]);
  const terminalRef = useRef<HTMLDivElement>(null);

  const handleCommand = (cmd: string) => {
    let output = "";
    if (cmd === "help") {
      output = "Available commands: help, clear, echo, date";
    } else if (cmd === "clear") {
      setLines([]);
      return;
    } else if (cmd.startsWith("echo ")) {
      output = cmd.slice(5);
    } else if (cmd === "date") {
      output = new Date().toString();
    } else if (cmd.trim() === "") {
      output = "";
    } else {
      output = `Command not found: ${cmd}`;
    }
    setLines((prev) => [...prev, `$ ${cmd}`, output]);
    setTimeout(() => {
      terminalRef.current?.scrollTo(0, terminalRef.current.scrollHeight);
    }, 10);
  };

  return (
    <div
      className="w-full h-full flex flex-col bg-black text-green-300 border border-gray-700"
      style={{ minWidth: 320, minHeight: 200 }}
    >
      <div className="h-8 bg-gray-900 text-white flex items-center px-3 border-b border-gray-700 select-none">
        <span className="font-mono text-sm flex-1">Terminal</span>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-red-400 px-2 py-0.5 rounded transition"
          title="Close"
        >
          ×
        </button>
      </div>
      <div
        ref={terminalRef}
        className="flex-1 overflow-y-auto px-3 py-2 font-mono text-sm"
        style={{ background: "black" }}
      >
        {lines.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
      <TerminalInput onCommand={handleCommand} />
    </div>
  );
}
