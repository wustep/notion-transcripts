# CLAUDE.md

## Project Overview

Notion Transcripts saves AI conversation transcripts to a Notion database. It works through **skill definitions** (prompt files) that instruct AI tools how to format and save conversations.

## Architecture

This is a prompt-based tool, not a runtime application:
- **Skill definitions** in `.claude/commands/`, `.cursor/commands/`, and `.codex/skills/` contain the instructions that AI tools follow to save transcripts
- Skills use Notion's MCP server (`mcp_notion_notion-create-pages`) to create pages

## Skill Files

- `.claude/commands/save-transcript.md` - Claude Code skill (invoke with `/save-transcript`)
- `.cursor/commands/save-transcript.md` - Cursor skill
- `.codex/skills/save-transcript/SKILL.md` - Codex CLI skill

**Keep these files in sync.** They contain nearly identical instructions, differing only in:
- **Tool name** in the "Tool" property (Claude Code, Cursor, Codex CLI)
- **Model examples** reflecting each tool's available models
- **MCP tool naming** (e.g., `mcp_notion_notion-create-pages` vs `mcp__notion__notion-create-pages`)
