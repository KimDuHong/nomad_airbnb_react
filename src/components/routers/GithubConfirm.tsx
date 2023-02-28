import {
  Heading,
  Spinner,
  Text,
  Toast,
  ToastId,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { githubLogin } from "../../api";
export default function GitgubConfirm() {
  const { search } = useLocation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const toast = useToast();
  const toastId = useRef<ToastId>();
  const mutation = useMutation(githubLogin, {
    onMutate: () => {
      toastId.current = toast({
        title: "Log In...",
        status: "loading",
        position: "top",
      });
    },
    onSuccess: async () => {
      queryClient.refetchQueries(["me"]);
      if (toastId.current) {
        toast.update(toastId.current, {
          title: "Log In Success",
          status: "success",
          position: "top",
        });
      }
      navigate("/");
    },
    onError: (error) => {
      if (toastId.current) {
        toast.update(toastId.current, {
          title: "Log In failed",
          status: "error",
          position: "top",
        });
        navigate("/");
      }
    },
  });
  const confirmLogin = async () => {
    const params = new URLSearchParams(search);
    const code = params.get("code");
    if (code) {
      mutation.mutate(code);
      // const status_code = await githubLogin(code);
      // if (status_code === 200) {
      //   await queryClient.refetchQueries(["me"]);
      //   toast({
      //     title: "Log In Success",
      //     description: `Welcome GitHub Login!`,
      //     status: "success",
      //     position: "top",
      //   });
      //   navigate("/");
      // }
    }
  };
  useEffect(() => {
    confirmLogin();
  }, []);
  return (
    <VStack justifyContent="center" mt="40">
      <Heading>Processing Log In...</Heading>
      <Text>Don't go anywhere.</Text>
      <Spinner size="lg" />
    </VStack>
  );
}
