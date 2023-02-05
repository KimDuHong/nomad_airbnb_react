import {
  Avatar,
  Box,
  Button,
  HStack,
  IconButton,
  LightMode,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FaAirbnb, FaMoon, FaSun } from "react-icons/fa";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import { Link } from "react-router-dom";
import useUser from "../lib/useUser";
import { logOut } from "./api";
import { useQueryClient } from "@tanstack/react-query";

export default function Header() {
  const { userLoading, isLoggedIn, user } = useUser();
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
  const toast = useToast();
  const queryClient = useQueryClient();
  const onLogOut = async () => {
    const toastId = toast({
      position: "top",
      title: "Log Out...!",
      description: "See you later!",
      status: "loading",
    });
    await logOut();
    setTimeout(() => {
      toast.update(toastId, {
        title: "Success log out!",
        description: `Bye, Bye ${user.name}!`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      queryClient.refetchQueries(["me"]);
    }, 2000);
  };
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
              AirBnB
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
        {!userLoading && !isLoggedIn ? (
          <>
            <Button onClick={onLoginOpen} colorScheme={"red"}>
              Log In
            </Button>
            <LightMode>
              <Button onClick={onSignUpOpen} color={"red.400"}>
                Sign up
              </Button>
            </LightMode>
          </>
        ) : (
          <Menu>
            <MenuButton>
              <Avatar name={user?.name} src={user?.avatar} size={"md"} />
            </MenuButton>
            <MenuList>
              <MenuItem>My Profile</MenuItem>
              <MenuItem onClick={onLogOut}>Log out</MenuItem>
            </MenuList>
          </Menu>
        )}
      </HStack>
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
      <SignUpModal isOpen={isSignUpOpen} onClose={onSignClose} />
    </Stack>
  );
}
