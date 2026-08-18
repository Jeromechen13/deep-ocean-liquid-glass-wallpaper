# Deep Ocean Liquid Glass wallpaper

一个面向浏览器和 Windows Lively Wallpaper 的深海液态壁纸：深黑蓝底色、克制的 Cyan/Aqua/Blue 流体、缓慢 ambient flow 和适度鼠标扰动。它最初作为 DeepSeek Harness Web 的 Liquid Glass 背景集成，现已整理为不依赖 Harness 核心运行时的独立实现。

## Complete DeepSeek Harness installation

需要获得与原始改造相同的完整 Harness UI 时，请使用版本化安装包，而不是轻量适配器。完整包包含 Harness 内滑块设置、Host 持久化、Sidebar、Composer、Model Selector、Dropdown、Modal、Tool Cards、Code/Terminal 等组件级 Glass 样式，以及 Fluid Canvas 的完整生命周期。

```powershell
git clone https://github.com/Jeromechen13/deep-ocean-liquid-glass-wallpaper.git
git clone https://github.com/deepseek-ai/deepseek-harness.git
git -C .\deepseek-harness checkout 47f943859bef60e4160492346772ded9b24f765a
.\deep-ocean-liquid-glass-wallpaper\harness\install.ps1 -HarnessPath .\deepseek-harness
```

macOS/Linux 使用：

```sh
sh ./deep-ocean-liquid-glass-wallpaper/harness/install.sh ./deepseek-harness
```

完整兼容范围、卸载方法和参数说明见 [`harness/README.md`](harness/README.md)。

## Features

- WebGL/WebGL2 fluid simulation with a fixed deep-ocean palette; no rainbow color generation.
- One owned canvas, capped DPR (1.5), calm ambient flow, pointer interaction, reduced-motion handling, and hidden-tab pause.
- Runtime controls for opacity, brightness, flow speed, pointer force, bloom, palette, quality, and enable/disable.
- Reusable `glass-soft`, `glass`, `glass-strong`, and `glass-pill` CSS materials with a higher-opacity fallback when backdrop filtering is unavailable.
- WebGL failure never blocks the host page; the static Deep Ocean gradient remains usable.

## Quick preview

No build step or package install is required:

```text
python -m http.server 8000
```

Open `http://localhost:8000/`. The demo includes sliders and palette/quality selectors. For a Windows desktop wallpaper, import the repository directory into [Lively Wallpaper](https://github.com/rocksdanister/lively); the root `index.html` opens the self-contained demo entry.

## File structure

```text
src/fluid-wallpaper.js                         WebGL engine and lifecycle runtime
src/liquid-glass.css                           Glass tokens, surfaces, and layering
index.html                                      Browser/Lively entry
demo/                                           Standalone preview and controls
integrations/deepseek-harness/                 Optional Cordis skin package
harness/                                        Complete versioned Harness patch and installers
THIRD_PARTY_NOTICES.md                         Attribution and license boundaries
```

## Integrate into another page

Create a canvas with the id `dsh-liquid-background`, include `src/liquid-glass.css`, then load `src/fluid-wallpaper.js`. The engine exposes `window.__DSH_LIQUID_FLUID__` after dispatching `dsh-liquid-fluid-ready`:

```js
window.__DSH_LIQUID_FLUID__.updateConfig({
  flowSpeed: 0.4,
  pointerForce: 0.35,
  bloom: 0.2,
  palette: 'ocean',
  quality: 'balanced',
});
window.__DSH_LIQUID_FLUID__.setEnabled(false);
window.__DSH_LIQUID_FLUID_CLEANUP__?.();
```

Use `harness/install.ps1` or `harness/install.sh` for the complete Harness UI. The adapter under `integrations/deepseek-harness/` is intentionally lightweight and provides only lifecycle-owned background layering for advanced manual integrations.

## Parameters

| Parameter | Range | Default | Effect |
| --- | --- | ---: | --- |
| Opacity | 0–100 | 48 | Canvas surface visibility |
| Brightness | 0–150 | 78 | Final canvas brightness |
| Flow speed | 0–100 | 60 | Ambient and simulation time scale |
| Pointer force | 0–100 | 55 | Mouse/touch disturbance |
| Bloom | 0–100 | 30 | Restrained cyan edge glow |
| Palette | abyss/ocean/cyan | ocean | Deep blue to cyan range |
| Quality | eco/balanced/high | balanced | Simulation, dye, pressure, and bloom resolution |

## Browser and performance notes

Use a current Chromium, Firefox, or Safari with WebGL. The runtime uses one WebGL context, caps device pixel ratio at 1.5, pauses when the tab is hidden, and reduces work under `prefers-reduced-motion`. If WebGL or linear filtering is unavailable, it disables optional shading/bloom and leaves the host with the CSS gradient fallback.

## License and credits

The fluid solver is based on Pavel Dobryakov's [WebGL-Fluid-Simulation](https://github.com/PavelDoGreat/WebGL-Fluid-Simulation), released under the MIT License. See `LICENSE` and `THIRD_PARTY_NOTICES.md`; the original copyright notice remains in the engine source. The surrounding palette, lifecycle, controls, and Liquid Glass material are the integration work in this repository.
