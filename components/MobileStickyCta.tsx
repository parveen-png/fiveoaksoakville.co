"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { track } from "@/components/analytics-client";
import { project } from "@/lib/project-data";

export function MobileStickyCta() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const target = document.getElementById("register");
    if (!target) {
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShow(!entry?.isIntersecting);
      },
      { threshold: 0.25 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-stone bg-paper/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-12px_40px_-24px_rgb(18_32_51_/_0.45)] backdrop-blur-md lg:hidden">
      <Link
        href="#register"
        className="btn-primary w-full"
        onClick={() => track("hero_cta_click", { placement: "mobile-sticky" })}
      >
        {project.primaryCta}
      </Link>
    </div>
  );
}
