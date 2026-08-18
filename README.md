<div align="center">

# Deep Ocean Liquid Glass Wallpaper

Calm Deep Ocean WebGL fluid, reusable Liquid Glass materials, and a complete DeepSeek Harness UI integration.

**English** | [简体中文](./README.zh-CN.md)

</div>

![DeepSeek Harness Deep Ocean Liquid Glass preview](assets/deepseek-harness-liquid-glass.png)

The preview shows the complete Harness integration: the Fluid canvas stays behind the application, while the Sidebar, Composer, selectors, menus, dialogs, tools, code, and terminal surfaces share one restrained Deep Ocean Glass system.

## What is included

- A standalone WebGL/WebGL2 fluid wallpaper for browsers and Windows Lively Wallpaper.
- A fixed near-black Navy → Deep Blue → Cyan/Aqua palette with no rainbow generation.
- Calm ambient flow, pointer interaction, capped DPR, hidden-tab pause, and Reduced Motion support.
- Reusable `glass-soft`, `glass`, `glass-strong`, and `glass-pill` CSS materials.
- A complete versioned DeepSeek Harness patch with built-in controls and Host-backed persistence.
- A lightweight Cordis adapter for developers who only need the background lifecycle.
- Static Deep Ocean and higher-opacity Glass fallbacks when WebGL or `backdrop-filter` is unavailable.

## Use it with DeepSeek Harness

This is the recommended path if you want the complete UI shown in the preview. The installer changes only the 63 Liquid Glass integration files listed in [`harness/changed-files.txt`](harness/changed-files.txt); it does not redistribute the complete Harness repository.

The tested Harness revision is:

```text
47f943859bef60e4160492346772ded9b24f765a
```

### Windows

```powershell
git clone https://github.com/Jeromechen13/deep-ocean-liquid-glass-wallpaper.git
git clone https://github.com/deepseek-ai/deepseek-harness.git

git -C .\deepseek-harness checkout 47f943859bef60e4160492346772ded9b24f765a

powershell -ExecutionPolicy Bypass `
  -File .\deep-ocean-liquid-glass-wallpaper\harness\install.ps1 `
  -HarnessPath .\deepseek-harness

cd .\deepseek-harness
pnpm dsh web
```

### macOS and Linux

```sh
git clone https://github.com/Jeromechen13/deep-ocean-liquid-glass-wallpaper.git
git clone https://github.com/deepseek-ai/deepseek-harness.git

git -C ./deepseek-harness checkout 47f943859bef60e4160492346772ded9b24f765a
sh ./deep-ocean-liquid-glass-wallpaper/harness/install.sh ./deepseek-harness

cd ./deepseek-harness
pnpm dsh web
```

The installer verifies the patch SHA-256 and runs `git apply --check` before changing Harness. It refuses a dirty worktree and an unsupported Harness revision by default, then installs dependencies and runs the complete build. See the [complete Harness guide](harness/README.md) for compatibility flags and uninstall instructions.

### Controls inside Harness

The quick panel appears in the Sidebar footer. The complete panel is under **Settings → General → Deep Ocean fluid background**.

| Setting | Default | Range or values |
| --- | ---: | --- |
| Enabled | on | on/off |
| Opacity | 48 | 0–100 |
| Brightness | 78 | 35–120 |
| Flow speed | 60 | 0–100 |
| Pointer force | 55 | 0–100 |
| Bloom | 30 | 0–100 |
| Palette | Ocean | Abyss / Ocean / Cyan |
| Quality | Balanced | Eco / Balanced / High |

Changes preview immediately and persist through Harness's `ui-liquid-glass` settings namespace.

## Preview the standalone wallpaper

No build or package installation is required:

```text
git clone https://github.com/Jeromechen13/deep-ocean-liquid-glass-wallpaper.git
cd deep-ocean-liquid-glass-wallpaper
python -m http.server 8000
```

Open `http://localhost:8000/`. The demo provides controls for opacity, brightness, flow speed, pointer force, bloom, palette, quality, pause/resume, and reset.

## Use it with Lively Wallpaper

1. Clone the repository or download its ZIP archive.
2. Keep the repository directory structure intact.
3. In [Lively Wallpaper](https://github.com/rocksdanister/lively), add the repository directory or its root `index.html`.
4. Enable mouse input if pointer disturbance is not forwarded by the wallpaper host.

The root page loads `demo/`, which in turn uses the shared assets under `src/`.

## Embed it in another webpage

Include the Glass stylesheet, create the owned canvas, and load the engine:

```html
<link rel="stylesheet" href="./src/liquid-glass.css">

<canvas id="dsh-liquid-background" aria-hidden="true"></canvas>

<script src="./src/fluid-wallpaper.js"></script>
```

Keep application content above the canvas:

```css
#dsh-liquid-background {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

.app {
  position: relative;
  z-index: 1;
}
```

The engine dispatches `dsh-liquid-fluid-ready` and exposes `window.__DSH_LIQUID_FLUID__`:

```js
window.__DSH_LIQUID_FLUID__.updateConfig({
  flowSpeed: 0.4,
  pointerForce: 0.35,
  bloom: 0.2,
  palette: 'ocean',
  quality: 'balanced',
});

window.__DSH_LIQUID_FLUID__.setEnabled(false); // pause
window.__DSH_LIQUID_FLUID__.setEnabled(true);  // resume
window.__DSH_LIQUID_FLUID_CLEANUP__?.();       // dispose
```

Opacity and final brightness are canvas compositing controls:

```js
const canvas = document.getElementById('dsh-liquid-background');
canvas.style.opacity = '0.48';
canvas.style.filter = 'brightness(0.78) saturate(1.08)';
```

Apply reusable Glass materials with `dsh-glass-soft`, `dsh-glass`, `dsh-glass-strong`, or `dsh-glass-pill`.

## Project layout

```text
assets/                              Preview image
demo/                                Standalone controls and preview
src/fluid-wallpaper.js               WebGL engine and lifecycle runtime
src/liquid-glass.css                 Glass tokens, surfaces, and layering
harness/                              Complete versioned Harness installer
integrations/deepseek-harness/        Lightweight Cordis adapter
index.html                            Browser and Lively entry
LICENSE                              MIT license notices
THIRD_PARTY_NOTICES.md                Upstream attribution
```

## Performance and fallback behavior

- One owned canvas and one WebGL context.
- DPR capped at `1.5`.
- Eco `96/512`, Balanced `128/1024`, and High `192/1024` simulation/dye presets.
- Animation paused while the document is hidden or the effect is disabled.
- Lower ambient and pointer work under `prefers-reduced-motion`.
- Quality changes rebuild framebuffers without creating another WebGL context.
- WebGL failure leaves the static Deep Ocean gradient and host UI usable.
- Missing backdrop filtering falls back to more opaque Glass surfaces.

Strong GPU refraction is not enabled. Important surfaces use CSS Liquid Glass edge highlights, internal reflection, tint, blur, and floating shadows without adding per-component WebGL contexts or breaking hit testing.

## License and credits

The Fluid solver is based on Pavel Dobryakov's [WebGL-Fluid-Simulation](https://github.com/PavelDoGreat/WebGL-Fluid-Simulation), released under the MIT License. The complete patch modifies selected files from [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness), also under the MIT License.

The original notices are retained in [`LICENSE`](LICENSE), the engine source, and [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md).
