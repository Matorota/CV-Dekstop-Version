import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Restart() {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    if (count === 0) {
      navigate("/", { replace: true });
      window.location.reload();
      return;
    }
    const timer = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [count, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">Restarting...</h1>
      <p className="text-lg mb-2">
        Restarting in {count} second{count !== 1 ? "s" : ""}...
      </p>
    </div>
  );
}
