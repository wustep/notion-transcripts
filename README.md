# Notion Transcripts

Save AI conversation transcripts to a Notion database. Supports **Claude Code**, **Cursor**, and **Codex CLI**.

Note: Codex CLI has some known issues and is not quite recommended yet, see below.

## Features

- Auto-generates titles, summaries, and tags
- Formats messages as callouts with code blocks and tool calls preserved

## Setup

### 1. Database

Create a Notion database with these properties (or duplicate the template at [wustep.notion.site/notion-transcripts](http://wustep.notion.site/notion-transcripts)):

| Property | Type | Description |
|----------|------|-------------|
| Title | Title | Auto-generated from conversation |
| Tool | Select | Claude Code, Cursor, Codex CLI, etc. |
| Model | Select | claude-opus-4.5, claude-sonnet-4, etc. |
| Tags | Multi-select | Your custom tags for categorization |

### 2. Notion MCP

Configure the [Notion MCP server](https://github.com/makenotion/notion-mcp-server) with access to your database.

### 3. Install skill

Clone or copy the skill files to your AI tool's commands directory. On first run, you'll be prompted to provide your database URL.

## Usage

Run the save-transcript command in your AI tool:

| Tool | Command | Notes |
|------|---------|-------|
| Claude Code | `/save-transcript` | |
| Cursor | `/save-transcript` | |
| Codex CLI | `$save-transcript` | Can be very slow and gets its own model name wrong sometimes |

## Troubleshooting

**"Please provide the URL to your Transcripts database"**
- Provide the database URL when prompted, or manually set the `DATABASE_ID` in the skill file

**"Unable to access the database"**
- Ensure your Notion MCP is configured and has access to your database

**Model/Tool not in database**
- The skill adds new options automatically, or you can add them manually in Notion

## License

MIT

## Inspiration

Inspired by [simonw's claude-code-transcripts](https://simonwillison.net/2025/Dec/25/claude-code-transcripts/).
