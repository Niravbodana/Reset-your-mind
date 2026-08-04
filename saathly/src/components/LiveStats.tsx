"use client";

import { useEffect, useState } from "react";

export function LiveStats() {
  const [messages, setMessages] = useState(48291);
  const [users, setUsers] = useState(1247);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessages((m) => m + Math.floor(Math.random() * 3) + 1);
      if (Math.random() > 0.7) setUsers((u) => u + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-wrap gap-6 text-sm">
      <div>
        <p className="text-2xl font-display font-semibold text-gold-light tabular-nums">
          {messages.toLocaleString("en-IN")}+
        </p>
        <p className="text-muted text-xs">Aaj bheje gaye messages</p>
      </div>
      <div className="w-px bg-gold/20 hidden sm:block" />
      <div>
        <p className="text-2xl font-display font-semibold text-gold-light tabular-nums">
          {users.toLocaleString("en-IN")}
        </p>
        <p className="text-muted text-xs">Log abhi active hain</p>
      </div>
      <div className="w-px bg-gold/20 hidden sm:block" />
      <div>
        <p className="text-2xl font-display font-semibold text-gold-light">4.9★</p>
        <p className="text-muted text-xs">User rating</p>
      </div>
    </div>
  );
}
