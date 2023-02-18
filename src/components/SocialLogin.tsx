import { Box, Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { FaComment, FaGithub } from "react-icons/fa";

export default function SocialLogin() {
  const kakaoParams = {
    client_id: "da7b6b984fe482fd404d22bff8e2f803",
    redirect_uri: "http://127.0.0.1:3000/social/kakao",
    response_type: "code",
  };
  const params = new URLSearchParams(kakaoParams).toString();
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
        <Button
          as="a"
          href={`https://kauth.kakao.com/oauth/authorize?${params}`}
          leftIcon={<FaComment />}
          width={"100%"}
          colorScheme={"yellow"}
        >
          {" "}
          Continue with KaKao
        </Button>
      </VStack>
    </Box>
  );
}
