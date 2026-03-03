"use client";

export default function TagPill({ tag }: { tag: string }) {
  return (
    <span className="inline-block text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary-50 text-primary-600 dark:bg-primary-800 dark:text-primary-200 border border-primary-100 dark:border-primary-700 whitespace-nowrap">
      {tag}
    </span>
  );
}
