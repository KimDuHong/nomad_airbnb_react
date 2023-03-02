import {
  Box,
  HStack,
  LightMode,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { IChatRoomOwner } from "../types";

type Message = {
  sender: IChatRoomOwner;
  text: string;
};
type ChatMessageProps = {
  message: Message;
  isSentByCurrentUser: boolean;
};

const ChatMessage = ({ message, isSentByCurrentUser }: ChatMessageProps) => {
  const align = isSentByCurrentUser ? "flex-end" : "flex-start";
  const borderRadius = isSentByCurrentUser
    ? "10px 0 10px 10px"
    : "0 10px 10px 10px";

  const bg = useColorModeValue(
    isSentByCurrentUser ? "green.100" : "gray.200",
    isSentByCurrentUser ? "green.200" : "gray.200"
  );
  return (
    <HStack
      borderRadius={borderRadius}
      p={2}
      mb={2}
      maxW="100%"
      justifyContent={align}
    >
      {isSentByCurrentUser ? null : (
        <Box>
          <strong>{message.sender.username}</strong>:
        </Box>
      )}
      <Box bg={bg} p={2} rounded="md" maxWidth="80%" wordBreak="break-word">
        <LightMode>
          <Text color="black">{message.text}</Text>
        </LightMode>
      </Box>
    </HStack>
  );
};

export default ChatMessage;
