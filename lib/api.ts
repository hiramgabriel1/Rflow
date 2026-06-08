const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new ApiError(
      res.status,
      (data as { message?: string }).message || "Something went wrong"
    );
  }

  return data as T;
}

export interface RegisterInput {
  fullName: string;
  email: string;
  password: string;
  haveCompany: boolean;
  organizationName?: string;
  website?: string;
  industry?: string;
  teamSize?: number;
}

export interface RegisterResponse {
  id: string;
  fullName: string;
  email: string;
  haveCompany: boolean;
  isActive: boolean;
  createdAt: string;
  access_token: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
}

export interface UserCompany {
  id: string;
  organizationName: string;
  website: string | null;
  industry: string | null;
  teamSize: number | null;
  contextCompany: unknown | null;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  haveCompany: boolean;
  isActive: boolean;
  userCompany: UserCompany | null;
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ConversationSummary {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface Conversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export const api = {
  register: (input: RegisterInput) =>
    request<RegisterResponse>("/users/register", {
      method: "POST",
      body: JSON.stringify(input),
    }),

  login: (input: LoginInput) =>
    request<LoginResponse>("/users/login", {
      method: "POST",
      body: JSON.stringify(input),
    }),

  logout: () =>
    request<{ message: string }>("/users/logout", {
      method: "POST",
    }),

  createConversation: (title: string | undefined, message: string) =>
    request<Conversation>("/conversations", {
      method: "POST",
      body: JSON.stringify({ title, message }),
    }),

  listConversations: () =>
    request<ConversationSummary[]>("/conversations"),

  getConversation: (id: string) =>
    request<Conversation>(`/conversations/${id}`),

  sendMessage: (conversationId: string, message: string) =>
    request<Conversation>(`/conversations/${conversationId}/messages`, {
      method: "POST",
      body: JSON.stringify({ message }),
    }),

  deleteConversation: (id: string) =>
    request<{ message: string }>(`/conversations/${id}`, {
      method: "DELETE",
    }),

  getMe: () =>
    request<UserProfile>("/users/me"),

  analyzeCompany: (url: string) =>
    request<{ message: string; contextCompany: unknown }>(
      "/company-context/analyze",
      {
        method: "POST",
        body: JSON.stringify({ url }),
      }
    ),
};

export { ApiError };
