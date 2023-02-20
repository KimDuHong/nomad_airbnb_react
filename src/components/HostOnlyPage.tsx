import useUser from "../lib/useUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useHostOnlyPage() {
  const { user, isLoggedIn, userLoading } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userLoading) {
      if (!user?.is_host) {
        navigate("/");
      }
    }
  }, [userLoading, isLoggedIn, navigate]);
  return;
}
