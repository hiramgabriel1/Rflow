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
  const token = typeof window !== "undefined" ? document.cookie.match(/(?:^|;\s*)token=([^;]*)/)?.[1] ?? null : null;

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
  email: string;
  password: string;
  company?: {
    organizationName: string;
    websiteURL: string;
    industry: string;
    teamSize: number;
  };
}

export interface RegisterResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    email: string;
    companyId: string;
  };
}

export interface RegisterResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    email: string;
    companyId: string;
  };
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    email: string;
    companyId: string;
  };
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  plan: string;
  createdAt: string;
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
    request<RegisterResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(input),
    }),

  login: (input: LoginInput) =>
    request<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(input),
    }),

  logout: (refreshToken: string) =>
    request<{ message: string }>("/auth/logout", {
      method: "POST",
      body: JSON.stringify({ refresh_token: refreshToken }),
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
