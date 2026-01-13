import test from "node:test";
import assert from "node:assert/strict";

import { convertToNotionMarkdown, parseTranscript } from "../index.js";

test("parseTranscript supports colon-style role markers", () => {
  const raw = ["User: hello", "Assistant: hi there"].join("\n");
  const parsed = parseTranscript(raw);

  assert.equal(parsed.turns.length, 2);
  assert.equal(parsed.turns[0]?.role, "user");
  assert.equal(parsed.turns[0]?.content, "hello");
  assert.equal(parsed.turns[1]?.role, "assistant");
  assert.equal(parsed.turns[1]?.content, "hi there");
});

test("parseTranscript supports markdown heading role markers", () => {
  const raw = ["### User", "hello", "", "### Assistant", "hi there"].join("\n");
  const parsed = parseTranscript(raw);

  assert.equal(parsed.turns.length, 2);
  assert.equal(parsed.turns[0]?.role, "user");
  assert.equal(parsed.turns[0]?.content, "hello");
  assert.equal(parsed.turns[1]?.role, "assistant");
  assert.equal(parsed.turns[1]?.content, "hi there");
});

test("convertToNotionMarkdown infers python for python code blocks without language", () => {
  const transcript = {
    turns: [
      {
        role: "assistant" as const,
        content: ["Here you go:", "", "```", "import os", "print('hi')", "```"].join("\n"),
      },
    ],
  };

  const md = convertToNotionMarkdown(transcript);
  assert.ok(md.includes("```python\nimport os\nprint('hi')\n```"));
});

