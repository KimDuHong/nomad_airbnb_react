import { Box, Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { FaComment, FaGithub } from "react-icons/fa";

export default function SocialLogin() {
  return (
    <Box mb="4">
      <HStack my={"8"}>
        <Divider />
        <Text
          textTransform={"uppercase"}
          color="gray.500"
          fontSize={"xs"}
          as="b"
        >
          or
        </Text>
        <Divider />
      </HStack>
      <VStack>
        <Button
          as={"a"}
          href="https://github.com/login/oauth/authorize?client_id=34e6a768f8bfa936a0a6&scope=read:user,user:email"
          // scope = 정보를 얻어오는 범위
          leftIcon={<FaGithub />}
          colorScheme={"twitter"}
          width={"100%"}
        >
          Continue with Github
        </Button>
        <Button leftIcon={<FaComment />} width={"100%"} colorScheme={"yellow"}>
          {" "}
          Continue with KaKao
        </Button>
      </VStack>
    </Box>
  );
}
