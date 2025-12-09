"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import PixelTransition from "./PixelTransition";

export default function RouteTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [showTransition, setShowTransition] = useState(true);
  const [renderedChildren, setRenderedChildren] = useState(children);

  useEffect(() => {
    // Trigger transition on every route change
    setShowTransition(true);

    const timer = setTimeout(() => {
      setRenderedChildren(children);
      setShowTransition(false);
    }, 900); // match your PixelTransition duration

    return () => clearTimeout(timer);
  }, [pathname, children]);

  return (
    <>
      {showTransition && <PixelTransition />}
      <div className={showTransition ? "opacity-0" : "opacity-100 transition-opacity duration-300"}>
        {renderedChildren}
      </div>
    </>
  );
}
