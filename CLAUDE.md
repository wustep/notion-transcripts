# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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

## Configuration

The `.env` file should contain:
```
NOTION_TRANSCRIPT_DATABASE_ID=<dashless-uuid>
```

## Notion Database Schema

The target Notion database requires these properties:
- **Title** (title)
- **Model** (select) - e.g., claude-opus-4.5, claude-sonnet-4
- **Tool** (select) - e.g., Claude Code, Cursor, Codex CLI
- **Tags** (multi-select)

## Notion-Flavored Markdown

The skill files use Notion's enhanced markdown format. Key syntax:

### Callouts
```
<callout icon?="emoji" color?="Color">
	Rich text
	Children (indented with tabs)
</callout>
```

### Code Blocks in Callouts
Code blocks inside callouts must be tab-indented as children:
```
<callout>
	Text before code
	```typescript
	const x = 1;
	```
</callout>
```

### Colors
Background colors: `gray_bg`, `brown_bg`, `orange_bg`, `yellow_bg`, `green_bg`, `blue_bg`, `purple_bg`, `pink_bg`, `red_bg`

### Rich Text
- Bold: `**text**`
- Italic: `*text*`
- Inline code: `` `code` ``
- Line breaks within blocks: `<br>`
