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
  Select,
  Text,
  ToastId,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { FaLock, FaUserAlt, FaEnvelope, FaUserCheck } from "react-icons/fa";
import { ISignUpVariables, SignUpModalProps } from "../types";
import { SignUp } from "./api";
import SocialLogin from "./SocialLogin";
import useUser from "../lib/useUser";
import { useRef } from "react";

export default function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
  const textColor = useColorModeValue("red.500", "red.200");
  const onSubmit = ({
    name,
    username,
    email,
    password,
  }: // currency,
  // gender,
  // language,
  ISignUpVariables) => {
    mutation.mutate({
      username,
      password,
      name,
      email,
      // currency,
      // language,
      // gender,
    });
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ISignUpVariables>();
  const toast = useToast();
  const queryClient = useQueryClient();
  const toastId = useRef<ToastId>();
  const mutation = useMutation(SignUp, {
    onMutate: () => {
      toastId.current = toast({
        position: "top",
        title: "Sign up...!",
        description: "Don't go anywhere!",
        status: "loading",
      });
    },
    onSuccess: (data) => {
      queryClient.refetchQueries(["me"]);
      if (toastId.current) {
        toast.update(toastId.current, {
          title: "회원가입 완료",
          description: `Hello, ${data.username}!`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        reset();
      }
      onClose();
    },
    onError: (error: any) => {
      const detail_error = Object.values(error.response.data);
      if (toastId.current) {
        toast.update(toastId.current, {
          title: "회원가입 실패",
          description: `${detail_error[0]}`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    },
  });
  return (
    <Modal motionPreset={"scale"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sign Up</ModalHeader>
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
                {...register("name", {
                  required: "'name'은 필수 입력 값입니다.",
                })}
                isInvalid={Boolean(errors.name?.message)}
                variant={"filled"}
                placeholder="Name"
              />
            </InputGroup>
            {errors.name?.message ? (
              <Text fontSize={"sm"} color={textColor}>
                {errors.name?.message}
              </Text>
            ) : null}
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaEnvelope />
                  </Box>
                }
              />
              <Input
                required
                {...register("email", {
                  required: "'email'은 필수 입력 값입니다.",
                })}
                isInvalid={Boolean(errors.email?.message)}
                variant={"filled"}
                placeholder="Email"
              />
            </InputGroup>
            {errors.email?.message ? (
              <Text fontSize={"sm"} color={textColor}>
                {errors.email?.message}
              </Text>
            ) : null}
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaUserCheck />
                  </Box>
                }
              />
              <Input
                required
                {...register("username", {
                  required: "'사용자이름'은 필수 입력 값입니다.",
                })}
                isInvalid={Boolean(errors.username?.message)}
                variant={"filled"}
                placeholder="사용자 이름을 입력하세요"
              />
            </InputGroup>
            {errors.username?.message ? (
              <Text fontSize={"sm"} color={textColor}>
                {errors.username?.message}
              </Text>
            ) : null}
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaLock />
                  </Box>
                }
              />
              <Input
                required
                {...register("password", {
                  required: "'password'는 필수 입력 값입니다.",
                })}
                isInvalid={Boolean(errors.password?.message)}
                variant={"filled"}
                type="password"
                placeholder="Password"
              />
            </InputGroup>
            {errors.password?.message ? (
              <Text fontSize={"sm"} color={textColor}>
                {errors.password?.message}
              </Text>
            ) : null}
            {/* <Select
              isRequired
              borderColor={errors.currency?.message ? textColor : "skyblue"}
              placeholder="Currency option"
              {...register("currency", { required: "항목을 선택해주세요." })}
            >
              <option value="won">Korean Won</option>
              <option value="usd">Dollar</option>
            </Select>
            {errors.currency?.message ? (
              <Text fontSize={"sm"} color={textColor}>
                {errors.currency?.message}
              </Text>
            ) : null}
            <Select
              borderColor={errors.gender?.message ? textColor : "skyblue"}
              isRequired
              placeholder="Gender option"
              {...register("gender", { required: "항목을 선택해주세요." })}
            >
              <option value="male">남자</option>
              <option value="female">여자</option>
            </Select>
            {errors.gender?.message ? (
              <Text fontSize={"sm"} color={textColor}>
                {errors.gender?.message}
              </Text>
            ) : null}
            <Select
              isRequired
              borderColor={errors.language?.message ? textColor : "skyblue"}
              placeholder="Language option"
              {...register("language", { required: "항목을 선택해주세요." })}
            >
              <option value="kr">한국어</option>
              <option value="en">English</option>
            </Select>
            {errors.language?.message ? (
              <Text fontSize={"sm"} color={textColor}>
                {errors.language?.message}
              </Text>
            ) : null} */}
          </VStack>

          <Button
            isLoading={mutation.isLoading}
            type="submit"
            mt="4"
            colorScheme={"red"}
            width={"100%"}
          >
            Sign In
          </Button>
          <SocialLogin />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
