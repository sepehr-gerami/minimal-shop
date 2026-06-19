// components/Portal.tsx
"use client";
import { useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

function subscribe() {
  return () => {};
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

export default function Portal({ children }: { children: React.ReactNode }) {
  const mounted = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot
  );

  if (!mounted) return null;

  return createPortal(children, document.body);
}