export interface Config {
  notion: {
    database_id: string;
  };
  defaults: {
    tool: string;
    model: string;
  };
  tagPresets: string[];
}

export interface ConversationTurn {
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
}

export interface Transcript {
  turns: ConversationTurn[];
  metadata?: {
    model?: string;
    tool?: string;
    startTime?: string;
  };
}

export interface NotionPage {
  title: string;
  model: string;
  tool: string;
  tags: string[];
  content: string;
}
