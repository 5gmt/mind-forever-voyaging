import type { FrameLocator } from "@playwright/test";

export const observeReadingLifecycle = async (frame: FrameLocator) => frame.locator("body").evaluate(() => {
  const state = window as typeof window & { AMFVReadingTrace?: { events: unknown[]; sample: (cause: string) => void } };
  if (state.AMFVReadingTrace) return;
  const ids = new WeakMap<Element, number>();
  let nextId = 0, previous = "";
  const id = (node: Element | null) => node ? ids.get(node) ?? (ids.set(node, ++nextId), nextId) : null;
  const events: unknown[] = [];
  const sample = (cause: string) => {
    const host = document.getElementById("amfv-localized-presentation-host");
    const surface = host?.querySelector<HTMLElement>(".story-presentation-scroll") ?? null;
    const buffer = [...document.querySelectorAll<HTMLElement>(".BufferWindow")].at(-1) ?? null;
    const reading = { host: id(host), surface: id(surface), buffer: id(buffer), hidden: host?.hidden,
      mode: document.documentElement.dataset.amfvPresentationMode, top: surface?.scrollTop,
      height: surface?.clientHeight, total: surface?.scrollHeight, outer: buffer?.scrollTop };
    const signature = JSON.stringify(reading);
    if (signature !== previous || cause.startsWith("mark:")) {
      events.push({ cause, time: Math.round(performance.now()), ...reading });
      if (events.length > 80) events.shift();
      previous = signature;
    }
  };
  new MutationObserver(() => sample("mutation")).observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ["hidden"] });
  document.addEventListener("scroll", () => sample("scroll"), true);
  window.addEventListener("message", (event) => {
    if (event.data?.channel === "amfv:bridge" && event.data.type === "presentation-mode") sample(`mode:${event.data.mode}`);
  });
  state.AMFVReadingTrace = { events, sample };
  sample("installed");
});

export const readingTrace = async (frame: FrameLocator, mark: string) => frame.locator("body").evaluate((_body, label) => {
  const trace = (window as typeof window & { AMFVReadingTrace?: { events: unknown[]; sample: (cause: string) => void } }).AMFVReadingTrace;
  trace?.sample(`mark:${label}`);
  return trace?.events;
}, mark);
