import {
  Box,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  VStack,
} from "@chakra-ui/react";
import useHostOnlyPage from "../HostOnlyPage";
import HostOnlyPage from "../HostOnlyPage";
import ProtectedPage from "../ProtectedPage";

export default function UploadRoom() {
  useHostOnlyPage();
  return (
    <ProtectedPage>
      {/* <HostOnlyPage> */}
      <Box
        pb={40}
        mt={10}
        px={{
          base: 10,
          lg: 40,
        }}
      >
        <Container>
          <Heading textAlign={"center"}>Upload Room</Heading>
          <VStack spacing={5} as="form" mt={5}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input required type="text" />
              <FormHelperText>Write the name of your room. </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Country</FormLabel>
              <Input required type="text" />
            </FormControl>
            <FormControl>
              <FormLabel>City</FormLabel>
              <Input required type="text" />
            </FormControl>
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input required type="text" />
            </FormControl>
            <FormControl>
              <FormLabel>Price</FormLabel>
              <InputGroup>
                <InputLeftAddon children="$USD" />
                <Input type={"number"} min={0} />
              </InputGroup>
            </FormControl>
          </VStack>
        </Container>
      </Box>
      {/* </HostOnlyPage> */}
    </ProtectedPage>
  );
}
