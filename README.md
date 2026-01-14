# Notion Transcripts

Save AI conversation transcripts to a Notion database. Supports **Claude Code**, **Cursor**, and **Codex CLI**.

## Features

- Auto-generates descriptive titles based on conversation content
- Auto-detects relevant tags from your database schema
- Creates bullet-point summaries of each session
- Formats messages as color-coded callouts (blue for user, clear for assistant)
- Preserves code blocks with syntax highlighting
- Documents tool calls with yellow callouts

## Installation

Follow the instructions at [wustep.notion.site/notion-transcripts](http://wustep.notion.site/notion-transcripts) where you can duplicate the database template.

## Usage

Edit `.env` file to have `NOTION_TRANSCRIPT_DATABASE_ID` (dashless UUID). This will be used as the destination database.

Run the save-transcript command in your AI tool:

| Tool | Command | Notes |
|------|---------|-------|
| Claude Code | `/save-transcript` | |
| Cursor | `/save-transcript` | |
| Codex CLI | '$save-transcript' | Note: very slow :"( |

The skill will:
1. Generate a descriptive title based on the conversation
2. Fetch available tags from your database schema
3. Auto-detect relevant tags for the session
4. Create a summary of key points
5. Format the full transcript with callouts
6. Save to your Notion database

## Troubleshooting

**"Please provide the URL to your Transcripts database"**
- Add the `NOTION_TRANSCRIPT_DATABASE_ID` to your `.env` file
- Use a dashless UUID format

**"Unable to access the database"**
- Ensure your Notion MCP is set up correctly and is linked to the correct workspace with your database

**Model/Tool not in database**
- The skill will attempt to add new options automatically
- You can also manually add them in Notion's database settings

## License

MIT
