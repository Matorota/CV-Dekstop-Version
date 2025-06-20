import { useEffect, useState } from "react";

export default function LogOut() {
  const [count, setCount] = useState(4);
  const [showCloseMsg, setShowCloseMsg] = useState(false);

  useEffect(() => {
    if (count === 0) {
      setShowCloseMsg(true);
      window.close();
      return;
    }
    const timer = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [count]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-3xl font-bold mb-4">Shutting down...</h1>
      {showCloseMsg ? (
        <p className="text-lg mb-2">Please close this tab manually.</p>
      ) : (
        <p className="text-lg mb-2">
          This tab will close in {count} second{count !== 1 ? "s" : ""}.
        </p>
      )}
    </div>
  );
}
