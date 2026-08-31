"use client";

import { useSyncExternalStore } from "react";

function subscribeMedia(query: string, callback: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function getMediaSnapshot(query: string) {
  return window.matchMedia(query).matches;
}

function getServerSnapshot() {
  return false;
}

export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (callback) => subscribeMedia(query, callback),
    () => getMediaSnapshot(query),
    getServerSnapshot,
  );
}

export function useIsTouchDevice() {
  return useMediaQuery("(hover: none), (pointer: coarse)");
}
