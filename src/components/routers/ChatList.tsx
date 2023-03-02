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
import { getChatRoomList } from "../../api";
import ProtectedPage from "../ProtectedPage";
import Chat from "../ChatList";
import { useEffect, useRef, useState } from "react";

export default function ChatList() {
  const navigate = useNavigate();
  const { isLoading, data } = useQuery(["chatRoomList"], getChatRoomList);
  const handleChatClick = (id: string) => {
    navigate(`/chat/${id}`);
  };
  const { userLoading, user } = useUser();
  const socketRef = useRef<WebSocket | null>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [chatRoomList, setChatRoomList] = useState<IChatRoomList[]>([]);

  useEffect(() => {
    if (user) {
      const socketUrl = `ws://127.0.0.1:8000/notifications?user=${user.id}`;
      socketRef.current = new WebSocket(socketUrl);
      setSocket(socketRef.current);

      socketRef.current.onopen = () => {
        console.log("successfully");
        socketRef.current?.send(JSON.stringify({ type: "loadChatHistory" }));
      };

      socketRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(data);
        if (data.type === "chat_message") {
          // Update the chat room list with the new last message
          const updatedChatRoomList = chatRoomList.map((room) => {
            if (room.id === data.room_id) {
              return { ...room, lastMessage: data.text };
            } else {
              return room;
            }
          });
          setChatRoomList(updatedChatRoomList);
        }
      };

      return () => {
        socketRef.current?.close();
      };
    }
  }, [userLoading, chatRoomList]);

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
                {data?.map((room: IChatRoomList, index: number) => (
                  <Chat
                    key={index}
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
