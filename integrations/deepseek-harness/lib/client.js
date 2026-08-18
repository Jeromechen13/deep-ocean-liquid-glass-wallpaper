window.__ModuleLoader__.load({
  id: "dsh-liquid-wallpaper-skin",
  factory: () => {
    const module = { exports: {} };
    const exports = module.exports;

    const PLUGIN_ID = "dsh-liquid-wallpaper-skin";
    const CANVAS_ID = "dsh-liquid-background";
    const SCRIPT_ID = "dsh-liquid-fluid-engine";

    const STYLE = `
      :root {
        background: #030712;
        --dsh-glass-bg-soft: rgba(255, 255, 255, .035);
        --dsh-glass-bg: rgba(255, 255, 255, .07);
        --dsh-glass-bg-strong: rgba(7, 25, 45, .78);
        --dsh-glass-border: rgba(156, 224, 255, .16);
        --dsh-glass-highlight: rgba(185, 239, 255, .24);
        --dsh-glass-blur: blur(18px) saturate(135%);
        --dsh-glass-blur-strong: blur(28px) saturate(155%);
        --dsh-glass-shadow: 0 22px 58px rgba(0, 3, 12, .5), 0 2px 12px rgba(0, 0, 0, .26);
        --dsh-glass-inner-highlight: inset 0 1px 0 rgba(188, 239, 255, .18), inset 0 -1px 0 rgba(0, 0, 0, .3);
      }

      html,
      body {
        min-height: 100%;
        background-color: #030712;
      }

      body {
        isolation: isolate;
        background:
          radial-gradient(ellipse at 18% 12%, rgba(8, 70, 105, .24), transparent 44%),
          radial-gradient(ellipse at 84% 78%, rgba(4, 45, 98, .28), transparent 46%),
          linear-gradient(145deg, #030712 0%, #06101f 48%, #071426 100%);
      }

      #${CANVAS_ID} {
        position: fixed;
        inset: 0;
        z-index: 0;
        display: block;
        width: 100vw;
        height: 100vh;
        pointer-events: none;
        opacity: .48;
        contain: strict;
      }

      #root {
        position: relative;
        z-index: 1;
        min-height: 100vh;
        background: transparent;
      }

      .dsh-glass,
      .dsh-glass-strong,
      .dsh-glass-pill {
        border: 1px solid var(--dsh-glass-border);
        box-shadow: var(--dsh-glass-shadow), var(--dsh-glass-inner-highlight);
        background: var(--dsh-glass-bg);
        -webkit-backdrop-filter: var(--dsh-glass-blur);
        backdrop-filter: var(--dsh-glass-blur);
      }

      .dsh-glass-strong {
        background: var(--dsh-glass-bg-strong);
        -webkit-backdrop-filter: var(--dsh-glass-blur-strong);
        backdrop-filter: var(--dsh-glass-blur-strong);
      }

      .dsh-glass,
      .dsh-glass-strong { border-radius: 14px; }
      .dsh-glass-pill { border-radius: 999px; }

      @supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
        .dsh-glass,
        .dsh-glass-pill { background: rgba(7, 25, 45, .88); }
        .dsh-glass-strong { background: rgba(7, 25, 45, .96); }
      }

      @media (prefers-reduced-motion: reduce) {
        #${CANVAS_ID} { opacity: .38; }
      }

      @media (prefers-color-scheme: light) {
        body:not([data-ds-dark-theme]) {
          background:
            radial-gradient(ellipse at 20% 15%, rgba(50, 175, 205, .15), transparent 42%),
            linear-gradient(145deg, #e9f2f7, #dceaf1 62%, #edf5f8);
        }

        body:not([data-ds-dark-theme]) #${CANVAS_ID} {
          opacity: .22;
        }
      }
    `;

    function removePreviousInstance() {
      try {
        window.__DSH_LIQUID_FLUID_CLEANUP__?.();
      } catch (error) {
        console.warn("[dsh-liquid] previous cleanup failed", error);
      }
      delete window.__DSH_LIQUID_FLUID_CLEANUP__;
      document.getElementById(CANVAS_ID)?.remove();
      document.getElementById(SCRIPT_ID)?.remove();
      document.querySelector(`style[data-plugin="${PLUGIN_ID}"]`)?.remove();
    }

    function loadFluidEngine(canvas) {
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = "/fluid-wallpaper-script.js";
      script.async = true;
      script.dataset.canvas = canvas.id;
      script.addEventListener("error", () => {
        canvas.dataset.fallback = "static";
        console.warn("[dsh-liquid] WebGL engine failed to load; using static deep-ocean fallback");
      }, { once: true });
      document.head.appendChild(script);
      return script;
    }

    function apply(context) {
      if (window.__DSH_LIQUID_OWNER__ && window.__DSH_LIQUID_OWNER__ !== PLUGIN_ID) {
        context.effect(() => () => {}, "ui-effect-dsh-liquid: compatibility skin deferred to in-tree owner");
        return;
      }
      removePreviousInstance();

      const style = document.createElement("style");
      style.dataset.plugin = PLUGIN_ID;
      style.textContent = STYLE;
      document.head.appendChild(style);

      const canvas = document.createElement("canvas");
      canvas.id = CANVAS_ID;
      canvas.setAttribute("aria-hidden", "true");
      canvas.setAttribute("role", "presentation");
      document.body.prepend(canvas);

      const script = loadFluidEngine(canvas);

      context.effect(() => () => {
        try {
          window.__DSH_LIQUID_FLUID_CLEANUP__?.();
        } catch (error) {
          console.warn("[dsh-liquid] cleanup failed", error);
        }
        delete window.__DSH_LIQUID_FLUID_CLEANUP__;
        script.remove();
        canvas.remove();
        style.remove();
      }, "ui-effect-dsh-liquid: deep-ocean fluid and liquid-glass material");
    }

    exports.apply = apply;
    return module.exports;
  }
});
