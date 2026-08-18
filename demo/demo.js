const canvas = document.getElementById('dsh-liquid-background');
const state = { opacity: 48, brightness: 78, flowSpeed: 60, pointerForce: 55, bloom: 30, palette: 'ocean', quality: 'balanced', enabled: true };

function runtime() {
  return window.__DSH_LIQUID_FLUID__;
}

function applySurface() {
  canvas.style.opacity = String(state.enabled ? state.opacity / 100 : 0);
  canvas.style.filter = `brightness(${state.brightness / 100}) saturate(1.08)`;
}

function applyRuntime() {
  runtime()?.updateConfig({ flowSpeed: state.flowSpeed / 100, pointerForce: state.pointerForce / 100, bloom: state.bloom / 100, palette: state.palette, quality: state.quality });
}

function bindRange(id, key) {
  const input = document.getElementById(id);
  const output = input.nextElementSibling;
  input.addEventListener('input', () => { state[key] = Number(input.value); output.value = input.value; applySurface(); applyRuntime(); });
}

for (const [id, key] of [['opacity', 'opacity'], ['brightness', 'brightness'], ['flowSpeed', 'flowSpeed'], ['pointerForce', 'pointerForce'], ['bloom', 'bloom']]) bindRange(id, key);
for (const id of ['palette', 'quality']) document.getElementById(id).addEventListener('change', (event) => { state[id] = event.target.value; applyRuntime(); });

document.getElementById('toggle').addEventListener('click', (event) => {
  state.enabled = !state.enabled;
  runtime()?.setEnabled(state.enabled);
  event.currentTarget.textContent = state.enabled ? 'Pause fluid' : 'Resume fluid';
  applySurface();
});

document.getElementById('reset').addEventListener('click', () => {
  Object.assign(state, { opacity: 48, brightness: 78, flowSpeed: 60, pointerForce: 55, bloom: 30, palette: 'ocean', quality: 'balanced', enabled: true });
  for (const key of ['opacity', 'brightness', 'flowSpeed', 'pointerForce', 'bloom']) { const input = document.getElementById(key); input.value = state[key]; input.nextElementSibling.value = state[key]; }
  document.getElementById('palette').value = state.palette;
  document.getElementById('quality').value = state.quality;
  document.getElementById('toggle').textContent = 'Pause fluid';
  runtime()?.setEnabled(true);
  applySurface();
  applyRuntime();
});

applySurface();
applyRuntime();

window.addEventListener('pagehide', () => window.__DSH_LIQUID_FLUID_CLEANUP__?.(), { once: true });
