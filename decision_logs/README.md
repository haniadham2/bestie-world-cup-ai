# Decision Logs

A running record of meaningful product and engineering decisions (lightweight ADRs).

## Format

Add one file per decision, e.g. `0001-frontend-folder-structure.md`:

```
# <number>. <title>
Date: YYYY-MM-DD
Status: accepted | superseded
Context: why a decision was needed
Decision: what we chose
Consequences: trade-offs and follow-ups
```

## Example decisions worth logging

- Why the app lives in `frontend/` with a project root around it.
- Why Sprint 1 ships UI-only with a "Coming in Sprint 2" toast.
- Why `localStorage` (not a database) for v1 memory.
