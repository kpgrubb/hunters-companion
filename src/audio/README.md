# Music tracks

Drop your audio files here and they show up in the app's player automatically —
no code changes needed. Supported: `.mp3`, `.ogg`, `.m4a`, `.wav`.

## Naming (optional niceties)

- Leading track numbers are stripped: `01 - Tavern Rest.mp3` → **Tavern Rest**
- Add a mood tag after a double underscore: `Deep Woods__ambient.mp3` → title **Deep Woods**, mood **ambient**

After adding files, the dev server hot-reloads. For a production build, re-run `npm run build`.

> Tip: keep files reasonably compressed (128–192 kbps mp3) so the installable/offline
> bundle stays small.
