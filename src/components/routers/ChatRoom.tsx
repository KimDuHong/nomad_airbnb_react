import { useState, useEffect, useRef } from "react";
import { Box, Button, Grid, Heading, Input, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import useUser from "../../lib/useUser";
import ChatMessage from "../ChatMessage";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getChatList } from "../../api";
import { IChatRoomOwner } from "../../types";

type Message = {
  sender: IChatRoomOwner;
  text: string;
  chatting_count: number;
};

const ChatRoom = (): JSX.Element => {
  const { register, handleSubmit, watch, setValue } = useForm();
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const { chatRoomPk } = useParams<{ chatRoomPk: string }>();
  const socketRef = useRef<WebSocket | null>(null);
  const { user } = useUser();
  const sender = user?.username;
  const QueryClient = useQueryClient();
  const chatBoxRef = useRef<HTMLDivElement>(null);

  const onSubmit = () => {
    const text = watch("text");
    if (!text) return;
    socketRef.current?.send(JSON.stringify({ text, sender }));
    setValue("text", "");
  };

  useEffect(() => {
    // Connect to the WebSocket server
    socketRef.current = new WebSocket(`ws://127.0.0.1:8000/ws/${chatRoomPk}`);
    setSocket(socketRef.current);

    // Load chat history
    socketRef.current.onopen = () => {
      socketRef.current?.send(JSON.stringify({ type: "loadChatHistory" }));
    };

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data) as Message;
      if (Array.isArray(data)) {
        setMessages(data.reverse());
      } else {
        setMessages((prevMessages) => [...prevMessages, data]);
      }
    };
    // Clean up
    return () => {
      socketRef.current?.close();
    };
  }, [chatRoomPk]);

  const { isLoading, data } = useQuery<Message[]>(
    [`chatList`, chatRoomPk],
    getChatList,
    { onSuccess: setMessages }
  );

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    // Clear messages when chat room changes
    setMessages([]);
  }, [chatRoomPk]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={5}>
        <Box
          borderWidth="1px"
          borderColor="gray.200"
          borderRadius="md"
          p={4}
          mt={10}
          h={"65vh"}
          w={"100%"}
          overflowY="scroll"
          ref={chatBoxRef}
        >
          {isLoading ? (
            <Heading>ChatLoading...</Heading>
          ) : (
            messages.map((message, i) =>
              message.sender.username === sender ? (
                <Box key={i} mb={4}>
                  <ChatMessage message={message} isSentByCurrentUser={true} />
                </Box>
              ) : (
                <Box key={i} mb={4}>
                  <ChatMessage message={message} isSentByCurrentUser={false} />
                </Box>
              )
            )
          )}
        </Box>
        <Grid
          as={"div"}
          w={"100%"}
          templateColumns={"6fr 1fr"}
          gap="5"
          alignItems="center"
        >
          <Input {...register("text", { required: true })} />
          <Button type="submit">Send</Button>
        </Grid>
      </VStack>
    </form>
  );
};

export default ChatRoom;
