# Notion Transcripts

Save AI conversation transcripts to a Notion database. Supports **Claude Code**, **Cursor**, and **Codex CLI**.

## Features

- Auto-generates descriptive titles based on conversation content
- Auto-detects relevant tags from your database schema
- Creates bullet-point summaries of each session
- Formats messages as color-coded callouts (blue for user, purple for assistant)
- Preserves code blocks with syntax highlighting
- Documents tool calls with yellow callouts

## Setup

### 1. Create a Notion Database

Create a database in Notion with the following properties:

| Property | Type | Description |
|----------|------|-------------|
| Name | Title | Transcript title (auto-generated) |
| Model | Select | AI model used (e.g., claude-opus-4.5) |
| Tool | Select | Tool used (e.g., Claude Code, Cursor, Codex CLI) |
| Tags | Multi-select | Category tags (e.g., feature, bugfix, docs) |
| Commentary | Text | Brief description (filled in manually) |

### 2. Share Database with Notion Integration

1. Open your database in Notion
2. Click **Share** → **Connections**
3. Add your Notion MCP integration

### 3. Configure Environment

Create a `.env` file in your project root:

```
NOTION_TRANSCRIPT_DATABASE_ID=your-database-id-here
```

The database ID is the dashless UUID in the URL when viewing your database:
```
https://www.notion.so/2e75cb08cf2c8033b424e59d31623ed0?v=...
                     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
```

### 4. Install the Skill

Copy the appropriate skill file to your tool's configuration directory:

#### Claude Code

```
.claude/skills/save-transcript/SKILL.md
```

#### Cursor

```
.cursor/rules/save-transcript.mdc
```

#### Codex CLI

```
.codex/skills/save-transcript/SKILL.md
```

## Usage

Run the save-transcript command in your AI tool:

| Tool | Command |
|------|---------|
| Claude Code | `/save-transcript` |
| Cursor | Ask to "save transcript" or reference the rule |
| Codex CLI | Ask to "save transcript" |

The skill will:
1. Generate a descriptive title based on the conversation
2. Fetch available tags from your database schema
3. Auto-detect relevant tags for the session
4. Create a summary of key points
5. Format the full transcript with callouts
6. Save to your Notion database

## Transcript Format

Transcripts are saved with:
- A gray summary callout at the top with bullet points
- User messages in **blue** callouts
- Assistant messages in **purple** callouts
- Tool calls in **yellow** nested callouts (with summarized results)
- Code blocks preserved with language hints

## Troubleshooting

**"Unable to access the database"**
- Ensure the database is shared with your Notion integration
- Click Share → Connections → Add the integration

**"Please provide the URL to your Transcripts database"**
- Add the `NOTION_TRANSCRIPT_DATABASE_ID` to your `.env` file
- Use a dashless UUID format

**Model/Tool not in database**
- The skill will attempt to add new options automatically
- You can also manually add them in Notion's database settings

## License

MIT
