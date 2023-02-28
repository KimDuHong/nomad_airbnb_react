import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaLock, FaUserAlt } from "react-icons/fa";
import useUser from "../lib/useUser";
import {
  IFormLogIn,
  IUsernameError,
  IUsernameLoginVariables,
  IUsernameSuccess,
  LoginModalProps,
} from "../types";
import { usernameLogIn } from "../api";
import SocialLogin from "./SocialLogin";

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const onChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
  //   const { name, value } = event.currentTarget;
  //   if (name === "username") {
  //     setUsername(value);
  //   } else if (name === "password") {
  //     setPassword(value);
  //   }
  // };
  // const onSubmit = (event: React.SyntheticEvent<HTMLDivElement>) => {
  //   event.preventDefault();
  //   console.log(username, password);
  // };
  const textColor = useColorModeValue("red.500", "red.200");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormLogIn>();
  const toast = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation<
    IUsernameSuccess,
    IUsernameError,
    IUsernameLoginVariables
  >(usernameLogIn, {
    onMutate: (data) => {
      console.log("mutation starting");
    },
    onSuccess: (data) => {
      toast({
        title: "Log In Success",
        description: `Welcome!`,
        status: "success",
        position: "top",
      });
      onClose();
      reset();
      queryClient.refetchQueries(["me"]);
      queryClient.refetchQueries(["rooms"]);
    },
    onError: (error) => {
      reset();
    },
  });
  const onSubmit = ({ username, password }: IFormLogIn) => {
    mutation.mutate({ username, password });
  };
  // watch()  == username, password
  // handleSubmit() -> event.preventDefault(), validate data
  // formstate() -> 에러 확인 가능
  return (
    <Modal motionPreset={"scale"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Log In</ModalHeader>
        <ModalCloseButton />
        <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
          <VStack>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaUserAlt />
                  </Box>
                }
              />
              <Input
                required
                isInvalid={Boolean(errors.username?.message)}
                {...register("username", { required: "Write username" })}
                // name="username"
                // onChange={onChange}
                // value={username}
                variant={"filled"}
                placeholder="Username"
              />
            </InputGroup>

            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gray.300">
                    <FaLock />
                  </Box>
                }
              />
              <Input
                required
                isInvalid={Boolean(errors.password?.message)}
                // name="password"
                // onChange={onChange}
                // value={password}
                {...register("password", { required: "Write password" })}
                variant={"filled"}
                type="password"
                placeholder="Password"
              />
            </InputGroup>
          </VStack>
          {mutation.isError ? (
            <Text color={textColor} textAlign={"center"}>
              Username or Password are wrong.
            </Text>
          ) : null}
          <Button
            isLoading={mutation.isLoading}
            type="submit"
            mt="4"
            colorScheme={"red"}
            width={"100%"}
          >
            Log In
          </Button>
          <SocialLogin />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
