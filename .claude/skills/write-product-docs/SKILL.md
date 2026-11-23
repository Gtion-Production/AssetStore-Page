---
name: write-product-docs
description: Use when writing or revising the static HTML documentation of a Gtion Asset Store product (products/<name>/docs): fills pages from code and the live editor, captures Unity screenshots, keeps nav and pagers consistent, and runs a newcomer review.
---

# Write product documentation (Gtion Asset Store pages)

Docs are static HTML under `products/<product>/docs/`, one folder per section, images in each section's `img/`. Vectoria is the reference example (`products/vectoria/docs`).

## Rules for the text

- **Facts come from the source, not memory.** Read the code (menu paths, shortcuts, enum names, tooltips, inspector labels) and the existing docs before writing. Quote real UI names exactly (`Tools > Vectoria > Open Vectoria Painter`, component `Vectoria Image`). If a claim cannot be verified, cut it or flag it to the user.
- **Hover tooltips and status bars are documentation.** Capture and reuse their thresholds and wording.
- Plain words, short sentences, active voice. Define a term where it first appears (resolver, bleed, speck) or link to its page.
- Do not add hedging clauses the user did not ask for (for example, they cut "its size depends on complexity"). Do not oversell: say what is true and stop.
- One topic lives in one page. Other pages get one sentence and a link. Overview pages stay short because child pages cover the detail.
- Use one name per thing across all pages (menu path, bar name, mode name). Check the nav label, h1, and body agree.
- Say why a step matters, not only what to click (why name shapes, when to pick a mode).
- Product docs do not need an "AI skill" page; agents read the README or skills.
- No em dashes. No emojis.

## Page structure

- Copy an existing page as the template. Change `<title>`, meta description, crumbs, `<h1>`, lead (`<p class="lead muted">`), body and pager.
- Body order: lead, short intro, `h2` sections, optional `<div class="note">`.
- Images: `<img src="img/x.png" alt="..." style="cursor:zoom-in;display:block;width:100%;max-width:Npx;height:auto;border-radius:4px;margin:10px 0 0">`. `docs-nav.js` adds click-to-zoom to every `.doc-body img`. Use max-width 900 for full windows, 420-620 for panels and dialogs, 120 for a thin toolbar crop. Descriptive alt text.
- Sidebar tree is hard-coded in every page, with a path prefix per depth (`../`, `../painter/`, `painter/`). The current page gets `class="cur d1"`, its parent group `class="anc d0"` and `<details ... open>`.
- **Adding, moving or deleting a page** means: update the sidebar in every html file, the pagers of its neighbours (prev/next chain), the parent index "Learn more" list, the docs home "Full map" and quick-answer tables, and any inline links. Do this with a script (regex over `docs/**/*.html`), then run a link check that resolves every `href`/`src` (no broken links allowed).
- Give headings an `id` when other pages deep-link to them.

## Screenshots from the live Unity editor

1. Prefer scene data and headless renders where they answer the question; use screenshots for UI.
2. Painter window: `unity command vp_open --path=...` then `vp_screenshot --out=...`, or an `eval_file` that reads screen pixels of the window (`InternalEditorUtility.ReadScreenPixel`). Always write the capture to a scratch folder, never into `Assets`.
3. `eval_file` bodies have no `using` lines; use fully qualified names. Call private window methods by reflection (for the Painter: `VectoriaWindow.Run("window.Layers")`, `Run("tool.Star")`, `Run("edit.selectAll")`, `Run("window.workspace.Default")`). Static `Open(...)` methods open dialogs (`VectorImageTraceWindow.OpenForFile`, `VectorSvgOptionsWindow.Open`).
4. Menus and clicks: drive the real mouse with a PowerShell `SetCursorPos` + `mouse_event` helper. Screen position = window position (+23 px title bar). The first click only focuses the window. Clicking a menu title while another menu is open closes it, so click empty canvas between menus.
5. **Modal dialogs block the editor's main thread** (every `unity command` then times out with "Main thread operation timed out"). Capture them from a full desktop screenshot (`Graphics.CopyFromScreen`), crop, then dismiss with a click. Never leave a dialog open when finishing.
6. Make sample content that looks good (a real icon with a gradient, a selected shape), set the state you want to show (selection, tab, mode), capture, then restore the editor: tab, mode, workspace, no scratch tabs. Close scratch documents with "Don't Save".
7. Crop with System.Drawing to the panel or menu that matters. Mask local paths (project folders, user names) before saving. Never show personal data.
8. Delete scratch files you made. Remove unused images from `img/` (grep each png against the html).
9. Keep shell here simple: write PowerShell or Python to a file and run it, instead of long inline heredocs with nested quotes.

## Review loop (always)

After writing, launch one subagent as a first-time reader: no edits, read the pages in order, open every screenshot, report confusing terms, screenshots that do not match the text, contradictions between pages, repetition, and whether key decisions (for example which mode to pick) are clear. Give it the file paths only, not your conclusions. Then fix the real findings: contradictions first, then undefined terms, then duplication. Re-run the link check.

## Finish

Tell the user what changed, which claims you could not verify from code, and what you could not capture or check (browser layout, extra screenshots). The browser pane only shows static snapshots of local files, so say when layout was not viewed.
