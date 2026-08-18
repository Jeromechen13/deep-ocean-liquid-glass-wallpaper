<div align="center">

# Deep Ocean Liquid Glass Wallpaper

A deep-ocean WebGL fluid wallpaper and Liquid Glass UI for browsers, Windows Lively Wallpaper, and DeepSeek Harness.

**English** | [简体中文](./README_CN.md)

</div>

A deep-ocean liquid wallpaper designed for browsers and Windows Lively Wallpaper, featuring a near-black navy background, restrained Cyan/Aqua/Blue fluid colors, slow ambient flow, and subtle pointer interaction.

It was originally developed as the Liquid Glass background integration for DeepSeek Harness and has since been extracted into a standalone implementation that does not depend on the Harness core runtime.

![DeepSeek Harness Deep Ocean Liquid Glass preview](assets/deepseek-harness-liquid-glass.png)

The image above shows the completed DeepSeek Harness integration in an empty conversation. The fluid canvas stays behind the interface, while the Sidebar, Composer, and main UI use a unified Deep Ocean Glass material system.

## Complete DeepSeek Harness installation

If you want the full DeepSeek Harness experience shown above, use the versioned installation package instead of the lightweight integration adapter.

The complete package includes:

* Built-in Harness sliders and settings
* Host-side configuration persistence
* Sidebar Liquid Glass styling
* Composer Liquid Glass styling
* Model Selector styling
* Dropdown and Modal styling
* Tool Card styling
* Code and Terminal styling
* Full Fluid Canvas lifecycle management

### Windows

```powershell
git clone https://github.com/Jeromechen13/deep-ocean-liquid-glass-wallpaper.git
git clone https://github.com/deepseek-ai/deepseek-harness.git

git -C .\deepseek-harness checkout 47f943859bef60e4160492346772ded9b24f765a

.\deep-ocean-liquid-glass-wallpaper\harness\install.ps1 -HarnessPath .\deepseek-harness
```

### macOS / Linux

```sh
git clone https://github.com/Jeromechen13/deep-ocean-liquid-glass-wallpaper.git
git clone https://github.com/deepseek-ai/deepseek-harness.git

git -C ./deepseek-harness checkout 47f943859bef60e4160492346772ded9b24f765a

sh ./deep-ocean-liquid-glass-wallpaper/harness/install.sh ./deepseek-harness
```

For the complete compatibility range, uninstall instructions, installer parameters, and additional notes, see [`harness/README.md`](harness/README.md).

## Features

* WebGL/WebGL2 fluid simulation with a fixed Deep Ocean palette
* No rainbow or uncontrolled random color generation
* Near-black navy background with restrained Cyan/Aqua/Blue fluid tones
* Slow ambient motion designed for long-running desktop use
* Pointer and touch interaction with configurable disturbance strength
* A single owned fluid canvas
* Device pixel ratio capped at `1.5` for a balance between quality and performance
* Automatic pause when the browser tab becomes hidden
* Reduced workload under `prefers-reduced-motion`
* Runtime controls for:

  * Opacity
  * Brightness
  * Flow speed
  * Pointer force
  * Bloom
  * Palette
  * Quality
  * Enable / disable
* Reusable Liquid Glass CSS materials:

  * `glass-soft`
  * `glass`
  * `glass-strong`
  * `glass-pill`
* Higher-opacity fallback when `backdrop-filter` is unavailable
* Graceful WebGL failure handling
* Static Deep Ocean CSS gradient remains available when WebGL cannot start
* Standalone browser demo
* Windows Lively Wallpaper support
* Optional DeepSeek Harness integration
* Full versioned DeepSeek Harness patch installer

## Quick preview

No build step or package installation is required.

From the repository root, start a local HTTP server:

```text
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

The standalone demo includes controls for fluid intensity, opacity, brightness, flow speed, pointer interaction, bloom, palette, and simulation quality.

For Windows desktop wallpaper usage, import the repository directory into [Lively Wallpaper](https://github.com/rocksdanister/lively).

The root `index.html` acts as the self-contained wallpaper/demo entry.

## File structure

```text
deep-ocean-liquid-glass-wallpaper/
├── assets/
│   └── deepseek-harness-liquid-glass.png
│
├── src/
│   ├── fluid-wallpaper.js
│   └── liquid-glass.css
│
├── demo/
│   └── ...
│
├── integrations/
│   └── deepseek-harness/
│       └── ...
│
├── harness/
│   ├── install.ps1
│   ├── install.sh
│   ├── README.md
│   └── ...
│
├── index.html
├── README.md
├── README_CN.md
├── LICENSE
└── THIRD_PARTY_NOTICES.md
```

Main files:

```text
src/fluid-wallpaper.js
    WebGL fluid engine, rendering loop, configuration, and lifecycle runtime.

src/liquid-glass.css
    Deep Ocean palette, Liquid Glass tokens, surfaces, and layering.

index.html
    Browser and Lively Wallpaper standalone entry.

demo/
    Standalone preview interface and runtime controls.

integrations/deepseek-harness/
    Optional lightweight Cordis skin integration for DeepSeek Harness.

harness/
    Complete versioned DeepSeek Harness patch and installation scripts.

THIRD_PARTY_NOTICES.md
    Third-party attribution and license boundaries.
```

## Integrate into another page

The fluid engine can also be embedded into another webpage without using DeepSeek Harness.

First, create a canvas with the following ID:

```html
<canvas id="dsh-liquid-background"></canvas>
```

Then include the Liquid Glass stylesheet:

```html
<link rel="stylesheet" href="./src/liquid-glass.css">
```

Load the fluid runtime:

```html
<script src="./src/fluid-wallpaper.js"></script>
```

Once initialization is complete, the engine dispatches:

```text
dsh-liquid-fluid-ready
```

The runtime is then available through:

```js
window.__DSH_LIQUID_FLUID__
```

For example:

```js
window.__DSH_LIQUID_FLUID__.updateConfig({
  flowSpeed: 0.4,
  pointerForce: 0.35,
  bloom: 0.2,
  palette: 'ocean',
  quality: 'balanced',
});
```

Disable the fluid canvas:

```js
window.__DSH_LIQUID_FLUID__.setEnabled(false);
```

Re-enable it:

```js
window.__DSH_LIQUID_FLUID__.setEnabled(true);
```

Clean up the runtime:

```js
window.__DSH_LIQUID_FLUID_CLEANUP__?.();
```

For the complete DeepSeek Harness UI integration, use:

```text
harness/install.ps1
```

or:

```text
harness/install.sh
```

The adapter under:

```text
integrations/deepseek-harness/
```

is intentionally lightweight. It provides lifecycle-owned fluid background layering for advanced manual integrations, but does not reproduce the complete Harness UI modification.

## Parameters

| Parameter     | Range                 |  Default | Effect                                                   |
| ------------- | --------------------- | -------: | -------------------------------------------------------- |
| Opacity       | 0–100                 |       48 | Controls fluid canvas visibility                         |
| Brightness    | 0–150                 |       78 | Controls final canvas brightness                         |
| Flow speed    | 0–100                 |       60 | Controls ambient flow and simulation time scale          |
| Pointer force | 0–100                 |       55 | Controls mouse/touch disturbance strength                |
| Bloom         | 0–100                 |       30 | Controls restrained cyan edge glow                       |
| Palette       | abyss / ocean / cyan  |    ocean | Selects the Deep Blue → Cyan color range                 |
| Quality       | eco / balanced / high | balanced | Controls simulation, dye, pressure, and bloom resolution |

## Liquid Glass materials

The stylesheet exposes several reusable surface levels.

### `glass-soft`

Designed for large background surfaces that should remain visually subtle.

### `glass`

The default Liquid Glass material for general interface surfaces.

### `glass-strong`

A stronger material intended for important foreground UI such as modals, floating panels, and high-contrast surfaces.

### `glass-pill`

Designed for compact rounded controls, buttons, badges, and pill-shaped elements.

The materials combine translucent tinting, edge highlights, internal reflections, blur, and controlled shadowing while preserving the Deep Ocean palette.

When browser backdrop filtering is unavailable, the stylesheet automatically falls back to a more opaque surface so the interface remains readable.

## Browser and performance notes

Use a current version of Chromium, Firefox, or Safari with WebGL enabled.

The runtime is intentionally designed to keep the effect visually active without turning the background into a high-load graphics benchmark.

Performance-related behavior includes:

* One WebGL context
* One owned canvas
* Device pixel ratio capped at `1.5`
* Hidden-tab pause
* Reduced workload when `prefers-reduced-motion` is enabled
* Adjustable simulation quality
* Optional bloom and shading
* Graceful degradation when extensions are unavailable

If WebGL initialization fails, the fluid engine does not block or break the host page.

The static Deep Ocean CSS gradient remains active as the fallback background.

If linear texture filtering or related WebGL capabilities are unavailable, optional rendering features such as bloom or shading may be reduced or disabled automatically.

## Lively Wallpaper

The repository can be used directly as a Windows Lively Wallpaper web wallpaper.

1. Clone or download the repository.
2. Open Lively Wallpaper.
3. Add a new wallpaper.
4. Select the repository directory or the root `index.html`.
5. Launch the wallpaper.

The standalone implementation does not require DeepSeek Harness.

## DeepSeek Harness integration

Two integration levels are provided.

### Lightweight adapter

Location:

```text
integrations/deepseek-harness/
```

This is intended for developers who already have their own Harness modification workflow and only want the Deep Ocean fluid background and lifecycle management.

### Complete Harness patch

Location:

```text
harness/
```

This reproduces the complete Deep Ocean Liquid Glass integration, including component-level UI materials and runtime controls.

Because DeepSeek Harness may continue evolving upstream, the full patch is versioned against a known compatible Harness revision.

The current documented revision is:

```text
47f943859bef60e4160492346772ded9b24f765a
```

Use the included installation scripts instead of manually copying individual files whenever possible.

## Design philosophy

The visual direction is intentionally restrained.

This project is not intended to behave like a colorful RGB fluid visualizer. The background remains inside a narrow Deep Ocean spectrum built around:

* Near-black navy
* Deep blue
* Cyan
* Aqua
* Controlled blue-white highlights

Motion is deliberately slow and ambient.

Pointer interaction temporarily disturbs the fluid, while the background returns to a calmer flow when the user stops interacting.

The goal is to keep the wallpaper visually alive without competing with foreground text, code, terminals, dialogs, or application controls.

## Failure behavior

The fluid effect is treated as enhancement rather than a dependency.

If any of the following happens:

* WebGL is unavailable
* WebGL context creation fails
* Required texture capabilities are unavailable
* Optional rendering extensions cannot be initialized
* The fluid runtime encounters an unsupported environment

the host interface should remain usable.

The fallback is the static Deep Ocean gradient defined by the CSS layer.

## License and credits

The fluid solver is based on Pavel Dobryakov's [WebGL-Fluid-Simulation](https://github.com/PavelDoGreat/WebGL-Fluid-Simulation), released under the MIT License.

The original copyright notice is retained in the engine source.

See:

* [`LICENSE`](LICENSE)
* [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md)

for license information, attribution, and third-party boundaries.

The surrounding Deep Ocean palette, lifecycle management, configuration system, controls, Liquid Glass materials, DeepSeek Harness integration, and packaging are integration work provided by this repository.
