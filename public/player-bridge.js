(() => {
  const CHANNEL = "amfv:bridge";
  let observer;
  let updateTimer;

  const post = (type, detail = {}) => {
    window.parent.postMessage({ channel: CHANNEL, type, ...detail }, window.location.origin);
  };

  const gameText = () => {
    const port = document.getElementById("gameport");
    const text = (port?.innerText || document.body.innerText || "").replace(/\u00a0/g, " ");
    return text.slice(-20000);
  };

  const statusText = () =>
    [...document.querySelectorAll("#gameport .GridWindow")]
      .map((window) => window.innerText)
      .join("\n")
      .replace(/\u00a0/g, " ")
      .slice(-2000);

  const activeInput = () => {
    const inputs = [...document.querySelectorAll("#gameport textarea.Input, #gameport input[type='text'], #gameport textarea")];
    return inputs.reverse().find((input) => {
      const style = getComputedStyle(input);
      return !input.disabled && style.display !== "none" && style.visibility !== "hidden";
    });
  };

  const announceUpdate = () => {
    clearTimeout(updateTimer);
    updateTimer = setTimeout(() => {
      post("transcript", {
        text: gameText(),
        statusText: statusText(),
        acceptsInput: Boolean(activeInput()),
      });
    }, 90);
  };

  const pressEnter = (input) => {
    const eventOptions = { key: "Enter", code: "Enter", bubbles: true, cancelable: true };
    for (const type of ["keydown", "keypress", "keyup"]) {
      const event = new KeyboardEvent(type, eventOptions);
      try {
        Object.defineProperties(event, {
          keyCode: { get: () => 13 },
          which: { get: () => 13 },
        });
      } catch { /* Some browsers expose keyCode as non-configurable. */ }
      input.dispatchEvent(event);
    }
  };

  const submitCommand = (command) => {
    const input = activeInput();
    if (!input) {
      post("busy");
      return;
    }
    input.focus();
    input.value = command;
    input.dispatchEvent(new Event("input", { bubbles: true }));
    if (input.maxLength === 1 && !input.classList.contains("LineInput")) {
      post("command", { command: command.slice(0, 1) });
      announceUpdate();
      return;
    }
    input.dispatchEvent(new Event("change", { bubbles: true }));
    pressEnter(input);
    post("command", { command });
    announceUpdate();
  };

  window.addEventListener("message", (event) => {
    if (event.origin !== window.location.origin || event.data?.channel !== CHANNEL) return;
    const { type } = event.data;
    if (type === "command" && typeof event.data.command === "string") {
      submitCommand(event.data.command.trim());
    } else if (type === "focus") {
      activeInput()?.focus();
    } else if (type === "preferences") {
      const { fontScale, readingMode, highContrast } = event.data;
      if (fontScale) {
        document.documentElement.style.setProperty("--glkote-buffer-size", `${fontScale}px`);
        document.documentElement.style.setProperty("--glkote-grid-size", `${Math.max(12, fontScale - 4)}px`);
      }
      document.documentElement.dataset.readingMode = readingMode === "mono" ? "mono" : "serif";
      document.documentElement.dataset.contrast = highContrast ? "high" : "standard";
    }
  });

  document.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "Enter") {
        const input = event.target;
        if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) {
          const command = input.value.trim();
          if (command) post("command", { command });
        }
      }
    },
    true,
  );

  window.addEventListener("load", () => {
    observer = new MutationObserver(announceUpdate);
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    post("ready");
    announceUpdate();
  });

  window.addEventListener("beforeunload", () => observer?.disconnect());
})();
