@AGENTS.md

## Working agreement (Claude Code)
- Diagnostics only: do not edit files and do not run git commands that change state.
  Sara applies every change manually.
- Paste command output verbatim; do not summarize it.
- The shell is Windows PowerShell: use `Select-String` / `Get-Content` instead of grep/head;
  PowerShell swallows `--`; quote comma-separated arguments (`"production,docker"`).