import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-black bg-gradient-to-br from-black via-neutral-900 to-yellow-950/20 px-4 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-8">
        <div className="text-center text-white">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--theme-gold)]">
            Dreamhair Crowns
          </p>
          <h1 className="text-3xl font-semibold">Admin Console</h1>
        </div>
        {children}
      </div>
    </div>
  );
}