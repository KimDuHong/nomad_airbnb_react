import { Box, Container, Grid, Heading, List, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import useUser from "../../lib/useUser";
import { IChatRoomList } from "../../types";
import { getChatRoomList } from "../../api";
import ProtectedPage from "../ProtectedPage";
import Chat from "../Chat";
import { useEffect, useRef, useState } from "react";

export default function ChatList() {
  const navigate = useNavigate();
  const { user: username } = useUser();
  const sender = username?.username;

  const [chatRoomList, setChatRoomList] = useState<IChatRoomList[]>([]);
  const { isLoading, data } = useQuery<IChatRoomList[]>(
    ["chatRoomList"],
    getChatRoomList,
    { onSuccess: setChatRoomList }
  );

  const params = useParams();
  const roomPk = params.chatRoomPk;
  const { userLoading, user } = useUser();
  const socketRef = useRef<WebSocket | null>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [read, setRead] = useState(false);
  const [unReadCount, setUnReadCount] = useState(0);
  useEffect(() => {
    if (user) {
      const socketUrl = `ws://127.0.0.1:8000/notifications?user=${user.id}`;
      socketRef.current = new WebSocket(socketUrl);
      setSocket(socketRef.current);

      socketRef.current.onopen = () => {
        if (params) {
          socketRef.current?.send(
            JSON.stringify({
              type: "read_msg",
              sender: sender,
              room: roomPk,
            })
          );
        }
      };

      socketRef.current.onmessage = (event) => {
        const new_chat = JSON.parse(event.data);
        console.log("ChatNoti", new_chat);
        if (new_chat.type === "new_data") {
          // Update the chat room list with the new last message
          const updatedChatRoomList = chatRoomList.map((room: any) => {
            if (room.id === new_chat.room_id) {
              return {
                ...room,
                lastMessage: new_chat.text,
                unread_messages: new_chat.unread_count,
                updated_at: new_chat.updated_at,
              };
            } else {
              return room;
            }
          });
          setChatRoomList(updatedChatRoomList);
        } else if (new_chat.type === "update_read") {
          setRead(true);
        }
        // } else if (new_chat.type == "update_count") {
        //   console.log("update_count", "11");
        //   const updatedChatRoomList = chatRoomList.map((room: any) => {
        //     if (room.id == params.chatRoomPk) {
        //       return {
        //         ...room,
        //         unread_messages: 0,
        //       };
        //     } else {
        //       return room;
        //     }
        //   });
        //   setChatRoomList(updatedChatRoomList);
        // }
      };

      return () => {
        socketRef.current?.close();
      };
    }
  }, [userLoading, chatRoomList, user, roomPk]);
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
                    unread_messages={
                      room.id != roomPk
                        ? room.unread_messages
                        : (room.unread_messages = 0)
                    }
                    users={room.users}
                    lastMessage={room.lastMessage}
                    updated_at={room.updated_at}
                  />
                ))}
              </List>
            )}
          </Container>
          <Outlet context={{ read, setRead }} />
        </Grid>
      </Container>
    </ProtectedPage>
  );
}
