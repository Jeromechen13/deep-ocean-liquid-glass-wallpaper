<div align="center">

# Deep Ocean Liquid Glass Wallpaper

面向浏览器、Windows Lively Wallpaper 与 DeepSeek Harness 的深海 WebGL 流体壁纸与 Liquid Glass UI。

[English](./README.md) | **简体中文**

</div>

一个面向浏览器和 Windows Lively Wallpaper 的深海液态壁纸，采用近乎纯黑的深海蓝背景、克制的 Cyan / Aqua / Blue 流体颜色、缓慢的 Ambient Flow，以及适度的鼠标与触控扰动。

这个项目最初作为 DeepSeek Harness Web 的 Liquid Glass 背景集成开发，之后被整理为一个不依赖 Harness 核心运行时的独立实现。

![DeepSeek Harness Deep Ocean Liquid Glass preview](assets/deepseek-harness-liquid-glass.png)

上图为完整 DeepSeek Harness 改造后的空白会话预览。Fluid Canvas 位于整个 UI 后方，Sidebar、Composer 和主界面统一使用 Deep Ocean Liquid Glass 材质。

## 完整 DeepSeek Harness 安装

如果你希望获得与上方预览相同的完整 DeepSeek Harness UI，请使用版本化安装包，而不是轻量级 Integration Adapter。

完整版本包含：

* Harness 内置滑块与设置
* Host 配置持久化
* Sidebar Liquid Glass 样式
* Composer Liquid Glass 样式
* Model Selector 样式
* Dropdown 与 Modal 样式
* Tool Cards 样式
* Code 与 Terminal 样式
* Fluid Canvas 完整生命周期管理

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

完整兼容范围、卸载方法、安装参数以及其他说明请参阅：

[`harness/README.md`](harness/README.md)

## 功能特性

* 基于 WebGL / WebGL2 的 Fluid Simulation
* 固定 Deep Ocean 配色，不生成 Rainbow 或随机彩虹颜色
* 接近纯黑的深海蓝背景
* 克制的 Cyan / Aqua / Blue 流体
* 适合长期桌面运行的缓慢 Ambient Flow
* 鼠标与触控交互
* 可调整 Pointer Force
* 整个页面只拥有一个 Fluid Canvas
* DPR 最大限制为 `1.5`，在画质与性能之间取得平衡
* 页面隐藏时自动暂停
* 支持 `prefers-reduced-motion`
* 支持运行时调整：

  * Opacity
  * Brightness
  * Flow Speed
  * Pointer Force
  * Bloom
  * Palette
  * Quality
  * Enable / Disable
* 提供可重复使用的 Liquid Glass CSS 材质：

  * `glass-soft`
  * `glass`
  * `glass-strong`
  * `glass-pill`
* 浏览器不支持 `backdrop-filter` 时自动使用更高透明度的降级样式
* WebGL 启动失败不会阻塞 Host 页面
* WebGL 不可用时保留静态 Deep Ocean Gradient
* 提供独立浏览器 Demo
* 支持 Windows Lively Wallpaper
* 提供可选 DeepSeek Harness 集成
* 提供完整版本化 DeepSeek Harness Patch 与安装脚本

## 快速预览

不需要执行 Build，也不需要安装任何 npm package。

在仓库根目录运行：

```text
python -m http.server 8000
```

然后打开：

```text
http://localhost:8000/
```

Standalone Demo 内置 Fluid 参数控制，包括：

* 流体强度
* 透明度
* 亮度
* 流动速度
* 鼠标扰动力度
* Bloom
* Palette
* Quality

如果希望作为 Windows 桌面动态壁纸使用，可以将整个仓库目录导入 [Lively Wallpaper](https://github.com/rocksdanister/lively)。

仓库根目录的：

```text
index.html
```

就是自包含的浏览器 / Lively Wallpaper 入口。

## 文件结构

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

主要文件说明：

```text
src/fluid-wallpaper.js
    WebGL Fluid Engine、渲染循环、参数配置以及生命周期 Runtime。

src/liquid-glass.css
    Deep Ocean Palette、Liquid Glass Tokens、Surface 与 Layering。

index.html
    浏览器以及 Lively Wallpaper 的独立入口。

demo/
    Standalone Preview 与运行时参数控制界面。

integrations/deepseek-harness/
    DeepSeek Harness 的可选轻量级 Cordis Skin 集成。

harness/
    完整版本化 DeepSeek Harness Patch 与安装脚本。

THIRD_PARTY_NOTICES.md
    第三方项目署名、License 与代码边界说明。
```

## 集成到其他页面

Fluid Engine 并不依赖 DeepSeek Harness，也可以单独嵌入其他网页。

首先创建一个 Canvas，并使用以下 ID：

```html
<canvas id="dsh-liquid-background"></canvas>
```

然后加载 Liquid Glass CSS：

```html
<link rel="stylesheet" href="./src/liquid-glass.css">
```

加载 Fluid Runtime：

```html
<script src="./src/fluid-wallpaper.js"></script>
```

初始化完成后，Engine 会派发：

```text
dsh-liquid-fluid-ready
```

此时可以通过：

```js
window.__DSH_LIQUID_FLUID__
```

访问 Fluid Runtime。

例如：

```js
window.__DSH_LIQUID_FLUID__.updateConfig({
  flowSpeed: 0.4,
  pointerForce: 0.35,
  bloom: 0.2,
  palette: 'ocean',
  quality: 'balanced',
});
```

关闭 Fluid：

```js
window.__DSH_LIQUID_FLUID__.setEnabled(false);
```

重新开启：

```js
window.__DSH_LIQUID_FLUID__.setEnabled(true);
```

清理 Runtime：

```js
window.__DSH_LIQUID_FLUID_CLEANUP__?.();
```

如果希望使用完整 DeepSeek Harness UI 集成，请运行：

```text
harness/install.ps1
```

或者：

```text
harness/install.sh
```

位于：

```text
integrations/deepseek-harness/
```

下的 Adapter 刻意保持轻量化。

它主要用于高级手动集成场景，只负责由生命周期管理的 Fluid Background Layering，并不会复现完整 Harness UI 改造。

## 参数

| 参数            | 范围                    |      默认值 | 作用                                            |
| ------------- | --------------------- | -------: | --------------------------------------------- |
| Opacity       | 0–100                 |       48 | 控制 Fluid Canvas 的可见度                          |
| Brightness    | 0–150                 |       78 | 控制最终 Canvas 亮度                                |
| Flow speed    | 0–100                 |       60 | 控制 Ambient Flow 与 Simulation 时间尺度             |
| Pointer force | 0–100                 |       55 | 控制鼠标与触控扰动力度                                   |
| Bloom         | 0–100                 |       30 | 控制克制的 Cyan 边缘辉光                               |
| Palette       | abyss / ocean / cyan  |    ocean | 控制 Deep Blue → Cyan 的颜色范围                     |
| Quality       | eco / balanced / high | balanced | 控制 Simulation、Dye、Pressure 与 Bloom Resolution |

## Liquid Glass 材质

CSS 中提供了多个可以复用的 Glass Surface 等级。

### `glass-soft`

用于较大的背景 Surface。

视觉效果更加克制，适合 Sidebar、主内容区域等大面积区域。

### `glass`

默认 Liquid Glass Material。

适合大多数普通 UI Surface。

### `glass-strong`

更强的 Glass Material。

适合 Modal、Floating Panel 以及需要更强前景层级的区域。

### `glass-pill`

适合：

* 圆角按钮
* Badge
* 小型 Controls
* Pill-shaped UI

这些材质组合使用半透明 Tint、Edge Highlight、Inner Reflection、Backdrop Blur 与受控 Shadow，同时保持统一的 Deep Ocean 色彩语言。

如果浏览器不支持 Backdrop Filtering，CSS 会自动切换到更加不透明的 Fallback Surface，从而保证内容可读性。

## 浏览器与性能说明

建议使用支持 WebGL 的较新版本 Chromium、Firefox 或 Safari。

这个 Runtime 的目标是在保持视觉活力的同时，避免让背景变成一个高负载 GPU Benchmark。

性能相关设计包括：

* 单一 WebGL Context
* 单一 Owned Canvas
* Device Pixel Ratio 最大限制为 `1.5`
* Tab 隐藏时自动暂停
* `prefers-reduced-motion` 开启时降低计算量
* 可调 Simulation Quality
* Bloom 与 Shading 可选
* WebGL Extension 不可用时自动降级

如果 WebGL 初始化失败，Fluid Engine 不会阻塞或破坏 Host 页面。

此时会保留 CSS 中定义的静态 Deep Ocean Gradient 作为背景。

如果 Linear Texture Filtering 或相关 WebGL Capability 不可用，Bloom、Shading 等可选功能可能会自动降低质量或关闭。

## Lively Wallpaper

这个仓库可以直接作为 Windows Lively Wallpaper 的 Web Wallpaper 使用。

使用方法：

1. Clone 或下载这个仓库。
2. 打开 Lively Wallpaper。
3. 添加新的 Wallpaper。
4. 选择仓库目录或根目录中的 `index.html`。
5. 启动 Wallpaper。

Standalone Implementation 不依赖 DeepSeek Harness。

## DeepSeek Harness 集成

项目提供两种 DeepSeek Harness 集成方式。

### Lightweight Adapter

位置：

```text
integrations/deepseek-harness/
```

适合已经拥有自己的 Harness 修改流程，只希望加入 Deep Ocean Fluid Background 和生命周期管理的开发者。

### Complete Harness Patch

位置：

```text
harness/
```

用于复现完整 Deep Ocean Liquid Glass UI，包括 Component-level Glass Material 和 Runtime Controls。

由于 DeepSeek Harness 上游项目可能持续更新，因此完整 Patch 会绑定到经过验证的 Harness Revision。

当前文档对应的 Revision 为：

```text
47f943859bef60e4160492346772ded9b24f765a
```

如果没有特殊需求，建议优先使用项目提供的 Installer，而不是手动复制单个文件。

## 设计理念

这个项目的视觉方向刻意保持克制。

它并不是一个 RGB Fluid Visualizer，也不会生成大面积随机 Rainbow 色彩。

整个背景主要限制在一个较窄的 Deep Ocean Spectrum 中：

* Near-black Navy
* Deep Blue
* Cyan
* Aqua
* 受控的 Blue-white Highlight

流体运动速度也刻意保持缓慢。

用户移动鼠标时会暂时扰动 Fluid，而停止交互后，背景会逐渐恢复更加平缓的 Ambient Flow。

目标是在让背景保持生命感的同时，不与前景中的：

* Text
* Code
* Terminal
* Dialog
* Modal
* Application Controls

争夺视觉注意力。

## 错误与降级行为

Fluid Effect 被视为增强层，而不是页面正常运行的必要依赖。

如果发生以下情况：

* WebGL 不可用
* WebGL Context 创建失败
* Required Texture Capability 不可用
* Optional Rendering Extension 初始化失败
* 当前 Runtime Environment 不被支持

Host UI 仍然应该保持可用。

最终 Fallback 是 CSS 中定义的静态 Deep Ocean Gradient。

## License 与致谢

Fluid Solver 基于 Pavel Dobryakov 的 [WebGL-Fluid-Simulation](https://github.com/PavelDoGreat/WebGL-Fluid-Simulation)。

原项目使用 MIT License。

原始 Copyright Notice 已保留在 Engine Source 中。

详细 License、第三方署名以及代码边界请参阅：

* [`LICENSE`](LICENSE)
* [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md)

本仓库中的 Deep Ocean Palette、Lifecycle Management、Configuration System、Runtime Controls、Liquid Glass Material、DeepSeek Harness Integration 与 Packaging 为本项目的集成与扩展工作。
