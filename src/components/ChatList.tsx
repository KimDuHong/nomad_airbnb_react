import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  HStack,
  Image,
  ListItem,
  Stack,
  StackDivider,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useUser from "../lib/useUser";
import { IChatRoomList } from "../types";

export default function ChatList({
  id,
  users,
  lastMessage,
  updated_at,
  unread_messages,
}: IChatRoomList) {
  const navigate = useNavigate();
  const { user } = useUser();
  const handleChatClick = (id: string) => {
    navigate(`/chat/${id}`);
  };
  return (
    <ListItem key={id} onClick={() => handleChatClick(id)}>
      <Box
        borderWidth="1px"
        borderColor={unread_messages !== 0 ? "red.500" : "gray.100"}
        borderRadius="md"
        p={5}
        transition="border-color 0.4s ease-in-out"
        _hover={{ border: "3px solid aqua", cursor: "pointer" }}
      >
        <VStack alignItems="flex-start" ml={5}>
          <HStack w="100%" justifyContent="space-between">
            <HStack spacing={"8"}>
              <Avatar name={users[1].username} />
              <Box>
                <Heading size="sm">
                  {users[1].username} 님과의 채팅방{" "}
                  {unread_messages !== 0 ? (
                    <Text
                      as="span"
                      p={1.5}
                      ml={3}
                      rounded={"20%"}
                      bg="red.300"
                      width={"100%"}
                      textAlign="center"
                    >
                      + {unread_messages}
                    </Text>
                  ) : null}
                </Heading>
                <Text fontSize="sm" color="gray.500">
                  {lastMessage}
                </Text>
              </Box>
            </HStack>
            <VStack>
              <Text fontSize="sm" color="gray.500">
                {updated_at.split("T")[0]}
              </Text>
            </VStack>
          </HStack>
        </VStack>
      </Box>
    </ListItem>
  );
}
