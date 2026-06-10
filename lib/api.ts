const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;

function getCookie(name: string): string | null {
  if (typeof window === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return match?.[1] ?? null;
}

function setTokenCookie(token: string) {
  if (typeof window === "undefined") return;
  document.cookie = `token=${token}; path=/; max-age=900`;
}

async function refreshToken(): Promise<void> {
  const refresh_token = getCookie("refresh_token");
  if (!refresh_token) {
    if (typeof window !== "undefined") window.location.href = "/auth";
    throw new Error("No refresh token");
  }

  const res = await fetch(`${API_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ refresh_token }),
  });

  if (!res.ok) {
    if (typeof window !== "undefined") window.location.href = "/auth";
    throw new Error("Refresh failed");
  }

  const data = await res.json();
  setTokenCookie(data.access_token);
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getCookie("token");

  if (!token && typeof window !== "undefined" && !path.startsWith("/auth/")) {
    window.location.href = "/auth";
    throw new Error("No token");
  }

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (res.status === 401) {
    if (!isRefreshing) {
      isRefreshing = true;
      refreshPromise = refreshToken().finally(() => {
        isRefreshing = false;
        refreshPromise = null;
      });
    }
    await refreshPromise;

    const newToken = getCookie("token");
    const retryRes = await fetch(`${API_URL}${path}`, {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(newToken ? { Authorization: `Bearer ${newToken}` } : {}),
        ...options.headers,
      },
    });

    const retryData = await retryRes.json().catch(() => ({}));
    if (!retryRes.ok) {
      if (typeof window !== "undefined") window.location.href = "/auth";
      throw new ApiError(
        retryRes.status,
        (retryData as { message?: string }).message || "Something went wrong"
      );
    }
    return retryData as T;
  }

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
  organizationName: string;
  websiteURL: string;
  industry: string;
  teamSize: number;
  contextCompany: string;
  createdAt: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface Conversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface ConversationSummary {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface ConversationListResponse {
  data: ConversationSummary[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CompetitorSummary {
  id: string;
  name: string;
  url: string;
  comparison: string;
  createdAt: string;
  updatedAt: string;
}

export interface CompetitorDetail {
  id: string;
  name: string;
  url: string;
  content: string;
  analysis: string;
  comparison: string;
  createdAt: string;
  updatedAt: string;
}

export interface CompetitorAnalysisResponse {
  message: string;
  competitor: CompetitorSummary;
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

  refreshToken: () => refreshToken(),

  createConversation: (title?: string) =>
    request<Conversation>("/conversations", {
      method: "POST",
      body: JSON.stringify({ title }),
    }),

  listConversations: (page = 1, limit = 15) =>
    request<ConversationListResponse>(`/conversations?page=${page}&limit=${limit}`),

  getConversation: (id: string) =>
    request<Conversation>(`/conversations/${id}`),

  sendMessage: (id: string, content: string) =>
    request<Conversation>(`/conversations/${id}/message`, {
      method: "POST",
      body: JSON.stringify({ content }),
    }),

  clearConversation: (id: string) =>
    request<Conversation>(`/conversations/${id}/clear`, {
      method: "POST",
    }),

  deleteConversation: (id: string) =>
    request<{ deleted: true; conversationId: string }>(`/conversations/${id}`, {
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

  analyzeCompetitor: (url: string) =>
    request<CompetitorAnalysisResponse>(
      "/company-context/analyze-competitor",
      {
        method: "POST",
        body: JSON.stringify({ url }),
      }
    ),

  listCompetitors: () =>
    request<CompetitorSummary[]>("/company-context/competitors"),

  getCompetitor: (id: string) =>
    request<CompetitorDetail>(`/company-context/competitors/${id}`),

  deleteCompetitor: (id: string) =>
    request<{ deleted: boolean; competitorId: string }>(
      `/company-context/competitors/${id}`,
      { method: "DELETE" }
    ),
};

export { ApiError };
