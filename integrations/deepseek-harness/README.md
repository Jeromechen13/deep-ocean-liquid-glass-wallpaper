# DeepSeek Harness integration

This optional Cordis client plugin mounts one `#dsh-liquid-background` canvas behind the Harness root, injects the base Deep Ocean glass material, loads the shared Fluid runtime, and removes all owned DOM, listeners, animation frames, and WebGL resources on unload or HMR.

## Install

1. Copy `src/fluid-wallpaper.js` to the Harness web public directory as `fluid-wallpaper-script.js`.
2. From the Harness repository, install this directory as a local client skin:

   ```text
   pnpm dsh plugin --profile web add "file:<PATH_TO_REPOSITORY>/integrations/deepseek-harness"
   ```

3. Start the web profile and verify that only one canvas with the `dsh-liquid-background` id exists.

The plugin does not require an API key, backend service, or third-party runtime dependency. It yields to the in-tree `ui-liquid-glass` owner when that plugin is already active, preventing duplicate WebGL contexts.
