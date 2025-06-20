import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Sleep() {
  const navigate = useNavigate();
  const animRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "Enter") {
        navigate("/", { replace: true });
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <div
        ref={animRef}
        className="w-32 h-32 rounded-full bg-blue-900 animate-pulse mb-8 shadow-2xl"
      />
      <h1 className="text-3xl font-bold mb-4">Sleeping...</h1>
      <p className="text-lg mb-6">
        Press <b>Space</b> or <b>Enter</b> or click the button to wake up.
      </p>
      <button
        className="px-6 py-2 bg-blue-600 rounded-lg text-white font-bold hover:bg-blue-700 transition"
        onClick={() => navigate("/", { replace: true })}
      >
        Exit Sleep
      </button>
    </div>
  );
}
