/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { askStream, fetchHistory } from "../services/api";
import { v4 as uuidv4 } from "uuid";

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

    async sendMessage(text: string) {
      // optimistic user bubble
      set((s) => ({
        messages: [...s.messages, { role: "user", text }],
        loading: true,
        error: null,
      }));

      // ensure we have a UUID before first request
      let cid = get().conversationId;
      if (!cid) {
        cid = uuidv4();
        set({ conversationId: cid });
      }

      try {
        const { answer, conversation_id } = await askStream(text, cid);

        const finalCID = conversation_id ?? cid;
        if (finalCID !== cid) set({ conversationId: finalCID });

        set((s) => ({
          messages: [...s.messages, { role: "assistant", text: answer }],
          loading: false,
        }));
      } catch (err: any) {
        set({
          loading: false,
          error:
            err.message ||
            "Failed to fetch answer. Please try again in a moment.",
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
