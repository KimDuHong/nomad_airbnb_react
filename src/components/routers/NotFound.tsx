import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <VStack bg={"gray.500"} justifyContent="center" border={"1px"} minH="100vh">
      <Heading>Page Not Found 404</Heading>
      <Text>It seems that you're lost</Text>
      <Link to="/">
        <Button size={"lg"} variant={"outline"} colorScheme={"telegram"}>
          Go home &rarr;
        </Button>
      </Link>
    </VStack>
  );
}
