"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

const HIDDEN_PATTERNS = [/^\/$/, /^\/projets\/.+$/];

export default function FooterWrapper() {
  const pathname = usePathname();
  const shouldHide = HIDDEN_PATTERNS.some((p) => p.test(pathname));
  if (shouldHide) return null;
  return <Footer />;
}
