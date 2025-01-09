"use client";

import { Link } from "@/components/progress-bar/progress-bar";

export default function ProgressBarDemo() {
  return (
    <Link href="/progress-bar/slow-page" className="underline mb-12">
      Go to Slow Page (2s)
    </Link>
  );
}
