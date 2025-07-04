import { useRef, useState } from "react";
import TerminalInput from "./TerminalInput";

type TerminalLine = { type: "input" | "output"; text: string };

export default function TerminalPanel({ onClose }: { onClose: () => void }) {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "output", text: "Welcome to the Linux Terminal! Type 'help'." },
  ]);
  const [cwd, setCwd] = useState<string>("/home/user");
  const [isUpdating, setIsUpdating] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands = {
    help: "Available commands: help, clear, echo, date, whoami, pwd, ls, cd, sudo, update, exit",
    whoami: "user",
    pwd: () => cwd,
    ls: () =>
      cwd === "/"
        ? "home  etc  var  usr  bin"
        : "projects  documents  downloads",
    cd: (arg: string) => {
      if (arg === "/" || arg === "/home" || arg === "/home/user") {
        setCwd(arg === "/" ? "/" : "/home/user");
        return "";
      }
      if (arg === "..") {
        setCwd("/");
        return "";
      }
      if (arg === "projects") {
        setCwd("/home/user/projects");
        return "";
      }
      return `bash: cd: ${arg}: No such file or directory`;
    },
    sudo: (arg: string) =>
      arg === "reboot"
        ? "Rebooting... (simulated)"
        : "Permission denied: you are not in the sudoers file.",
    update: async () => {
      setIsUpdating(true);
      setLines((prev) => [
        ...prev,
        { type: "output", text: "Updating system..." },
      ]);
      await new Promise((r) => setTimeout(r, 1500));
      setLines((prev) => [
        ...prev,
        { type: "output", text: "All packages are up to date." },
      ]);
      setIsUpdating(false);
      return "";
    },
    exit: () => {
      onClose();
      return "";
    },
  };

  const handleCommand = async (cmd: string) => {
    setLines((prev) => [...prev, { type: "input", text: `$ ${cmd}` }]);
    if (cmd === "clear") {
      setLines([]);
      return;
    }
    const [command, ...args] = cmd.split(" ");
    if (command in commands) {
      const fn = commands[command as keyof typeof commands];
      let output = "";
      if (typeof fn === "function") {
        output = await fn(args.join(" "));
      } else {
        output = fn;
      }
      if (output)
        setLines((prev) => [...prev, { type: "output", text: output }]);
    } else if (command === "echo") {
      setLines((prev) => [...prev, { type: "output", text: args.join(" ") }]);
    } else if (cmd.trim() === "") {
      setLines((prev) => [...prev, { type: "output", text: "" }]);
    } else {
      setLines((prev) => [
        ...prev,
        { type: "output", text: `bash: ${command}: command not found` },
      ]);
    }
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
          <div
            key={i}
            className={line.type === "input" ? "text-green-400" : ""}
          >
            {line.type === "input" ? (
              <span>
                <span className="text-blue-400">{cwd}</span> {line.text}
              </span>
            ) : (
              line.text
            )}
          </div>
        ))}
        {isUpdating && (
          <div className="text-yellow-400">
            Downloading packages... (simulated)
          </div>
        )}
      </div>
      <TerminalInput
        onCommand={handleCommand}
        cwd={cwd}
        disabled={isUpdating}
      />
    </div>
  );
}
