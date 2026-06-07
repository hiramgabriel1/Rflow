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
};

export { ApiError };
