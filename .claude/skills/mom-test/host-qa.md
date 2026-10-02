# Structured Q&A (host-portable)

Human gates in this lab need a **real answer**, not an invented one.

Follow this file whenever an agent or skill says Native Q&A, AskQuestion, or AskUserQuestion.

Writing questions into a deliverable (`brief.md` §10, `problems.md` §4, `experience.md` §7, `ui.md` §6, …) is **not** asking.

## Prefer a native picker

If this session’s tool list includes a **first-class structured question tool**, call it **directly** (same class as Write / Shell). Do not assume Cursor.

Typical names (use whichever is actually listed):

| Host | Tool |
| ---- | ---- |
| Cursor | `AskQuestion` |
| Claude Code | `AskUserQuestion` |
| Other IDEs | the picker in the tool list, if any |

Rules:

1. **Never** invoke the picker via `CallDynamicTool`, `GetDynamicTools`, or an MCP namespace (`cursor`, …). “Tool not found in namespace” means the **wrong API** — retry as a direct host call, or use the fallback below.
2. **Never** look for the picker inside MCP catalogs.
3. Emit the tool call in the same turn — don’t say you will ask later.
4. At most **one question theme per assistant turn**.
5. ≥2 options. Include a freeform escape when a story answer is likely.
6. Match the documentation language.

### Logical payload

Hosts differ in field names. Map this onto the schema you actually have (`prompt` vs `question`, `allow_multiple` vs `multiSelect`, `header`, …):

```text
title: optional short label
questions: [
  {
    id: "stable-id",
    prompt: "<question in documentation language>",
    options: [
      { id: "opt_a", label: "<short option>" },
      { id: "opt_b", label: "<short option>" },
      { id: "unknown", label: "<don't know / needs research>" },
      { id: "other", label: "Something else (I will type it)" }
    ],
    allow_multiple: false
  }
]
```

If the host already adds an “Other” choice, do not duplicate it.

## Fallback when no picker exists

Codex, ChatGPT Work, Antigravity, and some Cursor models have **no** picker.

Do **not** invent the answer. Do **not** block the run on a Cursor-only model switch.

Ask in chat as a **short numbered list** (same prompt, options, and freeform escape). One theme per turn. Wait for the reply before continuing that gate.

Log `ask_question_status: chat_fallback` in `.lab/notes.json`.

Numbered options in chat are forbidden **only while a native picker is available**.

## After each answer

Update the human deliverable and `.lab/notes.json` before the next question. Continue until the queue is clear (answered, deferred to open questions / research, or rejected).

## Evals

- **pass** if every human gate used a **direct** native picker **or** chat fallback per this file, and required queues were cleared (or n/a with note).
- **fail** if answers were invented, the picker was called via MCP / `CallDynamicTool`, or a required queue was abandoned.
