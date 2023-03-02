import { Box, Container, Grid, Heading, List, Text } from "@chakra-ui/react";
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
    setChatRoomList(data);
  }, [isLoading]);

  useEffect(() => {
    if (user) {
      const socketUrl = `ws://127.0.0.1:8000/notifications?user=${user.id}`;
      socketRef.current = new WebSocket(socketUrl);
      setSocket(socketRef.current);

      socketRef.current.onopen = () => {
        socketRef.current?.send(JSON.stringify({ type: "loadChatHistory" }));
      };

      socketRef.current.onmessage = (event) => {
        const new_chat = JSON.parse(event.data);
        if (new_chat.type === "new_data") {
          // Update the chat room list with the new last message
          const updatedChatRoomList = chatRoomList.map((room: any) => {
            if (room.id === new_chat.room_id) {
              return { ...room, lastMessage: new_chat.text };
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
                {chatRoomList?.map((room: IChatRoomList, index: number) => (
                  <Chat
                    key={index}
                    id={room.id}
                    unread_messages={room.unread_messages}
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
