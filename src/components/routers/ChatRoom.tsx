import { useState, useEffect } from "react";
import { Box, Button, Grid, Input, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";

type Message = {
  author: string;
  text: string;
};

const ChatRoom = (): JSX.Element => {
  const { register, handleSubmit, watch, setValue } = useForm();
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const { chatRoomPk } = useParams<{ chatRoomPk: string }>();

  const onSubmit = () => {
    const text = watch("text");
    if (!text) return;
    socket?.emit("message", { text });
    setValue("text", "");
  };

  useEffect(() => {
    // Connect to the WebSocket server
    const socket = io("ws://127.0.0.1:8000/ws/");
    setSocket(socket);
    // Listen for incoming messages
    socket.on("message", (message: Message) => {
      setMessages((prevMessages) => [message, ...prevMessages]);
    });

    // Load chat history
    socket.emit("loadChatHistory", chatRoomPk, (messages: Message[]) => {
      setMessages(messages.reverse());
    });

    // Clean up
    return () => {
      socket.disconnect();
    };
  }, [chatRoomPk]);

  return (
    <VStack spacing={5}>
      <Box
        borderWidth="1px"
        borderColor="gray.200"
        borderRadius="md"
        p={4}
        mt={10}
        minH={"65vh"}
        w={"100%"}
        overflowY="auto"
      >
        {messages.map((message, i) => (
          <Box key={i} mb={4}>
            <strong>{message.author}</strong>: {message.text}
          </Box>
        ))}
      </Box>
      <Grid
        as={"form"}
        onSubmit={handleSubmit(onSubmit)}
        w={"100%"}
        templateColumns={"6fr 1fr"}
        gap="5"
      >
        <Input {...register("text", { required: true })} />
        <Button type="submit">Send</Button>
      </Grid>
    </VStack>
  );
};

export default ChatRoom;
