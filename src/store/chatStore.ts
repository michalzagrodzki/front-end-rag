/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { ask, fetchHistory } from "../services/api";

export interface Message {
  role: "user" | "assistant";
  text: string;
}

interface ChatState {
  conversationId: string;
  messages: Message[];
  loading: boolean;
  error: string | null;

  initConversation: () => void;
  sendMessage: (text: string) => Promise<void>;
  loadHistory: (cid: string) => Promise<void>;
  clearChat: () => void;
}

export const useChatStore = create<ChatState>()(
  devtools((set, get) => ({
    conversationId: undefined,
    messages: [],
    loading: false,
    error: null,

    initConversation: () => {
      // generate new UUID on first ask; FastAPI will also generate one if missing
      set(() => ({ conversationId: undefined, messages: [], error: null }));
    },

    sendMessage: async (text) => {
      set({ loading: true, error: null });

      const { conversationId, messages } = get();

      try {
        const { data, headers } = await ask(text, conversationId);
        const newCID =
          headers["x-conversation-id"] ??
          data.conversation_id ??
          conversationId;

        set({
          conversationId: newCID,
          messages: [
            ...messages,
            { role: "user", text },
            { role: "assistant", text: data.answer },
          ],
          loading: false,
        });
      } catch (err: any) {
        set({
          loading: false,
          error: err.response?.data?.detail || err.message || "Unknown error",
        });
      }
    },

    loadHistory: async (cid) => {
      set({ loading: true, error: null });
      try {
        const { data } = await fetchHistory(cid);
        const history: Message[] = data.flatMap((h) => [
          { role: "user", text: h.question },
          { role: "assistant", text: h.answer },
        ]);
        set({ conversationId: cid, messages: history, loading: false });
      } catch (err: any) {
        set({
          loading: false,
          error:
            err.response?.data?.detail ||
            err.message ||
            "Failed loading history",
        });
      }
    },

    clearChat: () =>
      set({ conversationId: undefined, messages: [], error: null }),
  }))
);
