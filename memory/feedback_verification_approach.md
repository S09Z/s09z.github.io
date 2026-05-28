---
name: feedback_verification_approach
description: How to verify UI changes — read source files, not screenshots
metadata:
  type: feedback
---

Do not take browser screenshots to verify UI changes. Read the HTML/source files directly to confirm structure and content is correct. Screenshots create .png clutter in the workspace.

**Why:** User prefers reading source over visual screenshots for verification. Avoids littering the project directory with generated image files.

**How to apply:** After writing Astro/HTML pages, verify by reading the .astro source file. Only use browser tools when the user explicitly asks to preview or visual-check something.
