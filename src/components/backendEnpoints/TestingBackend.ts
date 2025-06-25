import React from "react";
import { useEffect, useState } from "react";

export default function TestingBackend() {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/hello")
      .then((res) => res.json())
      .then((data) => setMsg(data.message));
  }, []);

  return React.createElement("div", null, msg);
}
