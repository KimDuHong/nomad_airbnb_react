import { useQuery } from "@tanstack/react-query";
import { getMe } from "../components/api";

export default function useUser() {
  const { isLoading, data, isError } = useQuery(["me"], getMe, {
    retry: false,
    // staleTime: 5000,
  });
  /*재시도를 막음*/
  return {
    userLoading: isLoading,
    user: data,
    isLoggedIn: !isError,
  };
}
