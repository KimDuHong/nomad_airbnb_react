import {
  Box,
  Button,
  HStack,
  IconButton,
  LightMode,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { FaAirbnb, FaMoon, FaSun } from "react-icons/fa";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import { Link } from "react-router-dom";
export default function Header() {
  const {
    isOpen: isLoginOpen,
    onClose: onLoginClose,
    onOpen: onLoginOpen,
  } = useDisclosure();
  const {
    isOpen: isSignUpOpen,
    onClose: onSignClose,
    onOpen: onSignUpOpen,
  } = useDisclosure();
  const { toggleColorMode } = useColorMode();
  const logoColor = useColorModeValue("red.500", "red.200");
  const Icon = useColorModeValue(FaMoon, FaSun);
  return (
    <Stack
      justifyContent={"space-between"}
      py={"5"}
      px={"40"}
      alignItems="center"
      spacing={{
        sm: 4,
        md: 1,
      }}
      direction={{
        sm: "column",
        md: "row",
      }}
      borderBottomWidth="1px"
    >
      <Box color={logoColor}>
        <Link to={"/"}>
          <HStack>
            <FaAirbnb size={"50"} />
            <Text fontSize={"2xl"} as="b">
              MyBnB
            </Text>
          </HStack>
        </Link>
      </Box>
      <HStack spacing={"2"}>
        <IconButton
          onClick={toggleColorMode}
          aria-label="Toggle dark mode"
          //   icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
          icon={<Icon />}
        />
        <Button onClick={onLoginOpen} colorScheme={"red"}>
          Log In
        </Button>
        <LightMode>
          <Button onClick={onSignUpOpen} color={"red.400"}>
            Sign up
          </Button>
        </LightMode>
      </HStack>
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
      <SignUpModal isOpen={isSignUpOpen} onClose={onSignClose} />
    </Stack>
  );
}
