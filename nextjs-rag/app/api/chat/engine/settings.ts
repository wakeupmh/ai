import { BEDROCK_MODELS, Bedrock } from "@llamaindex/community";
import {
  Settings,
} from "llamaindex";

const CHUNK_SIZE = 512;
const CHUNK_OVERLAP = 20;

export const initSettings = async () => {
  Settings.llm = new Bedrock({
    model: BEDROCK_MODELS.ANTHROPIC_CLAUDE_3_HAIKU,
  });
  Settings.chunkSize = CHUNK_SIZE;
  Settings.chunkOverlap = CHUNK_OVERLAP;
};
