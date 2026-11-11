"use client";
import { useState } from "react";

const FALLBACK = "data:image/svg+xml;utf8," + encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='800' height='500'><rect width='100%' height='100%' fill='#1E2540'/><circle cx='400' cy='235' r='62' fill='none' stroke='#6C86FF' stroke-width='8'/><circle cx='400' cy='235' r='18' fill='#FFB020'/><text x='400' y='360' fill='#9AA3C4' font-family='sans-serif' font-size='26' text-anchor='middle'>StudioSpace</text></svg>"
);

export default function SafeImg({ src, alt = "", className = "", ...rest }) {
  const [bad, setBad] = useState(false);
  return <img src={bad || !src ? FALLBACK : src} alt={alt} className={className} loading="lazy" referrerPolicy="no-referrer" onError={() => setBad(true)} {...rest} />;
}
