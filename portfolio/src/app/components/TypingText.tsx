"use client";

import { useEffect, useState } from "react";

type TypingTextProps = {
  text: string;
  speed?: number;
  className?: string;
  showCursor?: boolean;
  onComplete?: () => void;
  isActive?: boolean;
};

export default function TypingText({
  text,
  speed = 120,
  className = "",
  showCursor = true,
  onComplete,
  isActive = true,
}: TypingTextProps) {
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    if (!isActive) {
      return;
    }

    let currentIndex = 0;
    setTypedText("");

    const intervalId = window.setInterval(() => {
      currentIndex += 1;
      setTypedText(text.slice(0, currentIndex));

      if (currentIndex >= text.length) {
        window.clearInterval(intervalId);
        onComplete?.();
      }
    }, speed);

    return () => window.clearInterval(intervalId);
  }, [isActive, onComplete, speed, text]);

  return (
    <span className={`inline-block ${className}`}>
      {typedText}
      {showCursor && (
        <span aria-hidden className="ml-1 inline-block animate-pulse">
          |
        </span>
      )}
    </span>
  );
}
