import { formatTime } from "@/utils/format";
import { useEffect, useRef } from "react";
import { LastActiveProps } from "./last-active.types";

export default function LastActive({ timestamp }: LastActiveProps) {
  const displayRef = useRef<HTMLSpanElement>(null); // ref to hold the DOM element

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const diff = Math.floor(now / 1000 - timestamp);
      if (displayRef.current) {
        displayRef.current.textContent = formatTime(diff >= 0 ? diff : 0);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timestamp]);

  return (
    <span suppressHydrationWarning ref={displayRef}>
      {formatTime(Math.floor(Date.now() / 1000 - timestamp))}
    </span>
  );
}
