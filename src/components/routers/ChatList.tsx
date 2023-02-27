import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  HStack,
  List,
  ListItem,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Outlet, useNavigate } from "react-router-dom";
import useUser from "../../lib/useUser";
import { IChatRoomList } from "../../types";
import { getChatRoomList } from "../api";
import ProtectedPage from "../ProtectedPage";
import Chat from "../ChatList";
import { m } from "framer-motion";

export default function ChatList() {
  const navigate = useNavigate();
  const { isLoading, data } = useQuery(["chatRoomList"], getChatRoomList);
  const handleChatClick = (id: string) => {
    navigate(`/chat/${id}`);
  };

  return (
    <ProtectedPage>
      <Container h={"80vh"} maxW="container.xl">
        <Grid templateColumns={"1fr 1fr"} mt={"14"}>
          <Container maxW="container.lg" mt={4}>
            <Heading size="md" mb={4}>
              Chat Rooms
            </Heading>
            {isLoading ? (
              <Text>Loading...</Text>
            ) : (
              <List spacing={4}>
                {data?.map((room: IChatRoomList) => (
                  <Chat
                    id={room.id}
                    users={room.users}
                    lastMessage={room.lastMessage}
                    updated_at={room.updated_at}
                  />
                ))}
              </List>
            )}
          </Container>
          <Outlet />
        </Grid>
      </Container>
    </ProtectedPage>
  );
}
