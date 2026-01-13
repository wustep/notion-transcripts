# Notion Transcripts

A Claude Code skill that saves conversation transcripts to a Notion database.

## Setup

### 1. Create a Notion Database

Create a database in Notion with the following properties:

| Property | Type | Description |
|----------|------|-------------|
| Name | Title | Transcript title (auto-generated) |
| Model | Select | AI model used (e.g., Claude Opus 4.5) |
| Tool | Select | Tool used (e.g., Claude Code) |
| Tags | Multi-select | Category tags (e.g., feature, bugfix) |
| Commentary | Text | Brief description |

### 2. Connect Notion Integration

1. Go to [Notion Integrations](https://www.notion.so/my-integrations)
2. Create a new integration or use an existing one
3. Share your database with the integration:
   - Open your database in Notion
   - Click **Share** → **Connections**
   - Add your integration

### 3. Configure Environment

Create a `.env` file in the project root:

```
NOTION_TRANSCRIPT_DATABASE_ID=your-database-id-here
```

You can find the database ID in the URL when viewing your database:
```
https://www.notion.so/your-database-id?v=...
                     ^^^^^^^^^^^^^^^^^
```

### 4. Configure MCP Server

The `.mcp.json` file should be configured with the Notion MCP server:

```json
{
  "mcpServers": {
    "notion": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp.notion.com/mcp"]
    }
  }
}
```

## Usage

In Claude Code, run:

```
/save-transcript
```

The skill will automatically:
1. Generate a descriptive title based on the conversation
2. Detect relevant tags from your database schema
3. Create a summary of the conversation
4. Format messages as color-coded callouts
5. Save everything to your Notion database

## Transcript Format

Transcripts are saved with:
- A summary callout at the top
- User messages in blue callouts
- Assistant messages in purple callouts
- Code blocks preserved with syntax highlighting

## Troubleshooting

**"Unable to access the database"**
- Ensure the database is shared with your Notion integration
- Click Share → Connections → Add the integration

**"Please provide the URL to your Transcripts database"**
- Add the `NOTION_TRANSCRIPT_DATABASE_ID` to your `.env` file

## License

MIT
