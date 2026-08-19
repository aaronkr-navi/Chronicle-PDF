# Desktop-First Development Rules

This instance of Chronicle PDF is used as a **personal desktop PDF app**. All development decisions should reflect this.

## Login Must Stay Disabled
- `security.enableLogin` must remain `false` in `settings.yml` and in the `task dev` default
- The Tauri desktop build already enforces this via `-Dsecurity.enableLogin=false` in `backend.rs`
- Never re-enable login unless explicitly asked

## Hide Server-Only UI
- `system.showSettingsWhenNoLogin` must remain `false`
- Do not show admin settings sections (Workspace, Configuration, AI, Security, Licensing, Policies) in the desktop or dev builds
- Every feature visible in the UI must work without login and without a premium license

## Feature Visibility Principle
- If a feature requires `enableLogin: true` or `premiumEnabled: true` to function, it must not appear in the UI
- The desktop layer (`src/desktop/`) already handles this for Tauri builds; ensure `task dev` behaves similarly
