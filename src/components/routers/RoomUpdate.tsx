import { Box } from "@chakra-ui/react";
import { QueryCache } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useHostOnlyPage from "../HostOnlyPage";
import { useOwnerOnlyPage } from "../OwnerOnlyPage";
import ProtectedPage from "../ProtectedPage";

export const RoomUpdate = () => {
  const { roomPk } = useParams();
  useHostOnlyPage();
  useOwnerOnlyPage(roomPk);

  return (
    <ProtectedPage>
      <Box>1</Box>
    </ProtectedPage>
  );
};
