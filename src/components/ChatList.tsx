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
        borderColor="gray.200"
        borderRadius="md"
        p={5}
        _hover={{ border: "3px solid aqua", cursor: "pointer" }}
      >
        <VStack alignItems="flex-start" ml={5}>
          <HStack w="100%" justifyContent="space-between">
            <HStack spacing={"8"}>
              <Avatar
                name={
                  users[0] === user.username
                    ? users[0].username
                    : users[1].username
                }
              />
              <Box>
                <Heading size="sm">{users[1].username} 님의 채팅방</Heading>
                <Text fontSize="sm" color="gray.500">
                  {lastMessage}
                </Text>
              </Box>
            </HStack>
            <Text fontSize="sm" color="gray.500">
              {updated_at.split("T")[0]}
            </Text>
          </HStack>
        </VStack>
      </Box>
    </ListItem>
  );
}
