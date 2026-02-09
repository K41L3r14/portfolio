"use client";

import { useEffect, useState } from "react";

type TypingTextProps = {
  text: string;
  speed?: number;
  className?: string;
};

export default function TypingText({
  text,
  speed = 120,
  className = "",
}: TypingTextProps) {
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    let currentIndex = 0;
    setTypedText("");

    const intervalId = window.setInterval(() => {
      currentIndex += 1;
      setTypedText(text.slice(0, currentIndex));

      if (currentIndex >= text.length) {
        window.clearInterval(intervalId);
      }
    }, speed);

    return () => window.clearInterval(intervalId);
  }, [speed, text]);

  return (
    <span className={`inline-block whitespace-pre-line ${className}`}>
      {typedText}
      <span aria-hidden className="ml-1 inline-block animate-pulse">
        |
      </span>
    </span>
  );
}
