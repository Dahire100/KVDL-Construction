import { useQuery } from "@tanstack/react-query";
import type { SafeUser } from "@shared/schema";

interface AuthResponse {
  user: SafeUser | null;
}

export function useAuth() {
  const { data, isLoading } = useQuery<AuthResponse>({
    queryKey: ["/api/auth/user"],
    retry: false,
  });

  return {
    user: data?.user || null,
    isAuthenticated: !!data?.user,
    isLoading,
  };
}
