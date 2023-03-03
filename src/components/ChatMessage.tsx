import {
  Avatar,
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
  isRead: boolean;
  time: string;
};

const ChatMessage = ({
  message,
  isSentByCurrentUser,
  isRead,
  time,
}: ChatMessageProps) => {
  const align = isSentByCurrentUser ? "flex-end" : "flex-start";
  const borderRadius = isSentByCurrentUser
    ? "10px 0 10px 10px"
    : "0 10px 10px 10px";

  const bg = useColorModeValue(
    isSentByCurrentUser ? "green.100" : "gray.200",
    isSentByCurrentUser ? "green.200" : "gray.200"
  );
  return (
    <VStack
      borderRadius={borderRadius}
      // p={2}
      maxW="100%"
      alignItems={align}
      justifyContent={align}
    >
      {!isSentByCurrentUser ? (
        <HStack>
          <Avatar
            size={"md"}
            src={message.sender.avatar}
            name={message.sender.username}
          />
          <VStack alignItems={"flex-start"} p="2">
            <Text>{message.sender.username}</Text>
            <Box
              bg={bg}
              p={2}
              rounded="md"
              // maxWidth="80%"
              wordBreak="break-word"
            >
              <LightMode>
                <Text color="black">{message.text}</Text>
              </LightMode>
            </Box>
            <Text as={"span"} fontSize="2xs" textAlign={"right"}>
              {time}
            </Text>
          </VStack>
        </HStack>
      ) : (
        <VStack mr={4} alignItems={"flex-end"}>
          <HStack>
            {!isRead ? (
              <Text fontSize={"xs"} mt={5}>
                1
              </Text>
            ) : null}
            <Box
              bg={bg}
              p={2}
              rounded="md"
              // maxWidth="80%"
              wordBreak="break-word"
            >
              <LightMode>
                <Text color="black">{message.text}</Text>
              </LightMode>
            </Box>
          </HStack>
          <Text as={"span"} fontSize="2xs" textAlign={"right"}>
            {time}
          </Text>
        </VStack>
      )}
    </VStack>
  );
};

export default ChatMessage;
