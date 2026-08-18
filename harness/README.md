# Complete DeepSeek Harness installation

This distribution applies the complete Deep Ocean Liquid Glass implementation to a clean DeepSeek Harness checkout. It is not the lightweight background-only adapter: the patch includes the Host-backed settings plugin, sidebar quick controls, General Settings panel, component-level Glass materials, Fluid engine, Web bundle registration, persistence allowlist, tests, and required documentation metadata.

![DeepSeek Harness Deep Ocean Liquid Glass preview](../assets/deepseek-harness-liquid-glass.png)

## Supported Harness revision

The release was assembled and tested against:

```text
47f943859bef60e4160492346772ded9b24f765a
```

The installer verifies the patch before applying it:

```text
SHA-256: cfda69e84180c58e9b7c8f94d9168cfc9b95f23aded0de7ae7595473408d74ae
Changed Harness files: 63
```

The installer refuses a different revision by default. This protects local Harness work from an incompatible patch. Advanced users may use the version-mismatch flag; installation still proceeds only when `git apply --check` confirms every hunk.

## Prerequisites

- Git
- Node.js `^22.19` or `>=24`, matching Harness requirements
- pnpm
- A clean DeepSeek Harness worktree

Clone and select the supported Harness revision:

```text
git clone https://github.com/deepseek-ai/deepseek-harness.git
cd deepseek-harness
git checkout 47f943859bef60e4160492346772ded9b24f765a
```

## Windows installation

From the wallpaper repository:

```powershell
.\harness\install.ps1 -HarnessPath 'C:\path\to\deepseek-harness'
```

The default flow applies the patch, runs `pnpm install`, and runs the complete Harness build. Use `-SkipInstall` or `-SkipBuild` only when you deliberately want to run those steps yourself.

## macOS and Linux installation

From the wallpaper repository:

```sh
sh ./harness/install.sh /path/to/deepseek-harness
```

The script applies the patch, installs dependencies, and builds Harness.

## Start Harness

```text
cd /path/to/deepseek-harness
pnpm dsh web
```

Open the URL printed by Harness. The Liquid control appears in the sidebar footer. The complete panel is under **Settings → General → Deep Ocean fluid background**.

## Included controls

| Setting | Default | Values |
| --- | ---: | --- |
| Enabled | on | on/off |
| Opacity | 48 | 0–100 |
| Brightness | 78 | 35–120 |
| Flow speed | 60 | 0–100 |
| Pointer force | 55 | 0–100 |
| Bloom | 30 | 0–100 |
| Palette | Ocean | Abyss/Ocean/Cyan |
| Quality | Balanced | Eco/Balanced/High |

Settings persist through Harness's `ui-liquid-glass` Host namespace. Reset removes user overrides and restores deployment defaults.

## Visual coverage

The patch applies the shared Glass tokens and component treatments used by the complete redesign:

- Sidebar and active/hover session items: Glass Level 2
- Conversation world: transparent or nearly transparent
- Composer and Model Selector: Glass Level 3
- Dropdowns, Hover Cards, Modals, Settings, Toasts, and floating surfaces: Glass Level 3
- Tool cards: Glass Level 2 with readable inner surfaces
- Code and Terminal: Glass outer shell with dark translucent inner surfaces

The Fluid canvas remains behind `#root`, uses one WebGL context, caps DPR at 1.5, pauses in hidden tabs, reduces work for Reduced Motion, and falls back to a static Deep Ocean gradient if WebGL fails.

## Compatibility installation

To try a newer Harness revision after reviewing its changes:

```powershell
.\harness\install.ps1 -HarnessPath 'C:\path\to\deepseek-harness' -AllowVersionMismatch
```

```sh
sh ./harness/install.sh /path/to/deepseek-harness --allow-version-mismatch
```

This does not force the patch. If any source section has changed incompatibly, `git apply --check` stops without modifying Harness.

## Uninstall

Do not edit patched lines before uninstalling. The reverse check stops if removal would overwrite later work.

Windows:

```powershell
.\harness\uninstall.ps1 -HarnessPath 'C:\path\to\deepseek-harness'
```

macOS/Linux:

```sh
sh ./harness/uninstall.sh /path/to/deepseek-harness
```

Run `pnpm run clean` afterward if you also want to remove generated build output.

## Scope and limitation

The patch changes presentation, browser lifecycle, and the dedicated settings namespace only. It does not modify the agent loop, sessions, tools, LLM providers, credentials, or API gateway behavior. Strong GPU refraction is not enabled; supported surfaces use CSS Liquid Glass edge reflection and blur because DOM capture would compromise hit testing and require additional WebGL contexts.
