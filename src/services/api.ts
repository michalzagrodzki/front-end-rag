/* eslint-disable @typescript-eslint/no-explicit-any */
import { http } from "./http";

export interface UploadResponse {
  message: string;
  inserted_count: number;
}

export interface QueryResponse {
  answer: string;
  source_docs: any[];
  conversation_id?: string;
}

export const uploadPdf = (file: File) => {
  const form = new FormData();
  form.append("file", file, file.name);
  return http.post<UploadResponse>("/v1/upload", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const listDocuments = (skip = 0, limit = 10) =>
  http.get<any[]>(`/v1/documents?skip=${skip}&limit=${limit}`);

export const ask = (question: string, conversationId?: string) =>
  http.post<QueryResponse>("/v1/query", {
    question,
    conversation_id: conversationId ?? null,
  });

export const askStream = (
  question: string,
  conversationId: string | null,
  onToken: (token: string) => void
) =>
  new Promise<string>((resolve, reject) => {
    const url = new URL("/v1/query-stream", http.defaults.baseURL);
    const es = new EventSource(url.toString(), {
      withCredentials: true,
    });

    es.onerror = (e) => {
      es.close();
      reject(e);
    };

    let answer = "";
    es.onmessage = (ev) => {
      if (ev.data === "[DONE]") {
        es.close();
        resolve(answer);
        return;
      }
      answer += ev.data;
      onToken(ev.data);
    };

    es.addEventListener("open", () => {
      http.post(url.pathname, {
        question,
        conversation_id: conversationId ?? null,
      });
    });
  });

export const fetchHistory = (conversationId: string) =>
  http.get<{ question: string; answer: string }[]>(
    `/v1/history/${conversationId}`
  );
