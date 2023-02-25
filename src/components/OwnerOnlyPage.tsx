import { QueryCache, useQuery } from "@tanstack/react-query";
import { IRoomDetail } from "../types";
import { getRoom } from "./api";
import useUser from "../lib/useUser";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const useOwnerOnlyPage = (roomPk: string | undefined) => {
  const { isLoading, data } = useQuery<IRoomDetail>([`rooms`, roomPk], getRoom);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading) {
      if (!data?.is_owner) {
        navigate("/");
      }
    }
  }, [isLoading, data, navigate]);

  return;
};
