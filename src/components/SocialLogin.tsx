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
        <Button leftIcon={<FaGithub />} colorScheme={"twitter"} width={"100%"}>
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
