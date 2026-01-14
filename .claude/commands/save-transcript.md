---
name: save-transcript
description: Saves the current conversation to Notion. Use when the user asks to save, export, or record the conversation transcript.
---

# Save Transcript Skill

Save the current conversation to Notion.

## Prerequisites
- The user has a Notion database with the following properties:
	- Title: Title
	- Model: Select
	- Tool: Select
	- Tags: Multi-select
- The user has a Notion MCP server running and configured properly with access to the database.

## Instructions

When the user invokes this skill, follow these steps:

### 1. Read Database ID and Schema

DATABASE_ID: <Replace with your database ID here, e.g. 1a2b3c4d5e6f78901234567890abcdef>

1. Read the database ID above, if set.

2. If and only if fetching the database fails or the database ID is not set above, 
then inform the user: 
"I was unable to access the Notion transcripts database. Please ensure the database is properly configured in the skill file. Please provide the URL to your Transcripts database in Notion and I can set it for you, or you can manually set it in [insert skill path here]". Links are formatted like `notion.so/[workspaceId]/[databaseId]?v=[viewId]` (with workspaceId and viewId optional).
And edit the skill file to set the database ID.

3. Fetch the database schema to discover:
- Available tag options from the Tags multi_select property
- Available model options from the Model select property (e.g. "claude-opus-4.5", "claude-sonnet-4", etc)
- Available tool options from the Tool select property (e.g. "Claude Code", "Cursor", "Codex CLI", etc)

### 2. Auto-Generate Title

Create a concise, descriptive title (5-10 words) based on the main task or goal of the conversation.
Example: "Fix authentication bug in user service" or "Add dark mode toggle to settings"

### 3. Auto-Detect Tags

Analyze the conversation and assign relevant tags from the options that are available in the database schema. Match the conversation content to the most appropriate tags based on their names. 

### 4. Generate Summary

Create a brief summary (3-5 bullet points) of this conversation covering:
- Main topic/goal
- Key decisions made
- Important code changes or files modified
- Outcome/result

### 5. Format the Transcript

Convert the current conversation to Notion-flavored markdown:
- Start with the generated summary in a callout block
```
<callout color="gray_bg">
	**Summary**
	- bullet point 1
	- bullet point 2
	- bullet point 3
</callout>
```
- Add a horizontal rule: `---`
- Format each message as a callout (no icon) with a bold speaker label:
```
<callout color="blue_bg">
	**User**
	Message content
</callout>
```
```
<callout>
	**Assistant**
	Message content
</callout>
```
- Each callout should contain the full message content with proper formatting
- Exclude the /save-transcript message and response from the transcript

#### Transcript Fidelity

**Preserve the original text verbatim.** The transcript should be an accurate record:
- **User messages:** Copy exactly as written, including typos, formatting, and line breaks
- **Assistant prose:** Preserve the full response text without paraphrasing or summarizing
- **Only summarize tool results:** File contents, command outputs, and search results should be condensed (see Tool Call Formatting below)

#### Block Formatting

- Callout content must have proper indentation.
- Code blocks inside callouts must be indented as children of the callout. Use triple backticks with the language identifier:
```typescript<br>	function hello() {<br>		console.log("Hello");<br>	}<br>```
- Always include the language hint (e.g., `typescript`, `python`, `bash`, `json`, `yaml`, `markdown`)
- Use `text` or omit the language for plain text/output
- Code blocks must be on their own lines, indented with a tab inside the callout
- Preserve the original indentation within the code itself

#### Tool Call Formatting

Tool calls and results are an important part of the conversation record. Format them as nested callouts within the Assistant message:

- **Tool calls:** Use `green_bg` callout with the tool name in bold
- **Tool results:** Summarize the result briefly (don't include full file contents or lengthy outputs)

Example: <callout>\**Assistant**<br>\tLet me check the git status and read that file.<br><callout color="green_bg">\**Tool: Bash** `git status`<br>\tOutput: On branch main, 2 files modified</callout><callout color="green_bg">\**Tool: Read** `src/config.ts`<br>\tRead 45 lines from config file containing database settings.</callout><callout>\tBased on the status, I can see there are uncommitted changes...</callout>


**Guidelines for tool results:**

- Summarize file reads (e.g., "Read 120 lines of React component handling user auth")
- Include key output from bash commands, truncate if very long
- For search results, mention what was found (e.g., "Found 5 matches in src/utils/")
- Skip redundant tool calls (e.g., multiple similar grep searches can be combined)

### 6. Save to Notion

Use the `mcp_notion_notion-create-pages` tool to create a new page in the database found in step 2:

```json
{
	"parent": {"database_id": "<from step 2>"},
	"pages": [
		{
			"properties": {
				"Title": "<auto-generated title>",
				"Model": "<detected model>",
				"Tool": "Claude Code",
				"Tags": "<tag1>, <tag2>"
			},
			"content": "<formatted transcript in Notion-flavored markdown>"
		}
	]
}
```

- Properties use simple string values (the tool handles conversion to Notion format)
- For multi-select Tags, use comma-separated values
- The `content` field contains the full formatted transcript from step 5

**Important:** Only set the properties listed above (Title, Model, Tool, Tags). Do not fill in other properties.

### 6. Confirm Success

Report to the user:
- The page title
- A link to the created Notion page (if available), linkified
- The tags applied

## Model Detection

Detect the current model from the conversation context or system info:
- claude-opus-4.5, claude-sonnet-4, etc.
- Default to "unknown" if the model cannot be determined
- Add the model name to the database if it is not present
